const Subscription = require("../model/subscription");
const Messages = require("../model/contact");
module.exports = {
  renderDashboard: async (req, res, next) => {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
  renderMessages: async (req, res, next) => {
    try {
      const messages = await Messages.find({}).sort({ date: -1 });

      res.render("admin/messages", { messages });
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
  renderSubscribers: async (req, res, next) => {
    try {
      const subscribers = await Subscription.find({}).sort({ date: -1 });

      res.render("admin/subscribers", { subscribers });
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
  renderRegister: async (req, res, next) => {
    try {
      res.render("admin/register");
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
};
