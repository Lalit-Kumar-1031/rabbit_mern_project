const express = require("express");
const subscriberRouter = express.Router();
const Subscriber = require("../models/Subscriber");

//@route Post /api/subscribe
//@desc Handle the news letter subscription
//@access Public

subscriberRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(200).json({ message: "Email is required" });
    }

    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "email is already subscribed" });
    }

    // if not exist create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Newsletter subscribed successfully." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = subscriberRouter;
