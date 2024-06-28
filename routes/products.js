const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const authmid = require('../middlewares/auth');

router.get('/newadd', authmid, (req, res) => {
  res.render("newadd", { items: global.items });
});

router.post('/newadd', async (req, res) => {
  try {
    const { img, source, destination, price, description } = req.body;

    const newProduct = new Products({
      img,
      source,
      destination,
      price,
      description
    });

    await newProduct.save();
    res.redirect('/product');
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/update/:id',authmid, async (req, res) => {
  try {
    const item = await Products.findById(req.params.id);
    res.render('update', { item });
  } catch (error) {
    console.error('Error fetching package for update:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const { img, source, destination, price, description } = req.body;
    await Products.findByIdAndUpdate(req.params.id, { img, source, destination, price, description });
    res.redirect('/product');
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.redirect('/product');
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;