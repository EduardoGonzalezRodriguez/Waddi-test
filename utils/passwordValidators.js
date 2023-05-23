const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create encrypt password
async function createPassword(password) {
    let encryptPass = bcrypt.hashSync(password, saltRounds);
    return encryptPass
}

// Validate encrypt password
async function comparePassword(password, userPassword) {
    let hash = await createPassword(password);
    if (bcrypt.compareSync(userPassword, hash)) {
        // Passwords match
        return true
    } else {
        // Passwords don't match
        return false
    }
}

module.exports = {
    comparePassword,
    createPassword
}