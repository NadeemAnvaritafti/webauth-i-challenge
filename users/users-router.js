const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', restrict, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to retrieve users' });
    })
});


// ------------------ Custom Middleware --------------------- //
function restrict(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'You shall not pass! '})
    }
}

module.exports = router;
