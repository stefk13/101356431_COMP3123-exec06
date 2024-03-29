const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    author: {
        type: String,
        required: true,
        lowercased: true
    },
    price: Number,
    published_date: Date
})

module.exports = mongoose.model("book", bookSchema)