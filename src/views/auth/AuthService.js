import axios from "axios";

// const basicUrl = process.env.REACT_APP_URL;

export const api = axios.create({
    baseURL : `http://127.0.0.1:8008`,
    headers: {
        'Accept': `application/json`,
        'Content-Type': "application/json"
    },
});


api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token){
            config.headers.Authorization = `Bearer ${token}`
        } 
        return config
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.replace('http://127.0.0.1:3000/login')
            }
        }
    }
)