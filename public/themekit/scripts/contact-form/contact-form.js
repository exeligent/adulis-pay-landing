document.getElementById("contactForm").addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const comment = document.querySelector("#comment").value;
  // const captcha = document.querySelector("#g-recaptcha-response").value;
  console.log("name,email,comment", name, email, comment);
  fetch("/contact", {
    method: "POST",
    headers: {
      Accept: "application/json , text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, comment /* , captcha */ }),
  })
    .then((res) => res.json())
    .then((data) => {
      //init views
      document.getElementById("name_error").innerHTML = "";

      document.getElementById("email_error").innerHTML = "";

      document.getElementById("comment_error").innerHTML = "";

      /*  document.getElementById("captcha_error").innerHTML = "";
       */
      //setup errors
      /*     if (data.captcha) {
        document.getElementById("captcha_error").innerHTML = data.captcha;
      } */
      if (data.name) {
        document.getElementById("name_error").innerHTML = data.name;
      }
      if (data.email) {
        document.getElementById("email_error").innerHTML = data.email;
      }

      if (data.comment) {
        document.getElementById("comment_error").innerHTML = data.comment;
      }

      //if success
      if (data.success) {
        document.getElementById("success").innerHTML =
          "Your message has been sent successfully. Thank you for your  feedback! we will replay to you by your email shortly.";
        document.getElementById("success").style["display"] = "inline-block";
        document.getElementById("success").style["textAlign"] = "center";
        document.getElementById("contactForm").style["display"] = "none";
      }
    });
}
