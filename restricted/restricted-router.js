const router = require('express').Router();

const Users = require('../users/users-model');

router.get('/:id', restrict, validateUserId, (req, res) => {
    const id = req.params.id;

    Users.findById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to retrieve user' });
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

function validateUserId(req, res, next) {
    const id = req.params.id;
      Users.findById(id) 
      .then(user => {
          if (user) {
              req.user = user;
              next();
          } else {
              res.status(404).json({ message: 'invalid user id' })
          }
      })
      .catch(error => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
      })
}

module.exports = router;
