const Product = require('../../models/product.model');
const filterStatus = require('../../helpers/filterStatus');
const search = require('../../helpers/search');
const pagination = require('../../helpers/pagination');
module.exports.index = async (req, res) => {

    let find = {
        delete: false,
    }
    //filter
    if (req.query.status) {
        find.status = req.query.status
    };

    const filter = filterStatus(req.query);
    //End filter

    //search
    const objSearch = search(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex
    }
    //End search

    // Pagination
    const quantityProducts = await Product.countDocuments(find);

    const paginationObj = pagination({
            limit: 4,
            currentPage: 1
        },
        req.query,
        quantityProducts
    );
    // End Pagination

    const products = await Product.find(find)
        .sort({
            position: "desc"
        })
        .limit(paginationObj.limit)
        .skip(paginationObj.skip);

    res.render('admin/pages/products/products.pug', {
        title: "Trang sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: objSearch.keyword,
        paginationObj: paginationObj
    })
}

//Update 1 bản ghi
module.exports.changeStatus = async (req, res) => {

    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({
        _id: id
    }, {
        status: status
    });
    req.flash('success', 'Chỉnh sửa trạng thái thành công');
    res.redirect('back')
}


//Update nhiều bản ghi
module.exports.changeStatusMulti = async (req, res) => {
    const status = req.body.status;
    const ids = req.body.ids.split(", ");

    switch (status) {
        case "active":
        case "inactive":

            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: status
            });
            break;
        case "delete-all":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                delete: true,
                deleteAt: new Date()
            });
            break;

        case "change-position":
            ids.forEach(async item => {
                const [id, position] = item.split("-");
                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                });
            });

        default:
            break;
    }
    req.flash('success', `Chỉnh sửa thành công ${ids.length} sản phẩm`);
    res.redirect('back')
}

//Xóa mềm 1 bản ghi
module.exports.deleteOne = async (req, res) => {
    await Product.updateOne({
        _id: req.params.id
    }, {
        delete: true
    });
    req.flash('success', `Xóa thành công 1 sản phẩm`);
    res.redirect('back');
}

module.exports.create = (req, res) => {
    res.render('admin/pages/products/create.pug', {
        title: 'Trang tạo mới sản phẩm',
    })
}

module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || undefined;
    req.body.position = parseInt(req.body.position) || undefined;
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    const countProducts = await Product.countDocuments({});

    req.body.position = req.body.position || countProducts;
    const newProduct = new Product(req.body);
    newProduct.save();

    req.flash("success", "Tạo mới sản phẩm thành công")
    res.redirect("/admin/products")

}


module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({
        _id: id
    });
    res.render('admin/pages/products/edit.pug', {
        title: "Trang cập nhật sp",
        item: product
    });
}

module.exports.editPatch = async (req, res) => {
    if (req.body) {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.position = parseInt(req.body.position);
        if(req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        console.log(req.body);
    }

    
    await Product.updateOne({_id: req.params.id}, req.body)

    req.flash("success", "Cập nhật sản phẩm thành công")
    res.redirect("back")
}



module.exports.detail = async (req, res) => {

    const item = await Product.findOne({slug: req.params.slug});

    res.render('admin/pages/products/detail.pug', {
        title: item.title,
        item: item
    })
}




//Nghịch =))
module.exports.test = (req, res) => {
    res.send("Trang test");
}

