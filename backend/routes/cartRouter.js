const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const cartRouter = express.Router();

//Helper function to get the cart by user id or guest id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//@route POST /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
cartRouter.post("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  const quantity = Number(req.body.quantity);
  try {
    if (!guestId && !userId) {
      return res
        .status(400)
        .json({ message: "UserId or Guest one is required " });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine if the user is logged in or guest
    const cart = await getCart(userId, guestId);

    // if Cart Exist , update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        // if product already exist, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      //recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      res.status(200).json(cart);
    } else {
      // create new cart for user or guest
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId,
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (e) {
    res.status(500).jsonp({ message: e.message });
  }
});

//@route PUT /api/cart
//@desc Update product quantity in the cart for user and guest
//@access Public

cartRouter.put("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  const quantity = Number(req.body.quantity);

  try {
    if (!guestId && !userId) {
      return res
        .status(400)
        .json({ message: "UserId or Guest one is required " });
    }
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    //check product exist in cart if yes then return the index if not return -1
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        //update the quantity
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove product if quantity is 0
      }

      // calculate total Price and update
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (e) {
    console.log("Error =>", e.message);
    res.status(500).json({ message: e.message });
  }
});

//@route Delete /api/cart
//@desc delete the product from the cart
//@access Public

cartRouter.delete("/", async (req, res) => {
  try {
    const { productId, size, color, userId, guestId } = req.body;

    if (!userId && !guestId) {
      return res
        .status(400)
        .json({ message: "userId or guestId one is required" });
    }
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      // calculate total Price and update
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/cart
//@desc Fetch the user cart or guest cart
//@access Public

cartRouter.get("/", async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    if (!userId && !guestId) {
      return res
        .status(400)
        .json({ message: "userId or guestId one is required" });
    }
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route PUSH /api/cart/merge
//@desc merge the guest cart into user cart on login
//@access Public

cartRouter.post("/merge", protect, async (req, res) => {
  try {
    const { guestId } = req.body;

    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      // if user cart exist
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestCartItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() == guestCartItem.productId &&
              item.size === guestCartItem.size &&
              item.color === guestCartItem.color,
          );

          if (productIndex > -1) {
            // if product exist into the cart, update the quantity
            userCart.products[productIndex].quantity += guestCartItem.quantity;
          } else {
            // otherwise ,add the guest cart item into the user cart
            userCart.products.push(guestCartItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (e) {
          console.log("Error in guest cart deletion", e);
        }

        res.status(200).json(userCart);
      } else {
        // If user has no existing cart then assign the guest cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;

        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // if guest cart already merged , then return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = cartRouter;
