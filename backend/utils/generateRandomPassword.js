const bcrypt = require('bcrypt');

async function generateRandomPassword() {
    try {
        const saltRounds = 10;
        const randomString = 'your_random_string_generation_logic_here';
        const hashedPassword = await bcrypt.hash(randomString, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error generating random password:', error.message);
        throw error;
    }
}

module.exports = { generateRandomPassword }
