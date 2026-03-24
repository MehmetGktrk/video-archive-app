const config = require('../config/config');
const { MongoClient } = require('mongodb');

let dbClient = null;
let dbInstance = null;


async function connectDB() {
    if(!dbClient){
        try {
            const client = new MongoClient(config.mongoURI);

            await client.connect();

            dbClient = client;
            dbInstance = client.db(config.databaseName);

            console.log('Connected Database');
        } catch (err) {
            console.error('Failed To Connect Database: ' + err);
            process.exit(1);
        }
        
    }
    return dbInstance;
}


function getDB(){
    if(!dbInstance){
        throw new Error('Database Not Connected, Call connectDB first.');
    }
    
    return dbInstance;
}

module.exports = { connectDB, getDB }