import axios from 'axios';

interface RoomInfoApi {
  uid: string;
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
};
