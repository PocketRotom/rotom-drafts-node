const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



const routes = require('./src/routes/routes.config');

app.use('/', routes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port 3000.");
});
