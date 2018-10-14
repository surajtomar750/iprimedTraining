// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  console.log("jquery function is ready")
  $("form[name='addproductform']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: "required",
      price: "required",
      description: "required",
      category: {
        required: true,
        minlength:14

      },
      image:"required"

    },
    // Specify validation error messages
    messages: {
      name: "Please enter your firstname",
      price: "Please enter your lastname",
      category: {
        required: "Please provide a category"

      },
      image: "Please add some images"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
