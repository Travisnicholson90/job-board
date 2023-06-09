const navToggle = document.querySelector("#toggle");
const navbar = document.querySelector("#navbar");

// Toggle nav
navToggle.addEventListener("click", () => {
  navbar.classList.toggle("navbar-show");
});

// Add event listeners to toggle job details visibility
const toggleButtons = document.querySelectorAll(".btn-toggle-details");
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const details =
      button.parentElement.previousElementSibling.querySelector(".job-details");
    details.style.display = details.style.display === "none" ? "block" : "none";
  });
});

// Function to update a job added by the user
const editJobForm = async (event) => {
  event.preventDefault();

  const editJobName = $("#edit-job-name").val();
  const editJobCategory = $("#edit-job-category").val();
  const editJobDescription = $("#edit-job-description").val();
  const editSuburb = $("#edit-suburb").val();
  const editDate = $("#edit-date").val();
  const editTime = $("#edit-start-time").val();
  const editDuration = $("#edit-duration").val();
  const editPrice = $("#edit-price").val();
  const editJobId = $("#edit-job-id").val();

  // Check if at least one field is updated
  if (
    editJobName === "" &&
    editJobCategory === "" &&
    editJobDescription === "" &&
    editSuburb === "" &&
    editDate === "" &&
    editTime === "" &&
    editDuration === "" &&
    editPrice === ""
  ) {
    alert("Please update at least one field.");
    return;
  }

  // create an object to send to the database
  const updateJobData = {};

  if (editJobName) {
    updateJobData.job_name = editJobName;
  }

  if (editJobCategory) {
    updateJobData.job_category_id = editJobCategory;
  }

  if (editJobDescription) {
    updateJobData.job_description = editJobDescription;
  }

  if (editSuburb) {
    updateJobData.job_suburb = editSuburb;
  }

  if (editDate) {
    updateJobData.job_date = editDate;
  }

  if (editTime) {
    updateJobData.job_time = editTime;
  }

  if (editDuration) {
    updateJobData.job_duration = editDuration;
  }

  if (editPrice) {
    updateJobData.job_price = editPrice;
  }

  console.log(updateJobData);

  // send the object to the database
  const response = await fetch(`/api/myjobs/${editJobId}`, {
    method: "PUT",
    body: JSON.stringify(updateJobData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if the response is ok, redirect to the same page with success alert
  if (response.ok) {
    console.log("job submitted");
    // Redirect to the same page with a query parameter jobUpdated
    window.location.replace(`/edit-job/${editJobId}?jobUpdated=true`);
  } else {
    alert("Failed to submit job.");
    console.log("job not submitted");
  }
};

$("#edit-job-form").submit(editJobForm);

// Create a new job function
const postJobForm = async (event) => {
  event.preventDefault();

  const postJobName = $("#post-job-name").val();
  const postJobCategory = $("#post-job-category").val();
  const postJobDescription = $("#post-job-description").val();
  const postSuburb = $("#post-suburb").val();
  const postDate = $("#post-date").val();
  const postTime = $("#post-start-time").val();
  const postDuration = $("#post-duration").val();
  const postPrice = $("#post-price").val();

  // make sure that all fields are filled out
  if (postJobName === "") {
    $("#job-name-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postJobCategory === "") {
    $("#job-category-error")
      .text("Please select a job category!")
      .addClass("text-red-700 italic text-sm");
  }

  if (postJobDescription === "") {
    $("#description-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postSuburb === "") {
    $("#suburb-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postDate === "") {
    $("#date-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postTime === "") {
    $("#start-time-error")
      .text("Please enter a start time!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postPrice === "") {
    $("#price-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }
  if (postDuration === "") {
    $("#duration-error")
      .text("Please enter your first name!")
      .addClass("text-red-700 italic text-sm");
  }

  // create an object to send to the database
  const postJobData = {
    job_name: postJobName,
    job_description: postJobDescription,
    job_suburb: postSuburb,
    job_date: postDate,
    job_time: postTime,
    job_duration: postDuration,
    job_price: postPrice,
    job_category_id: postJobCategory,
  };

  // send the object to the database
  const response = await fetch("/api/job-post", {
    method: "POST",
    body: JSON.stringify(postJobData),
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

// Sign up function
const signUpForm = async (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const firstNameSignUp = $("#signup-first-name").val();
  const lastNameSignUp = $("#signup-last-name").val();
  const suburbSignUp = $("#signup-suburb").val();
  const emailSignUp = $("#signup-email").val();
  const passwordSignUp = $("#signup-password").val();

  // make sure that all fields are filled out correctly
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

  // create an object to send to the database
  const userData = {
    first_name: firstNameSignUp,
    last_name: lastNameSignUp,
    suburb: suburbSignUp,
    email: emailSignUp,
    password: passwordSignUp,
  };

  // send the object to the database
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
  }
};

$("#sign-up-form").submit(signUpForm);

// Login function
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

  // create an object to send to the database
  const loginData = {
    email: emailLogin,
    password: passwordLogin,
  };

  // send the object to the database
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
    console.log("login error");
    // Redirect back to the login page with a query parameter after failing to login
    window.location.replace("/login?loginFailed=true");
  }
};

$("#login-form").submit(loginForm);

//delete job function
const deleteJobs = async (event) => {
  event.preventDefault();

  //delete the job when the delete button is clicked
  const deleteJobId = $(event.target).find("#delete-job").val();
  console.log(deleteJobId);

  const askBeforeDelete = confirm("Are you sure you want to delete this job?");
  if (!askBeforeDelete) {
    return;
  }

  const response = await fetch(`/api/myjobs/${deleteJobId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("job deleted");
    // Redirect to the same page with a query parameter jobPosted
    window.location.replace("/myjobs");
  } else {
    console.log("job not deleted");
    // Redirect to the same page with a query parameter jobNotPosted
    window.location.replace("/myjobs");
  }
};

$(".delete-job-form").submit(deleteJobs);
