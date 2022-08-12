import axios from "axios";
import authInterceptor from "./interceptors/authInterceptor";

const host = axios.create({
  baseURL: 'http://localhost:3306'
})

const authHost = axios.create({
  baseURL: 'http://localhost:3306'
})

authHost.interceptors.request.use(authInterceptor)

export { host, authHost }
