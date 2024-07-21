/**
 * This will starting file of the project
 */
const express = require('express')
const mongoose = require('mongoose')
const server_conig = require('./configus/server.config')
const db_config = require('./configus/db.config')
const user_Model = require("./Models/user.model")
const bcrypt = require("bcryptjs")
const app = express()

app.use(express.json())//middlware json-> js object

/**
 * create an admin user starting of the application 
 * if not alreay present
 */

//connection with mongodb
mongoose.connect(db_config.db_url)


const db = mongoose.connection//start the connection with mongodb

db.on("error", () => {
    console.log("Error while connecting db");
})

db.once("open", () => {
    console.log("conncted to mongodb");
    //logic to insert data in db
    init()

    //running the quries on mongo db
    // dbquries()
})

async function init() {

    try {

        let user = await user_Model.findOne({ userId: "Admin" })

        if (user) {
            console.log("Admin is already present");
            return
        }

    } catch (error) {
        console.log("Error while reading the data");
    }

    try {
        user = await user_Model.create({
            name: "Jaydeep",
            userId: "Admin",
            email: "jaydeep@gmial.com",
            userType: "Admin",
            password: bcrypt.hashSync("welcome1", 8)
        })

        console.log("Admin created", user);
    } catch (error) {
        console.log("Error while create admin", error);
    }
}

//stich the route to the server

require("./Routers/auth.route")(app)
require("./Routers/category.route")(app)

//start the server
app.listen(server_conig.PORT, () => {
    console.log("server starting at port", server_conig.PORT);
})