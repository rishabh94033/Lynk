"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WebSocketService from '../../lib/websocket-service(webrtc)';
import IncomingCallBanner from '../../components/ui/incomming-call-banner';
import { IncomingCall, WSMessage } from '../../types';

const MainPage: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [targetUserId, setTargetUserId] = useState<string>(''); // Input for who to call
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [isCallInitiated, setIsCallInitiated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId') || `user_${Date.now()}`;
    setUserId(storedUserId);
    localStorage.setItem('userId', storedUserId);

    WebSocketService.connect(storedUserId);

    WebSocketService.on('registered', (message: WSMessage) => {
      setIsConnected(true);
      console.log('Registered as:', message.userId);
    });

    WebSocketService.on('incoming-call', (message: WSMessage) => {
      if (message.from && message.callId && message.callerName) {
        setIncomingCall({
          from: message.from,
          callId: message.callId,
          callerName: message.callerName
        });
      }
    });

    WebSocketService.on('call-initiated', (message: WSMessage) => {
      setIsCallInitiated(true);
    });

    WebSocketService.on('call-accepted', (message: WSMessage) => {
      setIsCallInitiated(false);
      if (message.redirectTo) {
        router.push(message.redirectTo);
      }
    });

    WebSocketService.on('call-rejected', (message: WSMessage) => {
      setIsCallInitiated(false);
      alert('Call was rejected');
    });

    WebSocketService.on('call-started', (message: WSMessage) => {
      setIncomingCall(null);
      if (message.redirectTo) {
        router.push(message.redirectTo);
      }
    });

    WebSocketService.on('call-error', (message: WSMessage) => {
      setIsCallInitiated(false);
      alert(message.message);
    });

    // Handle call timeout
    WebSocketService.on('call-timeout', (message: WSMessage) => {
      setIsCallInitiated(false);
      setIncomingCall(null);
      alert(message.message || 'Call timed out after 40 seconds');
    });

    return () => {
      // Cleanup if needed
    };
  }, [router]);

  const handleVideoCall = (): void => {
    if (!isConnected) {
      alert('Not connected to server');
      return;
    }

    if (!targetUserId.trim()) {
      alert('Please enter a user ID to call');
      return;
    }
    
    setIsCallInitiated(true);
    WebSocketService.initiateCall(targetUserId.trim(), userId);
  };

  const handleAcceptCall = (): void => {
    if (incomingCall) {
      WebSocketService.acceptCall(incomingCall.from);
    }
  };

  const handleRejectCall = (): void => {
    if (incomingCall) {
      WebSocketService.rejectCall(incomingCall.from);
      setIncomingCall(null);
    }
  };

  const cancelCall = (): void => {
    setIsCallInitiated(false);
    // You could also send an end-call message to properly cancel
    WebSocketService.endCall();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Video Call App</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Your ID:</span> {userId}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Call Banner */}
        {incomingCall && (
          <IncomingCallBanner
            caller={incomingCall}
            onAccept={handleAcceptCall}
            onReject={handleRejectCall}
          />
        )}

        {/* Calling State */}
        {isCallInitiated && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Calling {targetUserId}...</h2>
                <p className="text-gray-600">Waiting for response (40s timeout)</p>
              </div>
              <button 
                onClick={cancelCall}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel Call
              </button>
            </div>
          </div>
        )}

        {/* Call Interface */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Make a Call</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter User ID to Call:
              </label>
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="e.g., user_1693123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isCallInitiated}
              />
            </div>
            <button 
              onClick={handleVideoCall}
              disabled={isCallInitiated || !isConnected}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>📹</span>
              {isCallInitiated ? 'Calling...' : 'Start Video Call'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">How to use:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Share your User ID with others</li>
              <li>• Enter their User ID in the input field</li>
              <li>• Click "Start Video Call" to call them</li>
              <li>• Calls automatically timeout after 40 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
