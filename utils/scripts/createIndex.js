'use strict'

const mydb = require('../../lib/db');

const errorHandler = require('../../lib/errorHandler');

const createIndex = async () => {
    try {
        const db = await mydb();
        await db.collection('students').createIndex({"$**": "text"});
        await db.collection('courses').createIndex({"$**": "text"});
    } catch (error) {
        errorHandler(error);
    }
}

createIndex();