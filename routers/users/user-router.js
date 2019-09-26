const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateUserId, checkUserCreds } = require('../../auth/middleware');

// Add hobby to user

router.post('/hobbies/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    const hobby = req.body;
    db.addHobbyToUser(user_id, hobby)
    .then(saved => {
        const [ hobby_id ] = saved;
        db.findHobbyById(hobby_id)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error retrieving hobby by ID." })
        })
    })
    .catch(err => {
        console.log(err, "Hobby names cannot duplicate what is in the database. It's likely this hobby already exists.");
        db.findHobbyByName(hobby.name)
        .then(resp => {
            console.log(resp);
            // Adding existing hobby to user
            db.addUserHobby(user_id, resp.hobby_id)
            .then(response => {
                console.log(response, "Hobby successfully added.");
                res.status(201).json({message: "Hobby successfully added."});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Server error adding existing hobby to user." })
            })
          })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error finding hobby by its name."})
          })
    })
})

// Get all users

router.get('/', (req, res) => {
    db.findUsers()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting users" })
    });
});

// Get individual user

router.get('/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.findUserById(user_id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting user by id" })
    });
});

// Get user hobbies

router.get('/hobbies/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.getUserHobbies(user_id)
    .then(hobbies => {
        res.status(200).json(hobbies);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting user hobbies" })
    });
})

// Remove hobby from user

router.delete('/hobbies/:user_id/:hobby_id', validateUserId, (req, res) => {
    const { user_id, hobby_id } = req.params;
    db.removeHobbyFromUser(user_id, hobby_id)
    .then(removed => {
        res.status(200).json({message: "Hobby removed."});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Server error removing hobby from user."})
    })
})

// Delete user

router.delete('/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.removeUser(user_id)
    .then(response => {
        res.status(200).json({ message: `User with id: ${user_id} successfully deleted` });      
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error removing user" });
    });
});

// Get swipeable users

router.get('/:user_id/swipeable', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.getSwipeableUsers(user_id)
    .then(users => {
        if (users != false) {
            res.status(200).json(users);
        } else {
            res.status(200).json({ message: "You've swiped on all available users!" })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting swipeable users."})
    })
})

// Get list of users that the user has been requested by

router.get('/:user_id/requests', validateUserId, (req, res) => {
    const { user_id } = req.params;
    db.getRequests(user_id)
    .then(users => {
        if (users != false) {
            res.status(200).json(users);
        } else {
            res.status(200).json({ message: "You have no requests currently." })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting requests."})
    })
})

module.exports = router;