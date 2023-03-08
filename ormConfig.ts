import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config:MysqlConnectionOptions={
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'ssi-backend-db',
        entities: ['dist/**/*.entity.js'],
        synchronize: false
        
        
}

export default config;