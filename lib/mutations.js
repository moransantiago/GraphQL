'use strict'

const mydb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    createCourse: async (root, { input }) => {
        const newCourse = { teacher: '', topic: '', ...input };

        try {
            const db = await mydb();
            const course = await db.collection('courses').insertOne(newCourse);
            newCourse._id = course.insertedId;

            return newCourse;
        } catch (error) {
            console.log(error);
        }
    },
    editCourse: async (root, { id, input }) => {
        try {
            const db = await mydb();
            await db.collection('courses').updateOne(
                { _id: ObjectID(id) },
                { $set: input }
            );
            const course = await db.collection('courses').findOne({ _id: ObjectID(id) });

            return course
        } catch (error) {
            console.log(error);
        }
    },
    deleteCourse: async (root, { id }) => {
        try {
            const db = await mydb();
            await db.collection('courses').deleteOne({ _id: ObjectID(id) });

            return id;
        } catch (error) {
            console.log(error);
        }
    },
    createStudent: async (root, { input }) => {
        try {
            const db = await mydb();
            const student = await db.collection('students').insertOne(input);
            input._id = student.insertedId;

            return input;
        } catch (error) {
            console.log(error);
        }
    },
    editStudent: async (root, { id, input }) => {
        try {
            const db = await mydb();
            await db.collection('students').updateOne(
                { _id: ObjectID(id) },
                { $set: input }
            );
            const student = await db.collection('students').findOne({ _id: ObjectID(id) });

            return student
        } catch (error) {
            console.log(error);
        }
    },
    deleteStudent: async (root, { id }) => {
        try {
            const db = await mydb();
            await db.collection('students').deleteOne({ _id: ObjectID(id) });

            return id;
        } catch (error) {
            console.log(error);
        }
    },
    addPeople: async (root, { courseId, personId }) => {
        try {
            const db = await mydb();
            const course = await db.collection('courses').findOne({ _id: ObjectID(courseId) });
            const student = await db.collection('students').findOne({ _id: ObjectID(personId) });

            if (!course || !student) throw new Error('The student or course does not exists');
            await db.collection('courses').updateOne(
                { _id: ObjectID(courseId) },
                { $addToSet: { people: ObjectID(personId) } }
            );

            return course;
        } catch (error) {
            console.log(error);
        }
    }
};