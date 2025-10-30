const express = require("express");
// mergeParams is crucial to access the parent :id parameter from app.js
const router = express.Router({ mergeParams: true }); 
// You would also require controller/handler functions and middleware here

// Placeholder for review POST and DELETE routes
router.post("/", (req, res) => {
    // This route would handle creating a new review for a listing
    res.send(`Review posted for listing ${req.params.id}`);
});

router.delete("/:reviewId", (req, res) => {
    // This route would handle deleting a specific review
    res.send(`Review ${req.params.reviewId} deleted for listing ${req.params.id}`);
});

module.exports = router;