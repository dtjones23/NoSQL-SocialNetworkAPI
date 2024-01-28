const { User } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // get user _id
    async getUserById(req, res) {
        try {
            const oneUser = await User.findOne({ _id: req.params.id })
                .populate({
                    path: "thoughts",
                    select: "-__v",
                })
                .select("-__v");
            if (!oneUser) {
                res.status(404).json({ message: "No user found with this id!" });
            } else {
                res.json(oneUser);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const makeUser = await User.create(req.body);
            res.status(201).json({ message: "User created successfully", user: makeUser });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // update a user by _id
    async updateUserById(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate({ _id: req.params.id }, body, {
                new: true,
                runValidators: true
            });
            if (!updateUser) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json({ message: "User updated successfully", user: updateUser });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete user by _id
    async deleteUserByid(req, res) {
        try {
            const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
            if (!deleteUser) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json({ message: "User deleted successfully", user: deleteUser });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!addFriend) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json({ message: "Friend added successfully", user: addFriend });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!deleteFriend) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};