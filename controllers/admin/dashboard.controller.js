module.exports.dashboard = (req, res) => {
    res.render("admin/pages/dashboard/dashboard.pug", {
        title: "Trang tổng quan"
    })
}
