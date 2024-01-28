const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserByid,
    addFriend,
    deleteFriend
} = require('../../controllers/userController') 

// /api/users
router.route('/').get(getUsers).post(createUser)

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserByid)

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;