<?php

class Welcome extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
        header("Access-Control-Allow-Credentials: true");
    }

    public function index() {
        $this->load->view('Welcome');
    }

}

/* End of file filename.php */
