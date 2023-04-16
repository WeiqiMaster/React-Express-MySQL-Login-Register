import axios from "axios";


axios.defaults.baseURL = "/api/";
axios.defaults.withCredentials = true;

const register = async (credentials) => {
    const response = await axios.post(`auth/signup`, credentials);
    return response.data;
}

const login = async (credentials) => {
    return await axios.post(`auth/signin`, credentials);
}

const authenticate = async ({verificationCode}) => {
    const response = await axios.post(`auth/authenticate`, {verificationCode});    
    return response;
}

const checkIfAlreadyLoggedin = async () => {
    const response = await axios.post(`auth/verify`);    
    return response;
}

const logout = async () => {
    const response = await axios.post(`auth/signout`);    
    return response;
}

export {
    register,
    login,
    authenticate,
    checkIfAlreadyLoggedin,
    logout
}