class RoomService {
  static getRooms(io) {
    try {
      const { rooms } = io.sockets.adapter;
      const roomsArr = Array.from(
        rooms,
        ([name, value]) => ({ id: name, users: Array.from(value) }),
      );
      return roomsArr;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static getMembers(io, roomID, nicknamesObj) {
    try {
      const rooms = this.getRooms(io);
      const room = rooms.find((el) => el.id === roomID);
      const nicknames = room.users.map((user) => nicknamesObj[user]);
      return nicknames;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

module.exports = RoomService;
