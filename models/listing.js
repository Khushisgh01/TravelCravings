const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); // Import the Review model

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        enum: ['trending', 'rooms', 'iconic', 'mountains', 'castles', 'pools', 'camping', 'farms', 'arctic', 'deserts'],
        lowercase: true,
    },
    geometry: { // Schema for Leaflet/GeoJSON integration
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// Post-middleware to delete all associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;