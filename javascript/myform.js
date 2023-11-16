/* NEWSLETTER SIGN UP FORM */

// Function to validate form inputs

function validateInputs() {
    // Initialize variables for form submission and error messages
    var SubmitForm = true;
    var FormErrors = "";
  
    // Retrieve and trim values from input fields
    var fullname = document.MyForm.fullname.value.trim();
    var email = document.MyForm.email.value.trim();
    var phone = document.MyForm.phone.value.trim();
  
    // Check if any of the mandatory fields is empty
    if (fullname.length < 1 || email.length < 1 || phone.length < 1) {
      FormErrors = "All fields are mandatory. Please complete the form.";
      SubmitForm = false;
    } else {
      // Validate email format using a regular expression
      var emailFilter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  
      // Check if the email is in a valid format
      if (!emailFilter.test(email)) {
        FormErrors =
          "Your form contains invalid email. Please correct your form before submitting";
        SubmitForm = false;
      }
  
      // Check phone number for only numbers and dashes
      var phoneFilter = /^[0-9-]+$/;
      if (!phoneFilter.test(phone)) {
        FormErrors = "Invalid phone number. Please use only numbers and dashes.";
        SubmitForm = false;
      }
    }
  
    // If there are form errors, display an alert and prevent form submission
    if (SubmitForm == false) {
      alert(FormErrors);
      return false;
    } else {
      // Display the sanitized data block
      document.getElementById("sanitizedDataBlock").style.display = "block";
      document.getElementById("successImage").style.display = "block";
  
      // Sanitize user inputs by removing unwanted characters
  
      var sanitizedFullname = fullname.replace(/[^a-z0-9\s\-]/gim, "");
      var sanitizedEmail = email.replace(/[^a-z0-9_@.-]/gim, "");
      var sanitizedPhone = phone.replace(/[^0-9-]/gim, "");
  
      // Display sanitized data in the designated elements
  
      document.getElementById("sanitizedFullname").innerHTML = sanitizedFullname;
      document.getElementById("sanitizedEmail").innerHTML = sanitizedEmail;
      document.getElementById("sanitizedPhone").innerHTML = sanitizedPhone;
  
      // Prevent the form from being submitted
      return false;
    }
  }
  