const navToggle = document.querySelector("#toggle");
const navbar = document.querySelector("#navbar");

navToggle.addEventListener("click", () => {
  navbar.classList.toggle("navbar-show");
});

const postJobForm = async (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const jobName = $("#job-name").val();
  const jobCategory = $("#job-category").val();
  const jobDescription = $("#job-description").val();
  const suburb = $("#suburb").val();
  const date = $("#date").val();
  const time = $("#start-time").val();
  const duration = $("#duration").val();
  const price = $("#price").val();

  if (jobName === "") {
    $("#job-name-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (jobCategory === "") {
    $("#job-category-error")
      .text("Please select a job category!")
      .addClass("text-red-700 italic text-sm");
  }

  if (jobDescription === "") {
    $("#description-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (suburb === "") {
    $("#suburb-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (date === "") {
    $("#date-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (time === "") {
    $("#start-time-error")
      .text("Please enter a start time!")
      .addClass("text-red-700 italic text-sm");
  }
  if (price === "") {
    $("#price-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (duration === "") {
    $("#duration-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }

  const jobData = {
    job_name: jobName,
    job_description: jobDescription,
    job_suburb: suburb,
    job_date: date,
    job_time: time,
    job_duration: duration,
    job_price: price,
    job_category_id: jobCategory,
  };

  console.log(jobData);

  const response = await fetch("/api/job-post", {
    method: "POST",
    body: JSON.stringify(jobData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("job submitted");
    // Redirect to the same page with a query parameter jobPosted
    window.location.replace("/post-job?jobPosted=true");
  } else {
    console.log("job not submitted");
    // Redirect to the same page with a query parameter jobNotPosted
    window.location.replace("/post-job?jobNotPosted=true");
  }
};
$("#post-job-form").submit(postJobForm);

const signUpForm = async (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const firstNameSignUp = $("#signup-first-name").val();
  const lastNameSignUp = $("#signup-last-name").val();
  const suburbSignUp = $("#signup-suburb").val();
  const emailSignUp = $("#signup-email").val();
  const passwordSignUp = $("#signup-password").val();

  if (firstNameSignUp === "") {
    $("#signup-firstname-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }

  if (lastNameSignUp === "") {
    $("#signup-lastname-error")
      .text("Please enter your last name!")
      .addClass("text-red-700 italic text-sm");
  }

  if (suburbSignUp === "") {
    $("#signup-suburb-error")
      .text("Please enter your suburb!")
      .addClass("text-red-700 italic text-sm");
  }

  if (!emailRegex.test(emailSignUp)) {
    $("#signup-email-error")
      .text("Please enter a valid email address!")
      .addClass("text-red-700 italic text-sm");
  }

  if (passwordSignUp === "" || passwordSignUp < 6) {
    $("#password-error")
      .text("Please enter a password with at least 6 characters!")
      .addClass("text-red-700 italic text-sm");
  }

  const userData = {
    first_name: firstNameSignUp,
    last_name: lastNameSignUp,
    suburb: suburbSignUp,
    email: emailSignUp,
    password: passwordSignUp,
  };

  console.log(userData);

  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("account created");
    // Redirect to the homepage with a query parameter after successful signup
    window.location.replace("/?signupSuccess=true");
  } else {
    console.log("account not created");
    // Redirect back to the signup page with a query parameter after failing to signup
    window.location.replace("/signup?signupFailed=true");
  }
};

$("#sign-up-form").submit(signUpForm);

const loginForm = async (event) => {
  event.preventDefault();

  const emailLogin = $("#login-email").val();
  const passwordLogin = $("#login-password").val();

  if (emailLogin === "") {
    $("#login-email-error")
      .text("Ooos, Please fill enter your email!")
      .addClass("text-red-700 italic text-sm");
  }

  if (passwordLogin === "") {
    $("#login-password-error")
      .text("Ooos, Please enter your password!")
      .addClass("text-red-700 italic text-sm");
  }

  const loginData = {
    email: emailLogin,
    password: passwordLogin,
  };

  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("logged in");
    location.reload(); // Refresh the page
  } else {
    alert("Cannot Login at this time.");
    console.log("login error");
  }
};

$("#login-form").submit(loginForm);
