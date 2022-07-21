const Product = require('../models/product');

exports.getAddProdact = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    // use this options only in Hbs engine
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      // use this options only in Hbs engine
      activeShop: true,
      productCSS: true,
      hasProducts: products.length > 0,
    });
  });
};