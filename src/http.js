//1.导入axios
import axios from 'axios'
//2.传教axios实例
const http = axios.create({
    baseURL:'/api'
})

export default http
