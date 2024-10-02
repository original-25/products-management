const mongoose = require('mongoose');


slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
    title: String,
    description :String,   
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    delete: {
        type: Boolean,
        default: false,
    },
    position: Number,
    deleteAt: Date
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;