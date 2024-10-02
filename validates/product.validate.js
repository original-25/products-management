module.exports.createPost = (req, res, next) => {
    if(!req.body.title) {
        req.flash('error', "Bắt buộc phải nhập tiêu đề cho sản phẩm");
        res.redirect("back");
    }

    if(req.body.price == NaN) {
        req.flash('error', "Giá tiền phải là một số!");
        res.redirect("back");
    }
    if(!req.body.title||req.body.price == NaN) {
        return;
    }
    next();
}



module.exports.changeStatusMulti = (req, res, next) => {
    if(!req.body.ids) {
        req.flash('error', 'Yêu cầu chọn ít nhất 1 bản ghi');
        res.redirect('back');
        return
    }
    next();
}
