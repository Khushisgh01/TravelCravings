const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a new listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    // Check if this is a file upload or URL input
    const hasFile = req.file;
    const hasImageUrl = req.body.listing && req.body.listing.image && req.body.listing.image.url;
    const imageType = req.body.imageType;
    
    // If no file and no image URL, this might be an edit operation keeping the current image
    // or a new listing with no image
    if (!hasFile && !hasImageUrl) {
        // This is valid - let the controller handle the case
        return next();
    }
    
    // Validate the request body
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isreviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};