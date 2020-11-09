const express = require('express')
const { getUserImg, createUserImg, updateUserImg } = require('../controllers/index')

const router = express.Router()

router.get('/:id', getUserImg)
router.post('/', createUserImg)
router.put('/', updateUserImg)


module.exports = router