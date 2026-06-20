const User = require("../models/User");

exports.addToCart = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.cart.push({
    product: req.body.productId,
    quantity: 1
  });

  await user.save();
  res.json(user.cart);
};