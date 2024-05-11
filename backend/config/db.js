const mongoose = require('mongoose');

const conntectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MogoDB Database Connected`)
    } catch (error) {
        console.log(`Error in MongoDB`)
    }
}

module.exports = {
    conntectDB
}