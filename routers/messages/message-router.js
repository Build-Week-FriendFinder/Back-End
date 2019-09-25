const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateUserId, validateFriendId } = require('../../auth/middleware');

// Send a message between users

router.post('/:user_id/:friend_id', validateUserId, validateFriendId, (req, res) => {
    const { user_id, friend_id } = req.params;
    const { message } = req.body;
    db.sendMessage(user_id, friend_id, message)
    .then(response => {
        console.log(response);
        res.status(201).json({ message: "Message created." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error sending message." });
    })
});

// Get messages between users

router.get('/:user_id/:friend_id', validateUserId, validateFriendId, (req, res) => {
    const { user_id, friend_id } = req.params;

    db.getMessages(user_id, friend_id)
    .then(messages => {
        res.status(200).json(messages);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting messages." });
    })
});

module.exports = router;