const mongoose = require('mongoose');


mongoose.set('strictQuery', false);
const dbConnection = async () =>{

    try {
       
       await mongoose.connect(process.env.DB_CNN);

        console.log('DB online')
        
    } catch (error) {
       
        throw new Error('ERROR BD');
    }

}

module.exports = {
    dbConnection
}