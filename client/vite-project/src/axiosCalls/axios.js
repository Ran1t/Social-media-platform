import axios from "axios"                              // used to call the server from the client

export const axiosInstance=axios.create({
    baseURL:"http://localhost:8089/",                  // server
    headers:{
        "Content-Type":"application/json"              // the type in which data is transfered
    },
    withCredentials:true                               // cookie data can be send
})