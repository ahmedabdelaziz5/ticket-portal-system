const roles = require("../../enums/roles");
const adminPolicy = require("../policy/adminPolicy");
const superAdminPolicy = require("../policy/superAdminPolicy");
const userPolicy = require("../policy/userPolicy");


const opts = {

    [roles.SUPERADMIN]: {
        can: superAdminPolicy,
    },

    [roles.ADMIN]: {
        can: adminPolicy,
    },

    
    [roles.USER]: {
        can: userPolicy,
    },

}

module.exports = opts;

