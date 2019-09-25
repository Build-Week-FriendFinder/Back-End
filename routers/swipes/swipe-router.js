const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateSwiperId, validateSwipedId } = require('../../auth/middleware');

// Decline swipe

router.post('/:swiper_id/:swiped_id/decline', validateSwiperId, validateSwipedId, (req, res) => {
    const { swiper_id, swiped_id } = req.params;
    db.Decline(swiper_id, swiped_id)
    .then(response => {
        console.log(response);
        res.status(201).json({message: "Decline swipe added."})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Server error decline swiping."})
    })
})

// Request swipe + friend addition if both users are requesting each other

router.post('/:swiper_id/:swiped_id/request', validateSwiperId, validateSwipedId, (req, res) => {
    const { swiper_id, swiped_id } = req.params;
    db.Request(swiper_id, swiped_id)
    .then(response => {
        console.log(response);
        // Checks if the swiped user has requested you as well and adds you as friends if so.
        db.addFriendship(swiper_id, swiped_id)
        .then(response => {
            console.log(response);
                res.status(201).json({message: "You are now friends!"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Server error checking friendship status."});
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Server error request swiping."})
    })
})

module.exports = router;