const validateContactInput = require("../validation/contactValidation");
const subValidation = require("../validation/subscribe");
const Contact = require("../model/contact");
const Subscribe = require("../model/subscription");
module.exports = {
  renderHome: async (req, res, next) => {
    try {
      res.render("index");
    } catch (error) {
      console.log("error", error);
      res.json("server error!");
    }
  },
  renderFeature: async (req, res, next) => {
    try {
      res.render("feature");
    } catch (error) {
      console.log("error", error);
      res.json("server error!");
    }
  },
  //send contact message to admins
  sendMessage: async (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);
    /* VALIDATION */
    if (!isValid) {
      return res.json(errors);
    }
    const { name, email, comment, captcha } = req.body;
    const contactBody = {};
    if (name) contactBody.name = name;
    if (email) contactBody.email = email;
    if (comment) contactBody.message = comment;
    if (captcha) contactBody.captcha = captcha;
    //captcha validation
    /*     if (captcha === "" || captcha === undefined || captcha === null) {
      const errors = { captcha: "Please select captcha" };

      return res.json(errors);
    } */
    //Secret key
    const sectretKey = "6Le_XAEVAAAAAK_tvhXfXSeCZn5q1PMS7Q8osuCL";

    //Varify url
    /*   const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${sectretKey}&response=${captcha}&remoteip${req.connection.remoteAddress}`;

    //make request to Verify url
    request(verifyUrl, async (err, response, body) => {
      body = JSON.parse(body);
      console.log("err", err);
      //If not successful
      if (body.success != undefined && !body.success) {
        const errors = { captcha: "Faild captcha varification!" };

        return res.json(errors);
      } */
    // if successful
    const contact = new Contact(contactBody);
    await contact.save();
    req.flash("success_form", "Your message is sent successfully. Thank you!");
    const success = { success: true };
    res.json(success);
    // });
  },

  subscribe: async (req, res, next) => {
    try {
      console.log("req.body", req.body);
      if (req.body.b_b7ef45306f8b17781aa5ae58a_6b09f39a55) {
        return res.status(401).json({ error: "Robot registeration detected!" });
      }
      const { errors, isValid } = subValidation(req.body);

      if (!isValid) {
        console.log("errors", errors);
        req.flash("sub_error", "Invalid input! Please try again...");
        return res.redirect("/#subscribe");
      } else {
        const { email } = req.body;
        const sub = await Subscribe.findOne({ email });

        if (sub) {
          req.session.sub = email;

          req.flash("success_form", "Thank you for subscribing!");
          return res.json({ success: true });
        }
        subscriptioContent = {};
        if (email) subscriptioContent.email = email;

        const subscribe = new Subscribe(subscriptioContent);
        await subscribe.save();
        // req.session.sub = email;
        return res.json({ success: true });

        //construct req data
        /*     const data = {
          members: [
            {
              email_address: email,
              status: "subscribed",
            },
          ],
        }; */
        /* 
        const postData = JSON.stringify(data);
        //send to mail chimp
        const options = {
          url: "https://us10.api.mailchimp.com/3.0/lists/bafd236082",
          method: "POST",
          headers: {
            Authorization: "auth 8a1d9c643554ddc10da0103ca7eb8f01-us10",
          },
          body: postData,
        };
        request(options, (err, response, body) => {
          if (err) {
            console.log("err", err);
            req.flash("error", "Error while subscribing");
            res.redirect("/"); //
          } else {
            if (response.statusCode === 200) {
              req.flash("success_form", "Thank you for subscribing!");
              res.redirect("/#subscribe");
            } else {
              console.log("error", response.statusCode);
              req.flash("error", "Error while subscribing");
              res.redirect("/");
            }
          }
        }); */
      }
    } catch (error) {
      console.log("error", error);
      res.json("server error!");
    }
  },
};
