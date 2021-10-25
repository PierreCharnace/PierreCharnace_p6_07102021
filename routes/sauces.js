const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, saucesCtrl.createSauces);/////
router.put('/:id', auth, multer,  saucesCtrl.modifySauces);///////
router.delete('/:id', auth, saucesCtrl.deleteSauces);////// ALL ROUTES AND WHAT THEY DOING
router.get('/:id', auth, saucesCtrl.getOneSauces);///
router.get('/', auth, saucesCtrl.getAllSauces);////
router.post('/:id/like', auth, saucesCtrl.likeOrDislikeSauce);

module.exports = router;