const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
// router.use('/thought', thougthRoutes);

module.exports = router;