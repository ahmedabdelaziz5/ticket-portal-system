const roles = require("../../enums/roles");
const superAdminPolicy = require("../policy/superAdminPolicy");
const userPolicy = require("../policy/userPolicy");

const opts = {

    [roles.SUPERADMIN]: {
        can: superAdminPolicy,
    },
    
    [roles.USER]: {
        can: userPolicy,
    },

}

module.exports = opts;

