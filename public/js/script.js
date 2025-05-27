const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("submitAccountDetails");

form.addEventListener("submit", (e) => {
  if (password.value != confirmPassword.value) {
    alert("Error! Passwords must be same");
    e.preventDefault();
  }
});
