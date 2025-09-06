interface WSMessage {
  type: string;
  [key: string]: any;
}

interface CallbackMap {
  [key: string]: (message: WSMessage) => void;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private userId: string | null = null;
  private callbacks: CallbackMap = {};

  connect(userId: string): void {
    this.userId = userId;
    this.ws = new WebSocket('ws://localhost:8080');
    
    this.ws.onopen = () => {
      console.log('Connected to WebSocket server');
      this.register(userId);
    };

    this.ws.onmessage = (event: MessageEvent) => {
      const message: WSMessage = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setTimeout(() => this.connect(userId), 3000);
    };

    this.ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
  }

  private register(userId: string): void {
    this.send({
      type: 'register',
      userId: userId
    });
  }

  send(message: WSMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private handleMessage(message: WSMessage): void {
    const callback = this.callbacks[message.type];
    if (callback) {
      callback(message);
    }
  }

  on(eventType: string, callback: (message: WSMessage) => void): void {
    this.callbacks[eventType] = callback;
  }

  // Call methods
  initiateCall(toUserId: string, callerName: string): void {
    this.send({
      type: 'incoming-call',
      to: toUserId,
      callerName: callerName
    });
  }

  acceptCall(fromUserId: string): void {
    this.send({
      type: 'accept-call',
      from: fromUserId
    });
  }

  rejectCall(fromUserId: string): void {
    this.send({
      type: 'reject-call',
      from: fromUserId
    });
  }

  endCall(): void {
    this.send({
      type: 'end-call'
    });
  }

  // WebRTC signaling
  sendOffer(sdp: RTCSessionDescriptionInit): void {
    this.send({
      type: 'createOffer',
      sdp: sdp
    });
  }

  sendAnswer(sdp: RTCSessionDescriptionInit): void {
    this.send({
      type: 'createAnswer',
      sdp: sdp
    });
  }

  sendIceCandidate(candidate: RTCIceCandidate): void {
    this.send({
      type: 'iceCandidate',
      candidate: candidate
    });
  }
}

export default new WebSocketService();
