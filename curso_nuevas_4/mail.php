<?php
$mail    = $_POST['mai'];
$subject = $_POST['asu'];
$message = $_POST['com'];
$nombre = $_POST['nom'];


// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers.= 'To: '.$mail. "\r\n";
$headers.= 'From:  '.$nombre.'<'.$mail.'>' . "\r\n";

//mail($mail, $subject, $message, $headers);

if( mail($mail, $subject, $message, $headers) ){
	
	echo "1";
}else{
	echo "0";
}
?>

