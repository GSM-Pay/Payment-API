import * as path from "path";

import * as dotenv from 'dotenv';

/* eslint-disable import/first */
dotenv.config({
    path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
});

dotenv.config();

import app from './';
/* eslint-enable import/first */

const port = process.env.PORT || 5000;

if (process.env.JEST_WORKER_ID === undefined) {
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
} else console.log('Test server running...');
