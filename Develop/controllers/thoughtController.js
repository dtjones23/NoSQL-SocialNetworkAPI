const { Thought, User } = require('../models');

module.exports = {
    // get all Thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .populate({
                    path: "reactions",
                    select: "-__v",
                })
                .sort({ _id: -1 });
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },


    // get thought _id
    async getThoughtById(req, res) {
        try {
            const oneThought = await Thought.findOne({ _id: req.params.id })
                .populate({
                    path: "reactions",
                    select: "-__v",
                })
                .select("-__v");
            if (!oneThought) {
                res.status(404).json({ message: "No thought found with this id!" });
            } else {
                res.json(oneThought);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // create a thought
    // push the created thought's _id to the associated user's thoughts array field
    async createThought(req, res) {
        try {
            // Create a new thought
            const thought = await Thought.create(req.body);
            const { _id } = thought;
    
            // Update the user's thoughts array with the new thought
            const madeThought = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
    
            // Send a success response
            res.status(201).json({ message: "Thought successfully created!" });
        } catch (err) {
            // Handle any errors and send an error response
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // update a thought by _id
    async updateThoughtById(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });
            if (!updateThought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.status(200).json({ message: "Thought updated successfully", thought: updateThought });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete thought by _id
    async deleteThoughtById(req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!deleteThought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.status(200).json({ message: "Thought deleted successfully", thought: deleteThought });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // add reaction to thought
    async addReaction(req, res) {
        try {
            const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!addReaction) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.status(200).json({ message: "Reaction added successfully", thought: addReaction });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete reaction from thought
    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true, runValidators: true }
            );
            if (!deleteReaction) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.status(200).json({ message: "Reaction deleted successfully", thought: deleteReaction });
        } catch (err) {
            res.status(400).json(err);
        }
    }
}