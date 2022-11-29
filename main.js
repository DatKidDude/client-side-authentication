const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const toggleBtn = document.querySelector(".toggle-password > i");
let showPassword = false;

form.addEventListener("submit", (e) => {
  // Validating form only on submit
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  // get the values from the inputs
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPassValue = confirmPass.value.trim();

  // Username validation
  if (usernameValue === "") {
    // show error
    // add error class
    showError(username, "Username cannot be empty");
  } else {
    // show success class
    showSuccess(username);
  }

  // Email validation
  if (emailValue === "") {
    showError(email, "Email cannot be empty");
  } else if (!validEmail(emailValue)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }

  // Password validation
  if (passwordValue === "" || passwordValue.length < 8) {
    showError(password, "Password must be more than 8 characters");
  } else {
    showSuccess(password);
  }

  // Confirm password validation
  if (confirmPassValue === "") {
    showError(confirmPass, "");
  } else if (confirmPassValue !== passwordValue) {
    showError(confirmPass, "Passwords do not match");
  } else {
    showSuccess(confirmPass);
  }
}

function showError(input, message) {
  const formControl = input.parentElement; // .form-control
  const small = formControl.querySelector(".small-text");

  // add error messages inside .small-text
  small.innerText = message;

  // add error class
  formControl.className = "form-control error";
}

function showSuccess(input) {
  const formControl = input.parentElement; // .form-control

  // add success class
  formControl.className = "form-control success";
}

function validEmail(emailValue) {
  // Email regex from HTML5 spec
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(emailValue);
}

// Calling showToggleButton function on password
password.addEventListener("input", showToggleButton);

function showToggleButton() {
  // Display toggle button icon if there is text in the input field
  if (password.value.length > 0) {
    toggleBtn.style.visibility = "visible";
  } else {
    toggleBtn.style.visibility = "hidden";
  }
}

// Removing the toggle if no text is in the input field
password.addEventListener("focus", () => {
  if (showPassword && password.value.length < 1) {
    togglePasswordVisible();
  }
});

toggleBtn.addEventListener("click", () => {
  togglePasswordVisible();
});

// Toggling between displaying and hiding password
function togglePasswordVisible() {
  showPassword = !showPassword;
  if (showPassword) {
    toggleBtn.classList = "fa-regular fa-eye-slash";
    password.setAttribute("type", "text");
    confirmPass.setAttribute("type", "text");
  } else {
    toggleBtn.classList = "fa-regular fa-eye";
    password.setAttribute("type", "password");
    confirmPass.setAttribute("type", "password");
  }
}
