const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/');
  }

  // relative path to /views fofled
  res.render('admin/edit-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      console.log('Created a Product');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      // TODO: show an error instead
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Products',
        path: '/admin/add-product',
        editing: true,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log('delete product...');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getProducts = async (req, res, next) => {
  Product.find()
    // .select('') - selects all passed fields
    // we can get whole user object using .populate() method
    // it will store user object to the userId field
    .populate('userId', 'name')
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};
