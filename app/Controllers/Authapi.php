<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\Data_model;
use App\Libraries\Shopify;

class Authapi extends ResourceController {

    const HTTP_BAD_REQUEST = 400;
    const HTTP_OK = 200;

    protected $format = 'json';
    protected $request;
    private $Data_model;
    private $config;

    use ResponseTrait;

    public function __construct() {

        $this->request = \CodeIgniter\Config\Services::request();
        $db = db_connect();

        $this->Data_model = new Data_model($db);
        $this->config = config('Customeconf');
    }

    public function access() {

        $shop = ($this->request->getVar("shop")) ?? $this->request->getVar("shop");

        $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], array('id', 'shop'));
        if (!empty($existdata)) {

            $permission_url = $this->auth($shop);

            return $this->respond([
                        'status' => true,
                        'data' => ['shop' => $shop, "install_url" => $permission_url],
                            ], Authapi::HTTP_OK);
        } else {
            if ($shop != "" && $shop != null) {
                $permission_url = $this->auth($shop);
                return $this->respond([
                            'status' => true,
                            'data' => ['shop' => $shop, "install_url" => $permission_url],
                                ], Authapi::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop is not available",
                                ], Authapi::HTTP_BAD_REQUEST);
            }
        }
    }

    public function auth($shop) {

        $data = array(
            'API_KEY' => $this->config->shopify_api_key,
            'API_SECRET' => $this->config->shopify_secret,
            'SHOP_DOMAIN' => $shop,
            'ACCESS_TOKEN' => ''
        );



        $this->shopify = new Shopify($data);

        //load shopify library and pass values in constructor

        $scopes = array('read_products', 'read_script_tags', 'write_script_tags'); //what app can do

        if (!empty($this->request->getServer('HTTP_ORIGIN')) && $this->request->getServer('HTTP_ORIGIN') == 'http://localhost:3000') {
            $redirect_url = "http://localhost:3000/approve-thfeed-admin/callback"; //redirect url specified in app setting at shopify
        } else {
            $redirect_url = base_url('authshop'); //redirect url specified in app setting at shopify
        }


        $paramsforInstallURL = array(
            'scopes' => $scopes,
            'redirect' => $redirect_url
        );


        return $this->shopify->installURL($paramsforInstallURL);
    }

    public function activateplain() {
        $shop = $this->request->getVar('shop');
        $shop_id = $this->request->getVar('shop_id');
        $charge_id = $this->request->getVar('charge_id');


        if (!empty($charge_id) && !empty($shop) && !empty($shop_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop'));
            if (!empty($shopdata)) {

                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $shop,
                    'ACCESS_TOKEN' => ''
                );

                $this->load->library('Shopify', $data);

                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
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

                        return $this->respond([
                                    'status' => TRUE,
                                    'url_params' => $url_params
                                        ], Authapi::HTTP_OK);
                    } else {
                        return $this->respond([
                                    'status' => FALSE,
                                    'message' => "Something went wrong",
                                        ], Authapi::HTTP_BAD_REQUEST);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something went wrong",
                                    ], Authapi::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "shop details is invalid",
                                ], Authapi::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Someting went wrong",
                            ], Authapi::HTTP_BAD_REQUEST);
        }
    }

}
