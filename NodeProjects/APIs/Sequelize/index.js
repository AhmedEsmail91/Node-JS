import express from 'express'
import {Sequelize,DataTypes} from 'sequelize'
const app = express()
app.use(express.json());
const port = 3000
//DB Connection:
const conn = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
  });

//check the connection:
/*conn.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
*/
// Making Schema:
let userModel=conn.define('user', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        allowNull: false, //nullable or not
        type: DataTypes.STRING(255)
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true //unique or not
    },
    email: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: 'ahmed@yahoo.com' //default value
    },
    password:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    salary:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
});
// incase of not using createdAt and updatedAt columns in the table.
// while creating the table we can pass the third argument as {timestamps: false} as attribute.
// to enable onlyone of the timestamps we can pass the third argument as {createdAt: false} or {updatedAt: false} as attribute. or use the extend way.

// Creating the table in the database with the schema defined above.
/* conn.sync().then(() => {
//     console.log("Tables created successfully");
});
*/

async function Migrate(){
    
    /*
     * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
     * User.sync({ force: true }) - This creates the table, dropping it first if it already existed, too dengerous to use if we have data already there.
     * User.sync({ alter: true }) - This checks what is the current state of the table in the database 
     * (which columns it has, what are their data types, etc),
     *  and then performs the necessary changes in the table to make it match the model.
     */
    await conn.sync({alter: true});
}

// Migrate();//calling the function to create the tables in the database.

/* -------------Droping the table from the database-------------
 * await User.drop(); --> this will drop the table from the database.
 * await sequelize.drop(); --> this will drop all the tables from the database.
 */

//-----------------Inserting the record in the table-----------------
 // Add this line to parse the request body
 async function addUser(req,res){
    //Creating a record in the User table:
    const {firstName,lastName,email,password,salary}=req.body;
    await userModel.create({firstName,lastName,email,password,salary});
    res.json({"message":"Success"});
}
app.post('/addUser', addUser);

//-----------------Fetching the records from the table-----------------
async function fetchManipulation(req,res){
    let users=await userModel.findAll();
    // Specific attributes(including & excluding):
    // let users=await userModel.findAll({attributes: ['firstName', 'lastName']});
    // let users=await userModel.findAll({attributes: {exclude: ['id']}});
    //where clause:
    // let users=await userModel.findAll({where:{firstName: 'John'}});

    // aggregate functions:
    /* Modelname.findAll({attributes: [[Sequelize.fn('SQL_AGG_Function', Sequelize.col('Col.Name wanted to aggregate')), 'alias_name']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'no_of_users']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('salary')), 'total_salary']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('AVG', Sequelize.col('salary')), 'avg_salary']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('MAX', Sequelize.col('salary')), 'max_salary']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('Min', Sequelize.col('salary')), 'Min_salary']]});
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('salary')), 'distinct_salary']]}); // As they generated randomlly so they will be all distinct.
        * let users=await userModel.findAll({attributes: [[Sequelize.fn('CONCAT', Sequelize.col('firstName'),' ',Sequelize.col('salary') ,' ', Sequelize.col('lastName')), 'full_name']]});
    */
    
    // console.log(users);
    res.json(users);
    
};
app.get('/allUsers', fetchManipulation);
//-----------------Updating a record from the table-----------------

function updateUser(req,res){
    let id=req.params.id;
    userModel.update(
        req.body,
        {where:{id:id}});
    res.json({"message":"Record updated successfully"});
}
app.put('/updateUser/:id',updateUser);
//-----------------Deleting a record from the table-----------------

async function deleteUser(req,res){
    let id=req.params.id;
    await userModel.destroy({where:{id:id}});
    res.json({"message":"Record deleted successfully"});
}
app.delete('/deleteUser/:id', deleteUser);

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 