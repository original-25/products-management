const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        delete: false
    }).sort({position: "desc"});
    
    products.forEach(item => {
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(1);
    })
    
    res.render('client/pages/products/index', {
        pageTitle: "Trang sản phẩm",
        products: products
    });
}

module.exports.detail = async (req, res) => {

    const item = await Product.findOne({slug: req.params.slug});

    if(item) {
        res.render('client/pages/products/detail.pug', {
            title: item.title,
            item: item
        })
    }

    else {
        res.redirect('back');
    }
}