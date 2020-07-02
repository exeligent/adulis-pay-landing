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
      res.render("admin/messages");
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
  renderSubscribers: async (req, res, next) => {
    try {
      res.render("admin/subscribers");
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
