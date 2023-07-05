import axios from 'axios'
import {Contants} from "@/utils/contants"
import {API_TOKEN} from "@env"

export default axios.create({
  baseURL: Contants.baseURLApi,
  headers: {
    Authorization: API_TOKEN
  },
})
