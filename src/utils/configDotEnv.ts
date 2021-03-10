import dotenv from 'dotenv'

dotenv.config()

const {
    SERVER_BASE_URL='http://localhost:8080/'
} = process.env

const config = {
    SERVER_BASE_URL: SERVER_BASE_URL
}

export default config
