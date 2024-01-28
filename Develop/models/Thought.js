// Thoughts model
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

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

        userName: {
            type: String,
            required: true
        },

        // createdAt: {
        //     type: Date,
        //     required: true,
        //     default: Date.now(),
        //     get: function () {
        //         return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a'); // using moment.js to format timestamp on query
        //     }
        // },
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
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
            // get: function () {
            //     return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
            // }
        },

        userName: { // refers to user that created thought
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;