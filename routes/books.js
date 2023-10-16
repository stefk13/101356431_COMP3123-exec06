const express = require("express")
const BookModel = require('../models/Books')
const routes = express.Router()

// Get All Books
routes.get("/books", async (req, res) => {
    try {
        const bookList = await BookModel.find({})
        res.status(200).send(bookList)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Add NEW Book
routes.post("/books", async (req, res) => {
    try {
        const newBook = new BookModel({
            ...req.body
        });
        await newBook.save()
        res.status(201).send(newBook)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Update existing Book By Id
routes.put("/books/:_id", async (req, res) => {
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send({ message: "Book Not Found" })
        }

        res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Delete Book By ID
routes.delete("/books/:_id", async (req, res) => {
    try {
        const book = await BookModel.findOneAndDelete({ _id: req.params._id })
        if (!book) {
            res.status(404).send({ message: "Book Not Found" })
        } else {
            res.status(204).send(book);
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

// Get Book By ID
routes.get("/books/:_id", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params._id)

        if (!book) {
            return res.status(404).send({ message: "Book Not Found" })
        }
        res.status(200).send(book)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = routes