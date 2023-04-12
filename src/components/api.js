import axios from "axios";


axios.defaults.baseURL = `http://localhost:3002/api/`;
// const BASE_URL = "localhost:8080/api/auth/"

const register = async (credentials) => {
    try {
        const response = await axios.post(`auth/signup`, credentials);
        
        return response.data;
      } catch (errors) {
        console.error(errors);
      }
}

const login = async (credentials) => {
    try {
        const response = await axios.post(`auth/signin`, credentials);
        
        return response.data;
      } catch (errors) {
        console.error(errors);
      }
}

const verify = async ({verificationCode}) => {
    // try {
        console.log(verificationCode)
        const response = await axios.post(`auth/verify`, {verificationCode});
        
        return response.data;
    //   } catch (error) {
    //     console.error(error.response);
    //     return error.response;
    //   }
}

export {
    register,
    login,
    verify,
}