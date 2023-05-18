const postJobForm = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    const suburb = $("#suburb").val();
    const email = $("#email").val();
    const contactNumber = $("#contact-number").val();
    const location = $("#location").val();
    const jobName = $("#job-name").val();
    const jobDescription = $("#job-description").val();
    const date = $("#date").val();
    const price = $("#price").val(); // Corrected ID: "Price" instead of "price"
    const duration = $("#duration").val(); // Corrected ID: "Est Duration" instead of "duration"

    if (firstName === '') {
        $("#first-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (lastName === '') {
        $("#lastname-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if(!emailRegex.test(email)) {
        $("#email-error").text("Please enter a valid email address!")
        .addClass("text-red-700 italic text-sm");
    };
    if (contactNumber === '') {
        $("#number-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (suburb === '') {
        $("#suburb-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (jobName === '') {
        $("#job-name-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (jobDescription === '') {
        $("#description-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }
    if (date === '') {
        $("#date-error").text("Please enter your first name!")
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
    if (firstName === '') {
        $("#first-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }


    const data = {
        firstName,
        lastName,
        suburb,
        email,
        contactNumber,
        location,
        jobName,
        jobDescription,
        date,
        price,
        duration,
    };

    console.log(data);

    const response = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify(data),
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
  
    const firstNameSignUp = $("#first-name").val();
    const lastNameSignUp = $("#last-name").val();
    const emailSignUp = $("#email").val();
    const passwordSignUp = $("#password").val();
  
    if (firstNameSignUp === '') {
        $("#firstname-error").text("Please enter your first name!")
        .addClass("text-red-700 italic text-sm");
    }

    if (lastNameSignUp === '') {
        $("#lastname-error").text("Please enter your last name!")
        .addClass("text-red-700 italic text-sm");
    }
    
    if (!emailRegex.test(emailSignUp)) {
        $("#email-error").text("Please enter a valid email address!")
        .addClass("text-red-700 italic text-sm");
    } 
    
    if ( passwordSignUp.length === '' || passwordSignUp.length < 6) {
        $("#password-error").text("Please enter a password with at least 6 characters!")
        .addClass("text-red-700 italic text-sm");
    } 

    const userData = {
      firstName: firstNameSignUp,
      lastName: lastNameSignUp,
      email: emailSignUp,
      password: passwordSignUp,
    };
  
    // const response = await fetch("/api/users", {
    //   method: "POST",
    //   body: JSON.stringify(userData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  
    // if (response.ok) {
    //   alert("Your account has been created!");
    //   console.log("account created");
    // } else {
    //   alert("Failed to create account.");
    //   console.log("account not created");
    // }
  };
  
  // Register the signUpForm function as the submit event handler for the form
  $("#sign-up-form").submit(signUpForm);
  