'use strict'

const mydb = require('../../lib/db');
const { ObjectID } = require('mongodb');

const errorHandler = require('../../lib/errorHandler');

const sale = async () => {
    try {
        console.log('object');
        const db = await mydb();
        await db.collection('students').createIndex({"$**": "text"});
        await db.collection('courses').createIndex({"$**": "text"});
    } catch (error) {
        errorHandler(error);
    }
}

sale();