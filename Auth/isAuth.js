const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");

// function to check if wether the user is authorized to do this or not !  

module.exports = (endpoints) => {
    return async (req, res, next) => {
        try {
            let barerToken = req.headers.authorization;
            let token = barerToken.split(" ")[1];
            let decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            const isAllowed = await rbac.can(decoded.role, endpoints);
            req.user = decoded;
            if (isAllowed) next();
            else {
                return res.status(401).json({
                    message: "Not Authorized !",
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                err,
                message: "wrong signture for DB token !"
            })
        }

    }
}



