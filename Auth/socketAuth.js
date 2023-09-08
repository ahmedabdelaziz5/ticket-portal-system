// function to check if the user who joines the socket is Auth or not 

const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");

exports.socketAuth = async (token, endpoints) => {
    try {
        let decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const isAllowed = await rbac.can(decoded.role, endpoints);
        return isAllowed;
    }
    catch (err) {
        res.status(500).json({
            err,
            message: "wrong signture for DB token !"
        })
    }

}