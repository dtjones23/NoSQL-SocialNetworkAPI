const { User, Thought } = require('../models');

module.exports = {
    // get users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get user _id

    async createUser (req, res) {
        try {
            const makeUser = await User.create(req.body);
            res.json(makeUser)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}