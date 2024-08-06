import mongoose from "mongoose";
function dbConnect(){
    mongoose.connect("mongodb://localhost:27017/Sarah7a").then(
        () => {
            console.log("Database connection is successful");
        }
    ).catch(err => {
        console.log("dbConnection Error: "+err);
    }
    );
}
export default dbConnect;