export interface User {
  id: string;
  status: 'online' | 'in-call' | 'ringing';
}

export interface IncomingCall {
  from: string;
  callId: string;
  callerName: string;
}

export interface WSMessage {
  type: string;
  userId?: string;
  users?: User[];
  from?: string;
  to?: string;
  callId?: string;
  callerName?: string;
  message?: string;
  redirectTo?: string;
  with?: string;
  reason?: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidate;
}
