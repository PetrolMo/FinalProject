const express = require('express')
const router = express.Router()
const { Api } = require('../public/javascripts/im')
router.get('/',(req,res) => {
  const username = req.query._id
  const expire = 86400
  const client = new Api('1400635365', '3c17aad638b84c16856a32065e02470e31fca75ae1e7c680feed3fe774407855')
  const UserSig = client.genUserSig(username, expire)
  res.send(UserSig)
})

module.exports = router
