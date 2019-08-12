import axios from 'axios';

interface RoomInfoApi {
  uid: string;
}

interface ParseRooms {
  uid: string;
  name: string;
}

export const chatRoomServices = {
  roomInfoApi: ({ uid }: RoomInfoApi) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/room/${uid}`, { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          if (error.response) {
            reject(error.response);
          } else if (error.request) {
            reject(error.request);
          } else {
            reject(error.message);
          }
        });
    });
  },
  parseRooms: (data: ParseRooms[]) => {
    const roomObject = {};
    for (const key of data) {
      roomObject[key.uid] = key;
      roomObject[key.uid].messages = []
      roomObject[key.uid].users = []
    }
    return roomObject;
  },
};
