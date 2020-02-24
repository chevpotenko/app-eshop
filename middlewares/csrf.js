module.exports = function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
};
