// addFriend, getFriends, getFriendByID and deleteFriend

const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateUserId, validateFriendId } = require('../../auth/middleware');

// Deletes Friend

router.delete('/:user_id/:friend_id', validateUserId, validateFriendId, (req, res) => {
    const { user_id, friend_id } = req.params;
    db.deleteFriendship(user_id, friend_id)
    .then(res => {
        // Deleting all swipes from the user
        db.deleteSwipes(user_id, friend_id)
        .then(res => {
          // Setting swipe to decline so the user doesn't show up again
          db.Decline(user_id, friend_id)
          .then(res => {
            res.status(200).json({ message: "You'll never see that guy again." })
          })
          .catch(err => {
          console.log(err);
          res.status(500).json({error: "Server error setting user to declined."})
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({error: "Server error deleting swipes."})
        })
      })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Server error during delete process."})
      })
})

module.exports = router;