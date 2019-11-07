'use strict'

const errorHandler = error => {
    console.log(error);
    throw new Error('Internal server error');
}

module.exports = errorHandler;