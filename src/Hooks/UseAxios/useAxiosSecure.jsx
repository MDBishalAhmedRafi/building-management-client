import axios from 'axios';
import React from 'react';
import { getToken } from '../../Provider/AuthProvider';

const axiosSecure = axios.create({ 
                baseURL: `https://building-management-server-orpin.vercel.app`
                // baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
                const token = getToken()
                axiosSecure.interceptors.request.use(config => { 

                                config.headers.Authorization = `Bearer ${token}`
                                return config;
                }, 
error => { 
                return Promise.reject(error)
})
                return axiosSecure;
};

axios.interceptors.response.use(res => { 
                return res;
}, error=> { 
                console.log(error);
                return Promise.reject(error)
})

export default useAxiosSecure;