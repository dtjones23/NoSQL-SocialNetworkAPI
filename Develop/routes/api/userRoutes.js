const router = require('express').Router();
const {
    getUsers,
    createUser,
    findUserById,
    updateUserById,
    deleteUserByid,
    addFriend,
    deleteFriend
} = require('../../controllers/userController') 

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(findUserById).put(updateUserById).delete(deleteUserByid)
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;