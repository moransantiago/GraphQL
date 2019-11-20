'use strict'

const mydb = require('./db');
const { ObjectID } = require('mongodb');

const errorHandler = require('./errorHandler');

module.exports = {
    Course: {
        people: async ({ people }) => {
            try {
                const db = await mydb();
                const ids = people ? people.map(id => ObjectID(id)) : [];
                const peopleData = ids.length > 0
                    ? await db.collection('students').find({ _id: { $in: ids } }).toArray()
                    : [];

                return peopleData;
            } catch (error) {
                errorHandler(error);
            }
        }
    },
    Person: {
        __resolveType: (person, context, info) => {
            if (person.phone) return 'Monitor';

            return 'Student';
        }
    },
    GlobalSearch: {
        __resolveType: (item, context, info) => {
            if (item.title) return 'Course'
            if (item.phone) return 'Monitor'

            return 'Student'
        }
    }
}