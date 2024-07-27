import { Sequelize } from 'sequelize';
const conn = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
});
async function Migrate(){
    await conn.sync({alter: true});
}
Migrate();
export{conn}