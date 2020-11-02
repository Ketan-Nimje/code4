<?php

namespace App\Controllers;

use App\Libraries\Shopify;
use App\Models\Data_model;

class Callback extends BaseController {

    private $data;
    private $shopify;
    private $Data_model;
    private $config;

    public function __construct() {
        $db = db_connect();
        $this->data = $_SERVER['QUERY_STRING'];
        $this->Data_model = new Data_model($db);
        $this->config = config('Customeconf');
        helper('custome');
    }

    public function index() {
        view('demo');
    }

    public function payment() {

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
                    'ACCESS_TOKEN' => $shopdata['token']
                );

                $this->shopify = new Shopify($data);

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
                        return redirect()->to('https://' . $shop . '/admin/apps/' . $this->config->shopify_api_key);
                    } else {
                        show_404();
                    }
                } else {
                    show_404();
                }
            } else {
                show_404();
            }
        } else {
            show_404();
        }
    }

    public function shopcallback() {
        $code = $this->request->getVar('code');
        $shop = $this->request->getVar('shop');
        $hmac = $this->request->getVar('hmac');
        $timestamp = $this->request->getVar('timestamp');

        if (isset($code) && !empty($code)) {

            $data = array(
                'API_KEY' => $this->config->shopify_api_key,
                'API_SECRET' => $this->config->shopify_secret,
                'SHOP_DOMAIN' => $shop,
                'ACCESS_TOKEN' => ''
            );

            $this->shopify = new Shopify($data);


            $accessToken = $this->shopify->getAccessToken($code);

            if ($accessToken) {

                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
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
                    'money_format' => preg_replace('/\{{.*?\}}/U', "{{amount}}", strip_tags($resultdata['shop']['money_format'])),
                    'money_with_currency_format' => preg_replace('/\{{.*?\}}/U', "{{amount}}", strip_tags($resultdata['shop']['money_with_currency_format'])),
                    'timezone' => $resultdata['shop']['timezone'],
                    'token' => $accessToken,
                    'status' => 'trial',
                    'is_install' => '1',
                    'update_date' => date('Y-m-d'),
                    'create_date' => date('Y-m-d'),
                    'is_social_login' => '0',
                    'paid_plain' => '0',
                    'login_with' => '',
                    'key' => '',
                ];


                $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], array('id', 'shop'));
                if (!empty($existdata)) {
                    unset($shopdata['is_social_login']);
                    unset($shopdata['login_with']);
                    unset($shopdata['paid_plain']);
                    unset($shopdata['key']);
                    $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $shop, 'id' => $existdata['id']], $shopdata);
                    $shop_id = $existdata['id'];
                } else {
                    $shop_id = $this->Data_model->Insert_data_id(SHOP_SETTINGS, $shopdata);
                }

                $html = '<html>
                            <head>
                                <title>InstaPlus</title>
                            </head>
                            <body>
                                <p style=""><b style="">Dear Instaplus user,</b></p>
                                <p style="">We are glad that you found what you were looking for. Our purpose for developing this application is to make more and more sales for your business.</p>
                                <p style="">We request you to give feedback for our application by replying this email and looking forward to having more successful years together.</p>
                                <p style="">Mail us at <a data-is-link="mailto:support@thimatic.com" class="textEditor-link" href="mailto:support@thimatic.com" rel="noreferrer nofollow" target="_blank" style="background-color: rgb(255, 255, 255);">support@thimatic.com</a> if you find any difficulty to set up this application.</p>
                                <p style="">Our team is always ready to help you with the installation of our application &amp; getting started with it.</p>
                                <p style="">Also, find out our another application "Bundle Products" <span style="background-color: rgb(255, 255, 255);"><span style="background-color: rgb(255, 255, 255);"><a href="https://apps.shopify.com/bundle-products-by-thimatic" style="background-color: rgb(255, 255, 255);">https://apps.shopify.com/bundle-products-by-thimatic</a></span>    <a data-is-link="https://apps.shopify.com/bundle-products-by-thimatic" class="textEditor-link" href="https://apps.shopify.com/bundle-products-by-thimatic" rel="noreferrer nofollow" target="_blank" style="text-decoration-line: line-through;"></a></span></p>
                                <p style="">The perfect product review free app to display product reviews along with customer image and multiple review Images.</p>
                                <p style="padding-top: 15px; margin-bottom: 0;"><span style=""><b style="">Many Thanks</b><b style="">,</b></span><br><b>Instaplus App Team</b></p>
                            </body>
                        </html>';

                $mail = sendMail(SUPPORT_MAIL, $resultdata['shop']['email'], "Welcome to Instaplus App!", $html);


                $shop_update = array("webhook" => array("topic" => "app/uninstalled", "address" => base_url('uninstall') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "shop/update", "address" => base_url('shopupdate') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);

                $shop_update = array("webhook" => array("topic" => "products/update", "address" => base_url('productupdate') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "products/delete", "address" => base_url('deletproduct') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);

                $test_log = "\n---------Shop_id------------\n" . $shop_id;
                log_message('custom', "result:-" . $test_log);

                $existscript = $this->Data_model->Get_data_one_column(SHOP_SCRIPT_TAG, ['shop' => $shop, 'shop_id' => $shop_id], array('shop', 'shop_id'));
                if (empty($existscript)) {

                    $spostdata["script_tag"] = [
                        "event" => "onload",
                        "src" => base_url("assets/gallaryfeed.js")
                    ];

                    $senddata = [
                        'METHOD' => 'POST',
                        'URL' => '/admin/api/2020-04/script_tags.json',
                        'HEADERS' => array(),
                        'DATA' => $spostdata,
                        'FAILONERROR' => TRUE,
                        'RETURNARRAY' => TRUE,
                        'ALLDATA' => FALSE
                    ];

                    $scriptdata = $this->shopify->call($senddata);

                    $test_log = "\n---------Script------------\n" . "/admin/api/2020-04/script_tags.json \n---------script save response------------\n" . json_encode($scriptdata);
                    log_message('custom', "result:-" . $test_log);

                    if (!empty($scriptdata['script_tag'])) {
                        $this->Data_model->Insert_data(SHOP_SCRIPT_TAG, ['shop' => $shop, 'shop_id' => $shop_id, 'id' => $scriptdata['script_tag']['id'], 'event' => $scriptdata['script_tag']['event'], 'src' => $scriptdata['script_tag']['src'], 'create_date' => date('Y-m-d')]);
                    }
                }


                $layoutdata = $this->Data_model->Get_data_one(INSTA_LAYOUT, ['status' => '1', 'is_default' => '1']);


                $embededdata = $this->Data_model->Get_data_one_column(EMBDED_CODE, ['shop' => $shop, 'shop_id' => $shop_id], array('shop', 'shop_id'));
                if (empty($embededdata)) {

                    $embdedcode = $this->checkcode($shop, $shop_id);

                    $embdedid = $this->Data_model->Insert_data_id(EMBDED_CODE, ['shop' => $shop, 'shop_id' => $shop_id, "uniq_id" => $embdedcode, "title" => "Embedded Code 1", 'create_date' => date('Y-m-d')]);

                    $gallarydata = [
                        'shop' => $shop,
                        'shop_id' => $shop_id,
                        EMBDED_CODE . '_id' => $embdedid,
                        "uniq_id" => $embdedcode,
                        'create_date' => date('Y-m-d'),
                        'insta_layout_id' => $layoutdata['insta_layout_id'],
                        'no_of_column' => $layoutdata['no_of_column'],
                        'no_of_rows' => $layoutdata['no_of_rows'],
                        'mobile_no_of_column' => $layoutdata['mobile_no_of_column'],
                        'mobile_no_of_rows' => $layoutdata['mobile_no_of_rows'],
                        'ul_class' => $layoutdata['class'],
                        'mobile_ul_class' => $layoutdata['mobile_class'],
                        'layout_icon' => $layoutdata['image'],
                        'layout_type' => $layoutdata['pro']
                    ];
                    $this->Data_model->Insert_data(GALLARY_SETTINGS, $gallarydata);
                }


                $productdata = $this->Data_model->Get_data_one_column(PRODUCT_GALLARY, ['shop' => $shop, 'shop_id' => $shop_id], ['shop_id', 'shop']);
                if (empty($productdata)) {
                    $productdata = [
                        'shop' => $shop,
                        'embed_heading' => '#showyourstyle ',
                        'shop_id' => $shop_id,
                        'create_date' => date('Y-m-d'),
                        'insta_layout_id' => $layoutdata['insta_layout_id'],
                        'no_of_column' => $layoutdata['no_of_column'],
                        'no_of_rows' => $layoutdata['no_of_rows'],
                        'mobile_no_of_column' => $layoutdata['mobile_no_of_column'],
                        'mobile_no_of_rows' => $layoutdata['mobile_no_of_rows'],
                        'ul_class' => $layoutdata['class'],
                        'mobile_ul_class' => $layoutdata['mobile_class'],
                        'layout_icon' => $layoutdata['image'],
                        'layout_type' => $layoutdata['pro']
                    ];

                    $this->Data_model->Insert_data(PRODUCT_GALLARY, $productdata);
                }

                return redirect()->to('https://' . $shop . '/admin/apps/' . $this->config->shopify_api_key);
            } else {
                show_404();
            }
        } else {
            show_404();
        }
    }

    public function scriptagupdate() {

        $sdata = $this->Data_model->Get_data_all_columns(SHOP_SETTINGS, ['is_install' => '1'], array('id', 'shop', 'paid_plain', 'is_social_login', 'login_with', 'token'));

        if (!empty($sdata)) {

            foreach ($sdata as $sd) {
                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $sd['shop'],
                    'ACCESS_TOKEN' => $sd['token']
                );

                $this->shopify = new Shopify($data);

                $existscript = $this->Data_model->Get_data_one_column(SHOP_SCRIPT_TAG, ['shop' => $sd['shop'], 'shop_id' => $sd['id']], array('create_shop_screpttag_id', 'id', 'shop', 'shop_id'));


                $spostdata["script_tag"] = [
                    "event" => "onload",
                    "src" => base_url("assets/gallaryfeed.js")
                ];

                $senddata = [
                    'METHOD' => 'POST',
                    'URL' => '/admin/api/2020-04/script_tags.json',
                    'HEADERS' => array(),
                    'DATA' => $spostdata,
                    'FAILONERROR' => TRUE,
                    'RETURNARRAY' => TRUE,
                    'ALLDATA' => FALSE
                ];
                if (empty($existscript)) {
                    $scriptdata = $this->shopify->call($senddata);

                    $this->Data_model->Insert_data(SHOP_SCRIPT_TAG, ['shop' => $sd['shop'], 'shop_id' => $sd['id'], 'id' => $scriptdata['script_tag']['id'], 'event' => $scriptdata['script_tag']['event'], 'src' => $scriptdata['script_tag']['src'], 'create_date' => date('Y-m-d')]);
                } else {

                    $list = [
                        'METHOD' => 'GET',
                        'URL' => '/admin/api/2020-10/script_tags.json',
                        'HEADERS' => array(),
                        'DATA' => array(),
                        'FAILONERROR' => TRUE,
                        'RETURNARRAY' => TRUE,
                        'ALLDATA' => FALSE
                    ];

                    $list = $this->shopify->call($list);

                    foreach ($list['script_tags'] as $l) {


                        $deletedata = [
                            'METHOD' => 'DELETE',
                            'URL' => '/admin/api/2020-07/script_tags/' . $l['id'] . '.json',
                            'HEADERS' => array(),
                            'DATA' => array(),
                            'FAILONERROR' => TRUE,
                            'RETURNARRAY' => TRUE,
                            'ALLDATA' => FALSE
                        ];

                        $delete = $this->shopify->call($deletedata);
                    }

                    $scriptdata = $this->shopify->call($senddata);
                    $this->Data_model->Update_data(SHOP_SCRIPT_TAG, ['create_shop_screpttag_id' => $existscript['create_shop_screpttag_id']], ['shop' => $sd['shop'], 'shop_id' => $sd['id'], 'id' => $scriptdata['script_tag']['id'], 'event' => $scriptdata['script_tag']['event'], 'src' => $scriptdata['script_tag']['src'], 'create_date' => date('Y-m-d')]);
                }
            }
            echo json_encode(array("success" => true));
        }
    }

    private function create_webhook($shop, $oauth_token, $webhook) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "X-Shopify-Access-Token: " . $oauth_token
        ));

        curl_setopt($ch, CURLOPT_URL, "https://" . $shop . "/admin/webhooks.json");
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($webhook));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    private function checkcode($shop, $shop_id) {
        $embdedcode = substr(mt_rand(), 0, 6) . $shop_id;

        $embededdata = $this->Data_model->Get_data_one_column(EMBDED_CODE, ['shop' => $shop, 'shop_id' => $shop_id, 'uniq_id' => $embdedcode], array('uniq_id', 'shop_id', 'shop'));
        if (!empty($embededdata)) {
            $this->checkcode($shop, $shop_id);
        } else {
            return $embdedcode;
        }
    }

}
