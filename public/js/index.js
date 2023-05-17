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

    if (firstName === "" || lastName === "" || suburb === "" || email === "" || contactNumber === "" || location === "" || jobName === "" || jobDescription === "" || date === "" || price === "" || duration === "") {
        alert("Please fill out all fields before submitting!");
        return;
    };

    if(!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    };

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

// Register the formSubmission function as the submit event handler for the form
$("form").submit(postJobForm);

const signUpForm = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    if (firstName === "" || lastName === "" ||  email === "" || password === "") {
        alert("Please fill out all fields before submitting!");
        return;
    }   

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }   

    const userData = {
        firstName,
        lastName,
        email,
        password,
    };

    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(response.ok) {
        alert("Your account has been created!");
        console.log("account created");
        
    } else {
        alert("Failed to create account.");
        console.log("account not created");
    }
};

// Register the signUpForm function as the submit event handler for the form
$("#sign-up-form").submit(signUpForm);