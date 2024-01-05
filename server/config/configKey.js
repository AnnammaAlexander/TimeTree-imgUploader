import dotenv from 'dotenv';
dotenv.config()
export const configKeys={
    MONGO_URL:process.env.MONGODB_URL ,
    PORT:process.env.PORT ,
    jwtTokenKey:process.env.JWT_TOKEN_KEY,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
}   