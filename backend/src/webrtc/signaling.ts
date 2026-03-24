// backend/src/webrtc/signaling.ts
import { Server, Socket } from 'socket.io';

interface CallState {
  caller: string;
  callee: string;
  type: 'voice' | 'video';
  status: 'ringing' | 'accepted' | 'rejected' | 'ended';
}

export const setupWebRTCSignaling = (io: Server) => {
  const calls: Map<string, CallState> = new Map();

  io.on('connection', (socket: Socket) => {
    // Incoming call
    socket.on('call-user', ({ userToCall, signalData, from, callType }: any) => {
      io.to(userToCall).emit('incoming-call', { signal: signalData, from, callType });
    });

    // Answer call
    socket.on('answer-call', ({ to, signal }: any) => {
      io.to(to).emit('call-accepted', signal);
    });

    // Reject call
    socket.on('reject-call', ({ to }: any) => {
      io.to(to).emit('call-rejected');
    });

    // End call
    socket.on('end-call', ({ to }: any) => {
      io.to(to).emit('call-ended');
      calls.delete(`${to}_${socket.handshake.auth.userId}`);
    });
  });
};
