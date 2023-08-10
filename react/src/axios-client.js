import axios from 'axios';
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

//before request
axiosClient.interceptors.request.use((config)=>{
    // const token = localStorage.getItem("ACCESS_TOKEN")
    // config.headers.Authorization = `Bearer ${token}`
    // return config;

      const token = localStorage.getItem("ACCESS_TOKEN");
      config.headers.Authorization = `Bearer ${token}`

    return config;
})

//after response
axiosClient.interceptors.response.use((response)=>{     //fulfill function
    return response;
}, (error)=>{           //reject function
      const {response} = error;   //error.response.status
      if(response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
      }
    throw error;
})
export default axiosClient;
