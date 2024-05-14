import * as dotenv from 'dotenv'

export const getEnv =()=>{
     dotenv.config({
        override: true, //if you don't want to use global env files and want to use the local env files
      path : `src/helper/env/.env.${process.env.ENV}`
     })
}