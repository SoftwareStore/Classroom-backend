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
            res.redirect('https://classroombackend.herokuapp.com/');
            res.status(200).json({ success: true, status: "logout", })
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
        }
    }
}