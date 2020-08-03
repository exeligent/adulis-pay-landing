document
  .getElementById("subscriptionForm")
  .addEventListener("submit", submitSubForm);
function submitSubForm(e) {
  e.preventDefault();
  const email = document.querySelector("#_email").value;
  let b_b7ef45306f8b17781aa5ae58a_6b09f39a55;
  if (document.querySelector("#b_b7ef45306f8b17781aa5ae58a_6b09f39a55").value)
    b_b7ef45306f8b17781aa5ae58a_6b09f39a55 = document.querySelector(
      "#b_b7ef45306f8b17781aa5ae58a_6b09f39a55"
    ).value;
  // const captcha = document.querySelector("#g-recaptcha-response").value;
  fetch("/subscribe", {
    method: "POST",
    headers: {
      Accept: "application/json , text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, b_b7ef45306f8b17781aa5ae58a_6b09f39a55 }),
  })
    .then((res) => res.json())
    .then((data) => {
      //init views
      document.getElementById("sub_error").innerHTML = "";

      /*  document.getElementById("captcha_error").innerHTML = "";
       */
      //setup errors
      /*     if (data.captcha) {
        document.getElementById("captcha_error").innerHTML = data.captcha;
      } */
      if (data.email) {
        document.getElementById("sub_error").innerHTML = data.name;
      }
      //if success
      if (data.success) {
        document.getElementById("sub_success").innerHTML =
          "Thank you for subscribing!";
        document.getElementById("sub_success").style["display"] =
          "inline-block";
        document.getElementById("sub_success").style["textAlign"] = "center";
        document.getElementById("subscriptionForm").style["display"] = "none";
      }
    });
}
