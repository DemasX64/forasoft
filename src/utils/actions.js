const ACTIONS = {
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  CREATE_ROOM: 'create-room',
  SET_NICKNAME: 'set-nickname',
  GET_NICKNAME: 'get-nickname',
  GET_ROOMS: 'get-rooms',
  GET_MEMBERS: 'get-members',
  SEND_MESSAGE: 'send-message',

  ADD_PEER: 'add-peer',
  REMOVE_PEER: 'remove-peer',
  RELAY_SDP: 'relay-sdp',
  RELAY_ICE: 'relay-ice',
  ICE_CANDIDATE: 'ice-candidate',
  SESSION_DESCRIPTION: 'session-description',
};

export default ACTIONS;
