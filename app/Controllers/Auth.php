<?php

namespace App\Controllers;

use App\Models\Data_model;

class Auth extends BaseController {

    protected $Data_model;

    public function __construct() {
        $db = db_connect();
        $this->Data_model = new Data_model($db);
    }

    public function access() {

        $shop = $this->request->getVar('shop');
        $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop]);
        if (!empty($existdata)) {

//            $array_items = ['access_token', 'shope_id', 'shop'];
//            $this->session->unset_userdata($array_items);
//            $data = ['shop' => $shop, 'access_token' => $existdata['token'], 'shope_id' => $existdata['id']];
//            $this->session->set_userdata($data);

            $this->load->view('dashboard');
        } elseif ($this->session->userdata('shop') != $shop) {
            $this->auth($shop);
        } else {
            if ($shop != "" && $shop != null) {
                $this->auth($shop);
            } else {
                redirect(base_url('Welcome'));
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
        $scopes = array('read_content', 'write_content', 'read_themes', 'write_themes', 'read_products', 'write_products', 'read_draft_orders', 'write_draft_orders', 'read_orders', 'write_orders', 'write_script_tags', 'read_script_tags'); //what app can do
        $redirect_url = base_url($this->config->item('redirect_url')); //redirect url specified in app setting at shopify

        $paramsforInstallURL = array(
            'scopes' => $scopes,
            'redirect' => $redirect_url
        );

        $permission_url = $this->shopify->installURL($paramsforInstallURL);

        $this->load->view('auth/escapeIframe', ['installUrl' => $permission_url]);
    }

    public function authCallback() {
        $code = $this->request->getVar('code');
        $shop = $this->request->getVar('shop');
        $hmac = $this->request->getVar('hmac');
        $timestamp = $this->request->getVar('timestamp');

        if (isset($code)) {
            $data = array(
                'API_KEY' => $this->config->item('shopify_api_key'),
                'API_SECRET' => $this->config->item('shopify_secret'),
                'SHOP_DOMAIN' => $shop,
                'ACCESS_TOKEN' => ''
            );
            $this->load->library('Shopify', $data); //load shopify library and pass values in constructor
        }

        $accessToken = $this->shopify->getAccessToken($code);


        $data = array(
            'API_KEY' => $this->config->item('shopify_api_key'),
            'API_SECRET' => $this->config->item('shopify_secret'),
            'SHOP_DOMAIN' => $shop,
            'ACCESS_TOKEN' => $accessToken
        );
        $this->shopify->setup($data);

        $senddata = [
            'METHOD' => 'GET',
            'URL' => '/admin/shop.json/?adminNext=1',
            'HEADERS' => array(),
            'DATA' => array(),
            'FAILONERROR' => TRUE,
            'RETURNARRAY' => TRUE,
            'ALLDATA' => FALSE
        ];

        $resultdata = $this->shopify->call($senddata);

        $shopdata = [
            'shopify_id' => $resultdata['shop']['id'],
            'store_hmac' => $hmac,
            'shop' => $shop,
            'domain' => $resultdata['shop']['domain'],
            'myshopify_domain' => $resultdata['shop']['myshopify_domain'],
            'username' => $resultdata['shop']['name'],
            'store_email' => $resultdata['shop']['email'],
            'shop_owner' => $resultdata['shop']['shop_owner'],
            'country_name' => $resultdata['shop']['country_name'],
            'currency' => $resultdata['shop']['currency'],
            'timezone' => $resultdata['shop']['timezone'],
            'token' => $accessToken,
            'status' => 'trial',
            'is_install' => '1',
            'update_date' => $resultdata['shop']['id'],
            'create_date' => date('Y-m-d'),
        ];


        $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop]);
        if (!empty($existdata)) {
            $shop_id = $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $shop], $shopdata);
            $this->session->set_userdata(['shop' => $shop, 'access_token' => $accessToken, 'shope_id' => $shop_id]);
        } else {

            $shop_id = $this->Data_model->Insert_data_id(SHOP_SETTINGS, $shopdata);
            $this->Data_model->Insert_data(STORE_SETTINGS, ['cv_shope_id' => $shop_id]);
            $this->Data_model->Insert_data(LANGUAGES, ['cv_shope_id' => $shop_id]);

            $this->session->set_userdata(['shop' => $shop, 'access_token' => $accessToken, 'shope_id' => $shop_id]);
            $this->get_data();
        }


        redirect(base_url('Dashboard'));
    }

}
