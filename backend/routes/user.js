const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getProfile);
router.put('/preferences', auth, userController.updatePreferences);
router.put('/lastread', auth, userController.updateLastRead);
router.post('/bookmark', auth, userController.addBookmark);
router.delete('/bookmark', auth, userController.removeBookmark);

module.exports = router; 