<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Authapi extends REST_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function access_post() {

        $shop = ($this->post("shop")) ?? $this->post("shop");

        $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], array('id', 'shop'));
        if (!empty($existdata)) {

            $permission_url = $this->auth($shop);
            $this->response([
                'status' => true,
                'data' => ['shop' => $shop, "install_url" => $permission_url],
                    ], REST_Controller::HTTP_OK);
        } else {
            if ($shop != "" && $shop != null) {
                $permission_url = $this->auth($shop);
                $this->response([
                    'status' => true,
                    'data' => ['shop' => $shop, "install_url" => $permission_url],
                        ], REST_Controller::HTTP_OK);
            } else {
                $this->response([
                    'status' => FALSE,
                    'message' => "Shop is not available",
                        ], REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }

    public function auth($shop) {

        $data = array(
            'API_KEY' => $this->config->item('shopify_api_key'),
            'API_SECRET' => $this->config->item('shopify_secret'),
            'SHOP_DOMAIN' => $shop,
            'ACCESS_TOKEN' => ''
        );

        $this->load->library('Shopify', $data); //load shopify library and pass values in constructor

        $scopes = array('read_products', 'read_script_tags', 'write_script_tags'); //what app can do

        if ($_SERVER['HTTP_ORIGIN'] == 'http://localhost:3000') {
            $redirect_url = "http://localhost:3000/callback"; //redirect url specified in app setting at shopify
        } else {
//            $redirect_url = $this->config->item('redirect_url'); //redirect url specified in app setting at shopify
            $redirect_url = base_url('authshop'); //redirect url specified in app setting at shopify
        }

        $paramsforInstallURL = array(
            'scopes' => $scopes,
            'redirect' => $redirect_url
        );


        return $this->shopify->installURL($paramsforInstallURL);
    }

    public function activateplain_post() {
        $shop = $this->post('shop');
        $shop_id = $this->post('shop_id');
        $charge_id = $this->post('charge_id');


        if (!empty($charge_id) && !empty($shop) && !empty($shop_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop'));
            if (!empty($shopdata)) {
//                echo $this->db->last_query();
//                die;

                $data = array(
                    'API_KEY' => $this->config->item('shopify_api_key'),
                    'API_SECRET' => $this->config->item('shopify_secret'),
                    'SHOP_DOMAIN' => $shop,
                    'ACCESS_TOKEN' => ''
                );

                $this->load->library('Shopify', $data);

                $data = array(
                    'API_KEY' => $this->config->item('shopify_api_key'),
                    'API_SECRET' => $this->config->item('shopify_secret'),
                    'SHOP_DOMAIN' => $shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );

                $this->shopify->setup($data);

                $chargdata = $this->Data_model->Get_data_one(APPLICATION_CHARGE, ['shop' => $shop, 'shop_id' => $shop_id, "charge_id" => $charge_id]);
                $url_params = $chargdata['url_params'];
                if (!empty($chargdata)) {

                    unset($chargdata['url_params']);
                    unset($chargdata['shop_id']);
                    unset($chargdata['shop']);
                    unset($chargdata['charge_id']);
                    unset($chargdata['charge_id']);
                    unset($chargdata['recurring_application_charges_id']);

                    $chargdata['id'] = $charge_id;
                    $chargdata['status'] = "accepted";
                    $chargdata['test'] = "true";
                    $chargdata['billing_on'] = date('Y-m-d');

                    $postdata['recurring_application_charge'] = $chargdata;


                    $senddata = [
                        'METHOD' => 'POST',
                        'URL' => "/admin/api/2020-04/recurring_application_charges/$charge_id/activate.json",
                        'HEADERS' => array(),
                        'DATA' => $postdata,
                        'FAILONERROR' => TRUE,
                        'RETURNARRAY' => TRUE,
                        'ALLDATA' => FALSE
                    ];

                    $resultdata = $this->shopify->call($senddata);

                    if (isset($resultdata['recurring_application_charge'])) {
                        unset($resultdata['recurring_application_charge']['id']);

                        $this->Data_model->Update_data(APPLICATION_CHARGE, ['shop' => $shop, 'shop_id' => $shop_id, 'charge_id' => $charge_id], $resultdata['recurring_application_charge']);

                        $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $shop, 'id' => $shop_id], ['paid_plain' => "1", 'charge_id' => $charge_id, 'activate_date' => date('Y-m-d')]);

                        $this->response([
                            'status' => TRUE,
                            'url_params' => $url_params
                                ], REST_Controller::HTTP_OK);
                    } else {
                        $this->response([
                            'status' => FALSE,
                            'message' => "Something went wrong",
                                ], REST_Controller::HTTP_BAD_REQUEST);
                    }
                } else {
                    $this->response([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], REST_Controller::HTTP_BAD_REQUEST);
                }
            } else {
                $this->response([
                    'status' => FALSE,
                    'message' => "shop details is invalid",
                        ], REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $this->response([
                'status' => FALSE,
                'message' => "Someting went wrong",
                    ], REST_Controller::HTTP_BAD_REQUEST);
        }
    }

}
