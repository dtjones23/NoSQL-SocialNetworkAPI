const { Schema, model } = require('mongoose');

// Schema to create a User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // Uses regex to validate correct email format
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [ // id values referencing the Thought model
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [ // id values referencing the User model
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

userSchema
.virtual('friendCount')
.get(function () { // virtual called friendCount that retrieves the length of the user's friends array field on query.
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;