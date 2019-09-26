const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateUserId } = require('../../auth/middleware');

// Update user via survey

router.put('/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.updateUser(user_id, req.body)
    .then(user => {
        if(user) {
            res.status(201).json({ message: "User updated successfully" });
        } else{
            res.status(500).json({ error: "Server error, no users updated" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error updating user" })
    });
});

module.exports = router;