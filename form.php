<?php

require 'file.php';

if(isset($_POST['name']))  {

  if(!empty($_POST['name'])&&!empty($_POST['email'])&&!empty($_POST['service']))  {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $site_name = $_POST['service'];

    $mail->Subject = 'New message from the '.$site_name.' website | Sender\'s name: '.$name.'';

    $mail->Body = 'Sender\'s name: '.$name."<br>"."Sender's email: ".$email."<br>"."Sender's phone: ".$phone."<br>"."Service interested in: ".$site_name."<br>"."Sender's message: ".$message."<br><br>"."End of email.";

    $mail->AltBody = 'Sender\'s name: '.$name."\n"."Sender's email: ".$email."\n"."Sender's phone: ".$phone."\n"."Service interested in: ".$site_name."\n"."Sender's message: ".$message."\n \n"."End of email.";

    if(!$mail->send())  {
      echo 'There was an error in sending the email. Really sorry for that. Please try again after some time.';
    }  else  {
      echo "<h2>Your message has been sent. Thank you for contacting us.</h2><h2>We will get back to you as soon as possible.</h2>";
    }

  }

}


?>
