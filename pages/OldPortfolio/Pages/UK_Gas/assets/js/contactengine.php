<?php
$Name = Trim(stripslashes($_POST['name'])); 
$Email = Trim(stripslashes($_POST['email'])); 
$Phone = Trim(stripslashes($_POST['phone'])); 
$Subject = Trim(stripslashes($_POST['subject'])); 
$Message = Trim(stripslashes($_POST['message'])); 


if (empty($Name) || empty($Email)){

}
    
else
{
$Body = "";
$Body .= "<strong>Name:</strong> ";
$Body .= $Name;
$Body .= "<br><br>";
$Body .= "<strong>Email:</strong> ";
$Body .= $Email;
$Body .= "<br><br>";
$Body .= "<strong>Subject:</strong> ";
$Body .= $Subject;
$Body .= "<br><br>";
$Body .= "<strong>Phone Number:</strong> ";
$Body .= $Phone;
$Body .= "<br><br>";
$Body .= "<strong>Message:</strong><br><br> ";
$Body .= $Message;
$Body .= "<br><br>";

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'server400.sunyhost.com';

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 465;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "info@ukgas-serve.co.uk";

//Password to use for SMTP authentication
$mail->Password = ".fG#EjgTtPc#";

//Set who the message is to be sent from

$mail->SetFrom($Email, $Name);

//Set an alternative reply-to address
$mail->addReplyTo($Email, $Name);

//Set who the message is to be sent to
 
 
 $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
 
 $mail->addAddress('alaaip20@gmail.com', 'UK Gas serve contact form');
$mail->Subject = 'UK Gas serve contact form';
$mail->IsHTML(true);
$mail->Body= $Body;
$mail->CharSet = "text/html; charset=UTF-8;";
$mail->AltBody = $Body;




//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
}
?>