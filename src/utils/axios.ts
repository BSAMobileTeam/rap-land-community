import axios from 'axios'

import config from './configDotEnv'

const instance = axios.create({
    baseURL: config.SERVER_BASE_URL    
})

export default instance
