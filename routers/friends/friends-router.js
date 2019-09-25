const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateUserId, validateFriendId } = require('../../auth/middleware');

// Gets user's friends

router.get('/:user_id', validateUserId, (req, res) => {
  const { user_id } = req.params;
  db.getFriends(user_id)
  .then(friends => {
    res.status(200).json(friends);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Server error getting friends."});
  })
})

// Deletes Friend

router.delete('/:user_id/:friend_id', validateUserId, validateFriendId, (req, res) => {
    const { user_id, friend_id } = req.params;
    db.deleteFriendship(user_id, friend_id)
    .then(response => {
        // Deleting all swipes from the user
        console.log(response);
        db.deleteSwipes(user_id, friend_id)
        .then(response => {
          // Setting swipe to decline so the user doesn't show up again
          console.log(response);
          db.Decline(user_id, friend_id)
          .then(response => {
            console.log(response);
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