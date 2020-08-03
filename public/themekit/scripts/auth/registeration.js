document
  .getElementById("registerationForm")
  .addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch("/user/register", {
    method: "POST",
    headers: {
      Accept: "application/json , text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      //init views
      console.log("data", data);
      document.getElementById("name_error").innerHTML = "";
      document.getElementById("email_error").innerHTML = "";

      document.getElementById("password_error").innerHTML = "";

      if (data.name) {
        document.getElementById("name_error").innerHTML = data.name;
      }

      if (data.email) {
        document.getElementById("email_error").innerHTML = data.email;
      }

      if (data.password) {
        document.getElementById("password_error").innerHTML = data.password;
      }

      //if success
      if (data.success) {
        //show message
        document.getElementById("reg_success").innerHTML =
          name + " is regestered as a new administrator!";
        document.getElementById("reg_success").style["display"] =
          "inline-block";
        document.getElementById("reg_success").style["textAlign"] = "center";
      }
    });
}
