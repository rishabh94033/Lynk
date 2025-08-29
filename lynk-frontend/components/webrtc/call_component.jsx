import React, { useEffect, useRef, useState } from "react";
import socket from "@/lib/socket";

export default function Call({ userId, otherUserId }) {
  const [incomingCall, setIncomingCall] = useState<{ from, callType: string } | null>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    socket.emit("register", userId);

    socket.on("incoming-call", ({ from, callType }) => {
      setIncomingCall({ from, callType });
    });

    socket.on("call-accepted", () => {
      createOffer();
    });

    socket.on("receive-offer", async ({ offer }) => {
      await createAnswer(offer);
    });

    socket.on("receive-answer", async ({ answer }) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(answer);
      }
    });

    socket.on("receive-ice-candidate", ({ candidate }) => {
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(candidate);
      }
    });
  }, []);

  async function startCall(callType) {
    socket.emit("call-user", { to: otherUserId, from: userId, callType });
  }

  async function acceptCall() {
    setIncomingCall(null);
    socket.emit("accept-call", { to: incomingCall.from });
    await createPeerConnection();
    await getMedia(incomingCall.callType);
  }

  async function createPeerConnection() {
    peerConnection.current = new RTCPeerConnection();
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", {
          to: otherUserId,
          candidate: event.candidate
        });
      }
    };
    peerConnection.current.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };
  }

  async function getMedia(callType) {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: callType === "video",
      audio: true
    });
    localStream.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });
    localVideo.current.srcObject = localStream.current;
  }

  async function createOffer() {
    await createPeerConnection();
    await getMedia("video");
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("send-offer", { to: otherUserId, offer });
  }

  async function createAnswer(offer) {
    await createPeerConnection();
    await getMedia(incomingCall.callType);
    await peerConnection.current.setRemoteDescription(offer);
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit("send-answer", { to: incomingCall.from, answer });
  }

  return (
    <div>
      <video ref={localVideo} autoPlay muted></video>
      <video ref={remoteVideo} autoPlay></video>

      <button onClick={() => startCall("audio")}>Audio Call</button>
      <button onClick={() => startCall("video")}>Video Call</button>

      {incomingCall && (
        <div>
          <p>{incomingCall.from} is calling...</p>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
}
