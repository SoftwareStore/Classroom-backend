const passport = require('passport');

module.exports = {
    login: async (req, res, next) => {
        try {
            res.render('login', { user: req.user });
            res.status(200).json(users);
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
        }
    },
    logout: async (req, res, next) => {
        try {
            req.logout();
            req.session = null;
            res.clearCookie();
            res.redirect('http://localhost:3000');
            res.status(200);
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
        }
    }
}