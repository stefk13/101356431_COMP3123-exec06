//TESTING TESTING TESTING

const express = require("express")
const BookModel = require('../models/Books')

const routes = express.Router()

//Get All Books
routes.get("/books", async (req, res) => {

    try{
        const bookList = await BookModel.find({})
        res.status(200).send(bookList)
    } catch(error){
        res.status(500).send(error)
    }

})

//Add NEW Book
routes.post("/books", async (req, res) => {
    try{
            const newBook = new BookModel({
                ...req.body
            })
            await newBook.save()
            //BookModel.creat({})
            res.status(200).send(newBook)
        } catch(error){
            res.status(500).send(error)
        }
})

//Update existing Book By Id
routes.put("/book/:bookid", async (req, res) => {
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            req.params.bookid,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send({ message: "Book Not Found" });
        }

        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Delete Book By ID
routes.delete("/book/:bookid", async (req, res) => {

    //const book = await BookModel.deleteOne({_id : req.params.bookid})
    try{
        const book = await BookModel.findOneandDelete(req.params.bookid)
        if(!book){
        res.status(200).send({message: "Book Not Found"})
        }else{
            res.status(200).send(book)
        }
    } catch{
        res.status(500).send(error)
    }
    //res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.bookid);

        if (!book) {
            return res.status(404).send({ message: "Book Not Found" });
        }

        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Get All Books in sorted order
routes.get("/books/sort", async (req, res) => {
    try {
        const bookList = await BookModel.find({}).sort({ title: 1 }); // You can change the sorting criteria as needed.

        res.status(200).send(bookList);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = routes