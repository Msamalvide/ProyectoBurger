import { registerAs } from "@nestjs/config"
import { config } from "dotenv"

config({path: './.env'})

const typeormConfig= {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    dropSchema: true,
}

export default registerAs('typeorm',()=> typeormConfig)