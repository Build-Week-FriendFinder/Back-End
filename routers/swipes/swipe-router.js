// Decline, Request
const router = require('express').Router();
const db = require('../../auth/helpers');

const { validateSwiperId, validateSwipedId, checkUserCreds } = require('../../auth/middleware');

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

// Request swipe

router.post('/:swiper_id/:swiped_id/request', validateSwiperId, validateSwipedId, (req, res) => {
    const { swiper_id, swiped_id } = req.params;
    db.Request(swiper_id, swiped_id)
    .then(response => {
        console.log(response);
        res.status(201).json({message: "Request swipe added."})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Server error request swiping."})
    })
})

module.exports = router;