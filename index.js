const express = require('express');
const app = express();

const booksRoute = require('./routes/FetchBooks');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/books', booksRoute);

app.listen(8080, () => {
    console.log('MY BOOKS PORT IS RUNNING AT 8080')
})