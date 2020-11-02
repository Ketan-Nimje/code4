<?php

namespace App\Controllers;

use App\Models\Data_model;

class Instawebhook extends BaseController {

    public function __construct() {
        $db = db_connect();
        $this->Data_model = new Data_model($db);
        helper("custome");
    }

    public function facebookhook() {
//        $challenge = $_GET['hub_challenge'];
        $verify_token = $_GET['hub_verify_token'];
        if ($verify_token === '922067108240158|R0hFv3MUcZEKE26sHwFIyjPodXw') {
            echo $challenge;
        }

        $response_data = file_get_contents('php://input');
        log_message('custom', "webhookapp:-" . json_encode($response_data));
    }

}
