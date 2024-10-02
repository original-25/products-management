const routeDashboard = require('./dashboard.route');
const routeProducts = require('./products.route')
module.exports = (app) => {
    app.use('/admin/dashboard', routeDashboard);
    app.use('/admin/products', routeProducts);
}