//localhost:8989/ecomm/api/v1/auth/signup

// I need to incript this 

const authController = require("../Controllers/auth.controller")
const authMV = require("../middleware/auth.mv")


module.exports = (app) =>{
    app.post("/ecomm/api/v1/auth/signup",[authMV.verifySignUpBody],authController.signup)

    /**
     * Route for 
     * POST localhost:8989/ecomm/api/v1/auth/signin
     */
      app.post("/ecomm/api/v1/auth/signin",[authMV.verifySignInBody],authController.signin)
}