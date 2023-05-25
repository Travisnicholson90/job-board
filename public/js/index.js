const navToggle = document.querySelector("#toggle");
const navbar = document.querySelector("#navbar");

navToggle.addEventListener("click", () => {
  navbar.classList.toggle("navbar-show");
});

const editJobForm = async (event) => {
  event.preventDefault();
  
    const editJobName = $("#edit-job-name").val();
    const editJobCategory = $('#edit-job-category').val();
    const editJobDescription = $("#edit-job-description").val();
    const editSuburb = $("#edit-suburb").val();
    const editDate = $("#edit-date").val();
    const editTime = $("#edit-start-time").val();
    const editDuration = $("#edit-duration").val(); 
    const editPrice = $("#edit-price").val(); 
    const jobId = $('#job-id').val()
    
    if (editJobName === '') {
        $("#job-name-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editJobCategory === '') {
      $('#job-category-error').text("Please select a job category!")
      .addClass("text-red-700 italic text-sm");
    }

    if (editJobDescription === '') {
        $("#description-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editSuburb === '') {
        $("#suburb-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editDate === '') {
        $("#date-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editTime === '') {
        $("#start-time-error").text("Please enter a start time!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editPrice === '') {
        $("#price-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (editDuration === '') {
        $("#duration-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
 
    const updateJobData = {
        job_name: editJobName,
        job_category_id: editJobCategory,
        job_description: editJobDescription,
        job_suburb: editSuburb,
        job_date: editDate,
        job_time: editTime,
        job_duration: editDuration,
        job_price: editPrice,
    };

    console.log(updateJobData);

    const response = await fetch(`/api/job-post/15`, {
        method: "PUT",
        body: JSON.stringify(updateJobData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        alert("Your job has been submitted!");
        console.log("job submitted");
    } else {
        alert("Failed to submit job.");
        console.log("job not submitted");
    }
}
$("#post-job-form").submit(editJobForm);


const postJobForm = async (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const jobName = $("#job-name").val();
    const jobCategory = $('#job-category').val();
    const jobDescription = $("#job-description").val();
    const suburb = $("#suburb").val();
    const date = $("#date").val();
    const time = $("#start-time").val();
    const duration = $("#duration").val(); 
    const price = $("#price").val(); 


 
    if (jobName === '') {
        $("#job-name-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (jobCategory === '') {
      $('#job-category-error').text("Please select a job category!")
      .addClass("text-red-700 italic text-sm");
    }

    if (jobDescription === '') {
        $("#description-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (suburb === '') {
        $("#suburb-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (date === '') {
        $("#date-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (time === '') {
        $("#start-time-error").text("Please enter a start time!")
        .addClass("text-red-700 italic text-sm");
    }
    if (price === '') {
        $("#price-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (duration === '') {
        $("#duration-error").text("Please enter your first name!")
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
        alert("Your job has been submitted!");
        console.log("job submitted");
    } else {
        alert("Failed to submit job.");
        console.log("job not submitted");
    }
}
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
    alert("Your account has been created!");
    console.log("account created");
    location.reload(); // Refresh the page
  } else {
    alert("Failed to create account.");
    console.log("account not created");
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
