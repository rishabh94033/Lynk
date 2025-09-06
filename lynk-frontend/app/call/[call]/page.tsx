import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import WebSocketService from '../../../lib/websocket-service(webrtc)';
import { WSMessage } from '../../../types';

const CallPage: React.FC = () => {
  const router = useRouter();
  const { callId } = router.query;
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  
  const [isCallActive, setIsCallActive] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');

  useEffect(() => {
    if (!callId) return;

    initializeCall();

    WebSocketService.on('createOffer', handleCreateOffer);
    WebSocketService.on('createAnswer', handleCreateAnswer);
    WebSocketService.on('iceCandidate', handleIceCandidate);
    WebSocketService.on('call-ended', handleCallEnded);

    return () => {
      cleanupCall();
    };
  }, [callId]);

  const initializeCall = async (): Promise<void> => {
    try {
      setConnectionStatus('Accessing camera and microphone...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      peerConnectionRef.current = peerConnection;

      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setConnectionStatus('Connected');
        }
      };

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          WebSocketService.sendIceCandidate(event.candidate);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        setConnectionStatus(peerConnection.connectionState);
      };

      setConnectionStatus('Creating offer...');
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      WebSocketService.sendOffer(offer);

    } catch (error) {
      console.error('Error initializing call:', error);
      alert('Could not access camera/microphone');
      router.push('/');
    }
  };

  const handleCreateOffer = async (message: WSMessage): Promise<void> => {
    try {
      if (!peerConnectionRef.current || !message.sdp) return;
      
      setConnectionStatus('Receiving offer...');
      await peerConnectionRef.current.setRemoteDescription(message.sdp);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      WebSocketService.sendAnswer(answer);
      setConnectionStatus('Answer sent');
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleCreateAnswer = async (message: WSMessage): Promise<void> => {
    try {
      if (!peerConnectionRef.current || !message.sdp) return;
      
      setConnectionStatus('Receiving answer...');
      await peerConnectionRef.current.setRemoteDescription(message.sdp);
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async (message: WSMessage): Promise<void> => {
    try {
      if (!peerConnectionRef.current || !message.candidate) return;
      
      await peerConnectionRef.current.addIceCandidate(message.candidate);
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const handleCallEnded = (): void => {
    setIsCallActive(false);
    cleanupCall();
    router.push('/');
  };

  const endCall = (): void => {
    WebSocketService.endCall();
    handleCallEnded();
  };

  const toggleMute = (): void => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = (): void => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const cleanupCall = (): void => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
  };

  if (!isCallActive) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
        <h2 className="text-2xl font-semibold mb-4">Call Ended</h2>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Connection Status */}
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
        {connectionStatus}
      </div>

      {/* Call ID */}
      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
        Call: {callId}
      </div>

      {/* Video Container */}
      <div className="relative w-full h-full">
        {/* Remote Video */}
        <video 
          ref={remoteVideoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Local Video */}
        <video 
          ref={localVideoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute top-5 right-5 w-48 h-36 border-2 border-white rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button 
          className={`w-14 h-14 rounded-full border-none text-2xl cursor-pointer transition-all duration-300 ${
            isMuted 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-40'
          } text-white`}
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        
        <button 
          className={`w-14 h-14 rounded-full border-none text-2xl cursor-pointer transition-all duration-300 ${
            isVideoOff 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-40'
          } text-white`}
          onClick={toggleVideo}
          title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
        >
          {isVideoOff ? '📹' : '📷'}
        </button>
        
        <button 
          className="w-14 h-14 rounded-full border-none text-2xl cursor-pointer bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
          onClick={endCall}
          title="End Call"
        >
          📞
        </button>
      </div>
    </div>
  );
};

export default CallPage;
