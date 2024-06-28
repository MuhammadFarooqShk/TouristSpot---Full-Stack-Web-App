var express = require('express');
var router = express.Router();
const authmid=require('../middlewares/auth')
const midware=require('../middlewares/main-middleware')
const Products = require('../models/products');
const Contact = require('../models/contact');

router.get('/',midware,authmid, function(req, res, next) {
  res.render('landingpage');
});

router.get('/home',authmid,function(req,res){
  res.render('landingpage')
})

router.get('/contact-us',authmid ,function(req, res, next) {
  res.render('contact');
});

router.get('/contacting',authmid, async (req, res) => {
  try {
      const contacts = await Contact.find();
      res.render('contacting', { contacts });
  } catch (err) {
      console.error("Error fetching contacts: ", err);
      res.status(500).send("Server Error");
  }
});

router.get('/cv',authmid ,function(req, res, next) {
  res.render('cv',{layout:false});
});

router.get('/api-example',authmid ,function(req, res, next) {
  res.render('api');
});

router.get('/add',authmid ,function(req, res, next) {
  res.render('add');
});

router.get('/product', authmid, async (req, res) => {
  try {
    const itemsPerPage = 9;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Products.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const items = await Products.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.render('product', { items, currentPage: page, totalPages });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/about',authmid, function(req, res, next) {
  res.render('about');
});
// added
router.get('/landingpage', authmid, function(req, res, next) {
  res.render('landingpage', { items: global.items });
});

router.post("/package", (req, res) => {
  try {
    res.send(global.items);
  } catch (e) {
    res.send(e);
  }
});

router.get("/package", (req, res) => {
  try {
    res.send(global.items);
  } catch (e) {
    res.send(e);
  }
});

router.post('/submitContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;