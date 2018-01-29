require('dotenv').config()
const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});


router.post('/register', (req, res) => {
  // A user registers with a mobile phone number
  let phoneNumber = req.body.number;
  let message = req.body.message;
  
  console.log(phoneNumber);
  nexmo.verify.request({number: phoneNumber, brand: message}, (err, result) => {
    if(err) {
      //res.sendStatus(500);
      res.render('status', {message: 'Server Error'});
    } else {
      console.log(result);
      let requestId = result.request_id;
      if(result.status == '0') {
        res.render('verify', {requestId: requestId});
      } else {
        //res.status(401).send(result.error_text);
        res.render('status', {message: result.error_text, requestId: requestId});
      }
    }
  });
});


module.exports = router;
