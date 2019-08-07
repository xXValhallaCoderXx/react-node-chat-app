import axios from 'axios';

interface LoginApi {
  email: string;
  password: string;
}

interface RegisterApi extends LoginApi {
  username: string
}

export const authServices = {
  loginApi: ({ email, password }: LoginApi) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/login', { email, password }, { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log("WHAT ERROR: ", error);
          if (error.response) {
            console.log("WHAT ERROR1: ", error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            reject(error.response);
          } else if (error.request) {
            console.log("WHAT ERROR2: ", error);
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            reject(error.request);
          }
        });
    });
  },
  registerApi: ({ email, password, username }: RegisterApi) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/register', { email, password, username }, { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log("WHAT ERROR: ", error);
          if (error.response) {
            console.log("WHAT ERROR1: ", error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            reject(error.response);
          } else if (error.request) {
            console.log("WHAT ERROR2: ", error);
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            reject(error.request);
          }
        });
    });
  },
};
