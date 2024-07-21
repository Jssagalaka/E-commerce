/**
 * POST localhost:8989/ecomm/api/v1/categories
 */

const authMv = require("../middleware/auth.mv")



category_controller = require("../Controllers/category.controller")
// authMV = require("../middleware/auth.mv")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories",category_controller.createNewCategory)
}