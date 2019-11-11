'use strict'

const mydb = require('./db');
const { ObjectID } = require('mongodb');

const errorHandler = require('./errorHandler');

module.exports = {
    getCourses: async () => {
        try {
            const db = await mydb();
            const courses = await db.collection('courses').find().toArray();

            return courses;
        } catch (error) {
            errorHandler(error);
        }
    },
    getCourse: async (root, { id }) => {
        try {
            const db = await mydb();
            const course = await db.collection('courses').findOne({ _id: ObjectID(id) });

            return course;
        } catch (error) {
            errorHandler(error);
        }
    },
    getPeople: async () => {
        try {
            const db = await mydb();
            const students = await db.collection('students').find().toArray();

            return students;
        } catch (error) {
            errorHandler(error);
        }
    },
    getPerson: async (root, { id }) => {
        try {
            const db = await mydb();
            const student = await db.collection('students').findOne({ _id: ObjectID(id) });

            return student;
        } catch (error) {
            errorHandler(error);
        }
    },
    searchItems: async (root, { keyword }) => {
        try {
            const db = await mydb();
            const courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray();
            const people = await db.collection('students').find({ $text: { $search: keyword } }).toArray();
            const items = [...courses, ...people];

            return items;
        } catch (error) {
            errorHandler(error);
        }
    }
};