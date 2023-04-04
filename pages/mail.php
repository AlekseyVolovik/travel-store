<?php
require '../assets/libs/phpmailer/Exception.php';
require '../assets/libs/phpmailer/PHPMailer.php';
require '../assets/libs/phpmailer/SMTP.php';

$c = true;

$title = 'Заголовок письма';


$name = $_POST['name'];
$phone = $_POST['phone'];

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();                                            
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true; 
    $mail->Host       = 'smtp.gmail.com';                                          
    $mail->Username   = 'travelstoreby1@gmail.com';  //буферная почта для smtp              
    $mail->Password   = 'vgqisywopfsbcndb';     
    $mail->SMTPSecure = 'ssl';                                   
    $mail->Port       = 465;                                   
    
    $mail->setFrom('travelstoreby1@gmail.com', 'Заявка с Вашего сайта Travel-Store.by');  
    $mail->addAddress('travelstoreby@gmail.com');       
    
    $mail->isHTML(true);                                  
    $mail->Subject = $title;
    $mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone;
    $mail->send();
} catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}