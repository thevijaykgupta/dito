const Listing = require("../models/Listing");

exports.createListing = async (req, res) => {
  const listing = await Listing.create({
    ...req.body,
    seller: req.user.id
  });

  res.json(listing);
};

exports.getListings = async (req, res) => {
  const listings = await Listing.find().populate("seller", "-password");
  res.json(listings);
};