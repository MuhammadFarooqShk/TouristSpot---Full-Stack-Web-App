$(document).ready(validationBinding);

function validationBinding() {
  $('#contactForm').submit(function(e) {
    e.preventDefault(); 

    var name = $('#name').val().trim();
    var message = $('#message').val().trim();
    var email = $('#email').val().trim();
    var error = false;

    if (name === '') {
      alert("Please Enter Name!");
      error = true;
    } else if (email === '') {
      alert("Please Enter Email!");
      error = true;
    } else if (email.indexOf('@') === -1 || email.indexOf(".com") === -1) {
      alert("Please Enter a Valid Email Address!");
      error = true;
    } else if (message === '') {
      alert("Please Enter Message!");
      error = true;
    }

    if (!error) {
      $.ajax({
        url: '/submitContact',
        method: 'POST',
        data: { name, email, message },
        success: function(response) {
          alert(response); 
          $('#name').val('');
          $('#email').val('');
          $('#message').val('');
        },
        error: function(xhr, status, error) {
          console.error('Error submitting form:', error);
          alert('An error occurred. Please try again later.');
        }
      });
    }
  });
}