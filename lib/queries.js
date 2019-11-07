'use strict'

const mydb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    getCourses: async () => {
        try {
            const db = await mydb();
            const courses = await db.collection('courses').find().toArray();

            return courses;
        } catch (error) {
            console.log(error);
        }
    },
    getCourse: async (root, { id }) => {
        try {
            const db = await mydb();
            const course = await db.collection('courses').findOne({ _id: ObjectID(id) });

            return course;
        } catch (error) {
            console.log(error);
        }
    },
    getStudents: async () => {
        try {
            const db = await mydb();
            const students = await db.collection('students').find().toArray();

            return students;
        } catch (error) {
            console.log(error);
        }
    },
    getStudent: async (root, { id }) => {
        try {
            const db = await mydb();
            const student = await db.collection('students').findOne({ _id: ObjectID(id) });

            return student;
        } catch (error) {
            console.log(error);
        }
    }
};