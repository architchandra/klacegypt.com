
$(document).ready(function ()  {

  $('#form-trigger').on('click', function ()  {
    $('#klace-form-modal').css('display', 'flex');
  });

  $(document.body).on('click', '.close', function ()  {
      if($('.close').hasClass('not-submitted'))  {
          $('.form-grid').css('display', 'none');
      }  else  {
          location.reload(true);
      }

  });

  $('.nav').addClass('hide');
  $('.icon-toggle').on('click', function ()  {
    $('.nav').toggleClass('hide');
    $('.nav-icon-mobile i').toggleClass('fa-bars');
    $('.nav-icon-mobile i').toggleClass('fa-times');
  });

  $('#read-more-trigger').on('click', function ()  {
    $('#read-more-modal').css('display', 'flex');
  });

  $('#contact-form').on('submit', function (e)  {
    e.preventDefault();
    validateForm();
  });

  function validateForm()  {

      resetValidation();

      var nameError = false;
      var emailErrorBlank = false;
      var emailErrorFormat = false;
      var phoneError = false;
      var serviceError= false;
      var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if($('input#name').val() == '') {
          $('input#name').css('border-color', '#BD443B');
          nameError = true;
      }

      if($('input#email').val() == '')  {
          $('input#email').css('border-color', '#BD443B');
          emailErrorBlank = true;
      }

      if(!emailRegex.test($('input#email').val()))  {
          $('input#email').css('border-color', '#BD443B');
          emailErrorFormat = true;
      }

      if($('select#service option').filter(':selected').val() == '')  {
          $('select#service').css('border-color', '#BD443B');
          serviceError = true;
      }

      var blankErrors = nameError || emailErrorBlank || serviceError;

      if(blankErrors)  {
          $('.required-note').css('color', '#BD443B');
      }

      if(emailErrorFormat && !emailErrorBlank) {
          $('.email-format-error').removeClass('email-hide');

      }

      if(!blankErrors && !emailErrorFormat)  {
          submitForm();
      }

  }

  function submitForm()  {

      $('#submit-button').prop('disabled', true);

      var form_data = {
          'name' : $('input[name="name"]').val(),
          'email' : $('input[name="email"]').val(),
          'phone' : $('input[name="phone"]').val(),
          'service' : $('select[name="service"] option').filter(':selected').html(),
          'message' : $('textarea[name="msg"]').val()
      };

      $.ajax({
          type : 'POST',
          url : 'form.php',
          data : form_data,
          encode : true
      })

      .done(function(data, text)  {
          $('#contact-form').addClass('submitted');
          $('.ajax-message').removeClass('pre-submit');
          $('.ajax-message').append('<i class="fa fa-paper-plane-o fa-3x"></i>');
          $('.ajax-message').append(data);
          $('.ajax-message h2').css('color', '#3d3d3d');
          console.log(data);
      })

      .fail(function(data, text)  {
          $('#contact-form').addClass('submitted');
          $('.ajax-message').removeClass('pre-submit');
          $('.ajax-message').append('<i class="fa fa-frown-o fa-3x"></i>');
          $('.ajax-message').append('<h2>There was a problem in submitting this form. Please send an email to info@klaceegypt.com instead.</h2><h2>Really sorry for the inconvenience.</h2>');
          $('.ajax-message h2').css('color', '#3d3d3d');
          console.log(data);
      })

      .always(function(data, text)  {
          $('.close').removeClass('not-submitted');
          $('#submit-button').prop('disabled', false);
      });
  }

  function resetValidation()  {

      $('.contact-form input, .contact-form select').css('border-color', '#666');
      $('.required-note').css('color', '#000');
      if(!$('#email').hasClass('email-hide'))  {
          $('.email-format-error').addClass('email-hide');
      }

  }

});
