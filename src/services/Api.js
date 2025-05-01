import axios from "axios";

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';

const API_KEY ="AIzaSyAXn9j2kPXvCLGjR4Nk4b5EGRsP3t_6BPw"
const REGISTER_URL =`/accounts:signUp?key=${API_KEY}`;
const Login_URL = `/accounts:SignInWithPassword?key=${API_KEY}`


export const RegisterAPI = (inputs) =>{
    let data  = {displayName:inputs.name
        ,email:inputs.email,
        password:inputs.password};
    return axios.post(REGISTER_URL,data)


}
export const LoginAPI = (inputs) =>{
    let data  = {email:inputs.email,
        password:inputs.password};
    return axios.post(Login_URL,data)


}