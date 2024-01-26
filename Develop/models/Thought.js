// Thoughts model
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
            get: () => dateFormat()// need to format timestamp on query!!!
        }
    }
)

// Schema to create a Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
            get: () => dateFormat()// need to format timestamp on query!!! , should be a function in '()'
        },

        username: { // refers to user that created thought
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtSchema
    .virtual('reactionCount')
    .get(function () { // virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;