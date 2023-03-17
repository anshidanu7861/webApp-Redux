import axios from "axios";
import { useSelector } from "react-redux";


const instance=axios.create({
    baseURL:'http://localhost:3001',
    headers:{
    "Content-Type": "application/json"
    }
})
const accessToken = localStorage.getItem('access_token');
instance.defaults.headers.Authorization=`Bearer ${accessToken}`
instance.interceptors.request.use(
    config => {
      // Get the access JWT from local storage
      const accessToken = localStorage.getItem('access_token');
  
      // If the access JWT is set, add it to the Authorization header
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    error => Promise.reject(error)
  );
  
  // Add a response interceptor
  instance.interceptors.response.use(
    response => response,
    error => {
      // If the error is a 401 (unauthorized), try to refresh the access JWT
      if (error.response.status === 401) {
        // Get the refresh JWT from local storage

        const refreshToken = localStorage.getItem('refresh_token');
  
        // If the refresh JWT is set, send a refresh token request
        if (refreshToken) {
          return instance
            .post('/refresh-token', { refresh_token: refreshToken })
            .then(response => {
              // If the refresh token request is successful, update the access JWT and retry the original request
              localStorage.setItem('access_token', response.data.accessToken);
              error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return instance(error.config);
            });
        }
      }
  
      return Promise.reject(error);
    }
  );

export default instance