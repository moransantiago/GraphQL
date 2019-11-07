'use strict'

const { MongoClient } = require('mongodb');

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`;
let connection;

const connectDB = async () => {
    if (connection) return connection;

    try {
        const client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection = client.db(DB_NAME);
    } catch (error) {
        console.log('Could not connect to db', mongoUrl, error);
        process.exit(1);
    }

    return connection;
}

module.exports = connectDB;