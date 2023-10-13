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
routes.post("/book/:bookid", (req, res) => {
    res.send({message: "Update existing Book By Id"})
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
routes.get("/book/:bookid", (req, res) => {
    res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    res.send({message: "Get All Books in sorted order"})
})

module.exports = routes