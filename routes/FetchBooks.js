const { Router } = require('express');
const router = Router();

let books = require('../Books');

router.get('/', (req, res) => {
    res.json(books)
})

router.post('/', (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }
    books.push(newBook)
    res.json(books)
})

router.delete('/:title', (req, res) => {
    let { title } = req.params
    let bookToBeDeleted = books.find(book => book.title === title);

    if(bookToBeDeleted) {
        res.json({
            message: `The book ${req.params.title} was deleted`,
            books: books.filter(book => book.title !== title)
        })
    } else {
        res.status(404)
        .json(({message: `The book ${req.params.title} doesn't exist`}))
    }
})

router.put('/:title', (req, res) => {
    let { title } = req.params
    let bookToBeUpdated = books.find(book => book.title === title);

    if(bookToBeUpdated) {
        const updateBook = req.body
        books.forEach(book => {
            if(book.title === req.params.title) {
                book = updateBook ? updateBook : book;
                res.json({message: `The book ${req.params.title} was updated`, book})
            }
        })
    } else {
        res.status(404)
        .json({
            message: `The book ${req.params.title} doesn't exist`, 
        })
    }
})

module.exports = router;