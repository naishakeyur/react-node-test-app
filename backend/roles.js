const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readAny("profile")
 .updateOwn("profile")
 

ac.grant("admin")
 .extend("basic")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();