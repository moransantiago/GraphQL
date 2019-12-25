'use strict'

require('dotenv').config();

const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');

const app = express()
const port = process.env.port || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const resolvers = require('./lib/resolvers');

//  Define initial schema
const typeDefs = readFileSync(
    join(__dirname, 'lib/schema.graphql'),
    'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}));

app.listen(port, () => console.log(`Listening at http://localhost:${port}/api`));
