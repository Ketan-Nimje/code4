<?php

function sendMail($from_email, $to_email, $subject, $body) {

    $email = \Config\Services::email();

    $config['protocol'] = "smtp";
    $config['SMTPHost'] = "smtp-relay.sendinblue.com";
    $config['SMTPPort'] = 587;
    $config['SMTPUser'] = "support@thimatic.com";
    $config['SMTPPass'] = "F2K3qW6aTUNAbD7d";
    $config['charset'] = "utf-8";
    $config['mailtype'] = "html";
    $config['newline'] = "\r\n";

    $email->initialize($config);



    $email->setFrom($from_email, 'Instaplus Spport');
    $email->setTo($to_email);

    $email->setSubject($subject);
    $email->setMessage($body);



    if ($email->send()) {
        return TRUE;
    } else {
        return FALSE;
    }

    //Send mail
}
