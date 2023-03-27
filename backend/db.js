const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect("mongodb+srv://svivek:sita@cluster1.is5oxku.mongodb.net/linkedin?retryWrites=true&w=majority")

module.exports = {
    connection
}