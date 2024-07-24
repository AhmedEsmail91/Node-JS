import sql from 'mysql2';
const Query=sql.createConnection({
    host:"localhost",
    database:"session6_node",
    password:"",
    user:"root"
});
export {Query};