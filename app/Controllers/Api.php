<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\Data_model;
use CodeIgniter\HTTP\RequestInterface;
use DateInterval;
use DateTime;
use DateTimeZone;
use IntlCalendar;
use IntlDateFormatter;
use Locale;
use App\Libraries\Shopify;

class Api extends ResourceController {

    const HTTP_CONTINUE = 100;
    const HTTP_SWITCHING_PROTOCOLS = 101;
    const HTTP_PROCESSING = 102;            // RFC2518
// Success
    /**
     * The request has succeeded
     */
    const HTTP_OK = 200;

    /**
     * The server successfully created a new resource
     */
    const HTTP_CREATED = 201;
    const HTTP_ACCEPTED = 202;
    const HTTP_NON_AUTHORITATIVE_INFORMATION = 203;

    /**
     * The server successfully processed the request, though no content is returned
     */
    const HTTP_NO_CONTENT = 204;
    const HTTP_RESET_CONTENT = 205;
    const HTTP_PARTIAL_CONTENT = 206;
    const HTTP_MULTI_STATUS = 207;          // RFC4918
    const HTTP_ALREADY_REPORTED = 208;      // RFC5842
    const HTTP_IM_USED = 226;               // RFC3229
// Redirection
    const HTTP_MULTIPLE_CHOICES = 300;
    const HTTP_MOVED_PERMANENTLY = 301;
    const HTTP_FOUND = 302;
    const HTTP_SEE_OTHER = 303;

    /**
     * The resource has not been modified since the last request
     */
    const HTTP_NOT_MODIFIED = 304;
    const HTTP_USE_PROXY = 305;
    const HTTP_RESERVED = 306;
    const HTTP_TEMPORARY_REDIRECT = 307;
    const HTTP_PERMANENTLY_REDIRECT = 308;  // RFC7238
// Client Error
    /**
     * The request cannot be fulfilled due to multiple errors
     */
    const HTTP_BAD_REQUEST = 400;

    /**
     * The user is unauthorized to access the requested resource
     */
    const HTTP_UNAUTHORIZED = 401;
    const HTTP_PAYMENT_REQUIRED = 402;

    /**
     * The requested resource is unavailable at this present time
     */
    const HTTP_FORBIDDEN = 403;

    /**
     * The requested resource could not be found
     *
     * Note: This is sometimes used to mask if there was an UNAUTHORIZED (401) or
     * FORBIDDEN (403) error, for security reasons
     */
    const HTTP_NOT_FOUND = 404;

    /**
     * The request method is not supported by the following resource
     */
    const HTTP_METHOD_NOT_ALLOWED = 405;

    /**
     * The request was not acceptable
     */
    const HTTP_NOT_ACCEPTABLE = 406;
    const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
    const HTTP_REQUEST_TIMEOUT = 408;

    /**
     * The request could not be completed due to a conflict with the current state
     * of the resource
     */
    const HTTP_CONFLICT = 409;
    const HTTP_GONE = 410;
    const HTTP_LENGTH_REQUIRED = 411;
    const HTTP_PRECONDITION_FAILED = 412;
    const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
    const HTTP_REQUEST_URI_TOO_LONG = 414;
    const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
    const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
    const HTTP_EXPECTATION_FAILED = 417;
    const HTTP_I_AM_A_TEAPOT = 418;                                               // RFC2324
    const HTTP_UNPROCESSABLE_ENTITY = 422;                                        // RFC4918
    const HTTP_LOCKED = 423;                                                      // RFC4918
    const HTTP_FAILED_DEPENDENCY = 424;                                           // RFC4918
    const HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425;   // RFC2817
    const HTTP_UPGRADE_REQUIRED = 426;                                            // RFC2817
    const HTTP_PRECONDITION_REQUIRED = 428;                                       // RFC6585
    const HTTP_TOO_MANY_REQUESTS = 429;                                           // RFC6585
    const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;                             // RFC6585
// Server Error
    /**
     * The server encountered an unexpected error
     *
     * Note: This is a generic error message when no specific message
     * is suitable
     */
    const HTTP_INTERNAL_SERVER_ERROR = 500;

    /**
     * The server does not recognise the request method
     */
    const HTTP_NOT_IMPLEMENTED = 501;
    const HTTP_BAD_GATEWAY = 502;
    const HTTP_SERVICE_UNAVAILABLE = 503;
    const HTTP_GATEWAY_TIMEOUT = 504;
    const HTTP_VERSION_NOT_SUPPORTED = 505;
    const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;                        // RFC2295
    const HTTP_INSUFFICIENT_STORAGE = 507;                                        // RFC4918
    const HTTP_LOOP_DETECTED = 508;                                               // RFC5842
    const HTTP_NOT_EXTENDED = 510;                                                // RFC2774
    const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;

    private $shop;
    protected $format = 'json';
    private $Data_model;
    private $config;
    private $shopify;

    use ResponseTrait;

    protected $request;

    public function __construct() {

        defined('WORK_ON') OR define('WORK_ON', "LOCAL");

        $db = db_connect();

        $this->request = \CodeIgniter\Config\Services::request();

        $urldata = $this->request->getVar('url_params');

        $this->config = config('Customeconf');

        $this->Data_model = new Data_model($db);


        if (!$this->hmac_validate($urldata)) {
            echo json_encode([
                'status' => FALSE,
                'message' => "Request is not valide",
            ]);
            exit();
        } else {
            $this->shop = $urldata['shop'];
        }
    }

    private function email_val($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public function loginuser() {


        $email = ($this->request->getVar("email")) ?? $this->request->getVar("email");
        $password = ($this->request->getVar("password")) ?? $this->request->getVar("password");
        if (!empty($this->shop) && !empty($email) && !empty($password)) {
            $email = $this->email_val($email);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Invalid Email.",
                                ], Api::HTTP_BAD_REQUEST);
            } else {
                $userlogindata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $this->shop, 'login' => $email, 'password' => md5($password), 'is_install' => '1']);

                if (!empty($userlogindata)) {
                    $data = ['shop' => $this->shop, 'shope_id' => $userlogindata['id'], 'name' => $userlogindata['shop_owner'], 'email' => $userlogindata['store_email'], 'key' => $this->config->shopify_api_key, 'is_social_login' => $userlogindata['is_social_login'], 'login_with' => $userlogindata['login_with'], 'shop_user' => $userlogindata['shopify_id'], 'shop_key' => $userlogindata['key'], 'isPaidPlan' => (($userlogindata['paid_plain'] == "1") ? TRUE : FALSE)];
                    return $this->respond([
                                'status' => TRUE,
                                'message' => "Login Successfully",
                                'data' => $data
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Email and password does not match.",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong.",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function alreadyinstalled() {


        $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'is_install' => '1'], ['id', 'paid_plain', 'shop_owner', 'store_email', 'is_social_login', 'login_with', 'shopify_id', 'key', 'is_refresh']);

        if (!empty($existdata)) {

            $urldata = $this->request->getVar('url_params');
            if (!empty($urldata['hmac'])) {
                $shopdata = ['store_hmac' => $urldata['hmac']];
                $shop_id = $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], $shopdata);
            }

            $data = ['shop' => $this->shop, 'shope_id' => $existdata['id'], 'isPaidPlan' => (($existdata['paid_plain'] == "1") ? TRUE : FALSE), 'name' => $existdata['shop_owner'], 'email' => $existdata['store_email'], 'key' => $this->config->shopify_api_key, 'is_social_login' => $existdata['is_social_login'], 'login_with' => $existdata['login_with'], 'shop_user' => $existdata['shopify_id'], 'shop_key' => $existdata['key'], 'is_refresh' => $existdata['is_refresh']];

            return $this->respond([
                        'status' => true,
                        'data' => $data,
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "shop is not installed.",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function authCallback() {

        $url_params = $this->request->getVar('url_params');
        extract($url_params);

        if (isset($code) && !empty($code)) {

            $data = array(
                'API_KEY' => $this->config->shopify_api_key,
                'API_SECRET' => $this->config->shopify_secret,
                'SHOP_DOMAIN' => $this->shop,
                'ACCESS_TOKEN' => ''
            );
            $this->shopify = new Shopify($data);


            $accessToken = $this->shopify->getAccessToken($code);

            if ($accessToken) {
                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
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
                    'shop' => $this->shop,
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


                $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop], array('id', 'shop'));
                if (!empty($existdata)) {
                    unset($shopdata['is_social_login']);
                    unset($shopdata['login_with']);
                    unset($shopdata['paid_plain']);
                    unset($shopdata['key']);
                    $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $existdata['id']], $shopdata);
                    $shop_id = $existdata['id'];
                } else {
                    $shop_id = $this->Data_model->Insert_data_id(SHOP_SETTINGS, $shopdata);
                }


                $shop_update = array("webhook" => array("topic" => "app/uninstalled", "address" => base_url('uninstall') . "?shop=" . $this->shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($this->shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "shop/update", "address" => base_url('shopupdate') . "?shop=" . $this->shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($this->shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "products/create", "address" => base_url('product') . "?shop=" . $this->shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($this->shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);



                $shop_update = array("webhook" => array("topic" => "products/update", "address" => base_url('productupdate') . "?shop=" . $this->shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($this->shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "products/delete", "address" => base_url('deletproduct') . "?shop=" . $this->shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($this->shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);
//                $test_log = "\n---------Shop_id------------\n" . $shop_id;
//                log_message('custom', "result:-" . $test_log);



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

//                $test_log = "\n---------Script------------\n" . "/admin/api/2020-04/script_tags.json \n---------script save response------------\n" . json_encode($scriptdata);
                log_message('custom', "result:-" . $test_log);

                if (!empty($scriptdata['script_tag'])) {
                    $this->Data_model->Insert_data(SHOP_SCRIPT_TAG, ['shop' => $this->shop, 'shop_id' => $shop_id, 'id' => $scriptdata['script_tag']['id'], 'event' => $scriptdata['script_tag']['event'], 'src' => $scriptdata['script_tag']['src'], 'create_date' => date('Y-m-d')]);
                }


                $layoutdata = $this->Data_model->Get_data_one(INSTA_LAYOUT, ['status' => '1', 'is_default' => '1']);


                $embededdata = $this->Data_model->Get_data_one_column(EMBDED_CODE, ['shop' => $this->shop, 'shop_id' => $shop_id], array('shop', 'shop_id'));
                if (empty($embededdata)) {

                    $embdedcode = $this->checkcode($this->shop, $shop_id);

                    $embdedid = $this->Data_model->Insert_data_id(EMBDED_CODE, ['shop' => $this->shop, 'shop_id' => $shop_id, "uniq_id" => $embdedcode, "title" => "Embedded Code 1", 'create_date' => date('Y-m-d')]);

                    $gallarydata = [
                        'shop' => $this->shop,
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


                $productdata = $this->Data_model->Get_data_one_column(PRODUCT_GALLARY, ['shop' => $this->shop, 'shop_id' => $shop_id], ['shop_id', 'shop']);
                if (empty($productdata)) {
                    $productdata = [
                        'shop' => $this->shop,
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

                $data = ['shop' => $this->shop, 'shope_id' => $shop_id, 'name' => $shopdata['shop_owner'], 'email' => $shopdata['store_email'], 'key' => $this->config->shopify_api_key, 'is_social_login' => $shopdata['is_social_login'], 'login_with' => $shopdata['login_with'], 'shop_key' => $shopdata['key'], 'isPaidPlan' => FALSE];

                return $this->respond([
                            'status' => true,
                            'data' => $data,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Something went wrong",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function embdedlist() {
        $shop_id = $this->request->getVar('shop_id');

        if (!empty($this->shop) && !empty($shop_id)) {
            $data = $this->Data_model->Custome_query("select  " . EMBDED_CODE . "_id,shop,shop_id,uniq_id,title from " . EMBDED_CODE . " where shop='" . $this->shop . "' and shop_id='" . $shop_id . "'");
            return $this->respond([
                        'status' => true,
                        'data' => $data,
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function addembded() {
        $shop_id = $this->request->getVar('shop_id');

        $title = $this->request->getVar('title');
        $uniq_id = $this->request->getVar('uniq_id');

        if (!empty($this->shop) && !empty($shop_id)) {

            $embededdata = $this->Data_model->Get_data_one_column(EMBDED_CODE, ['shop' => $this->shop, 'shop_id' => $shop_id, 'title' => $title], array('shop', 'shop_id', 'title'));

            if (!empty($uniq_id) && $uniq_id != null) {
                if (!empty($embededdata)) {


                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Already available embded code of this name",
                                    ], Api::HTTP_BAD_REQUEST);
                } else {

                    $this->Data_model->Update_data(EMBDED_CODE, ['shop' => $this->shop, 'shop_id' => $shop_id, 'uniq_id' => $uniq_id], ['title' => $title, 'update_date' => date("Y-m-d H:i:s")]);

                    return $this->respond([
                                'status' => true,
                                    ], Api::HTTP_OK);
                }
            } else {
                if (!empty($embededdata)) {

                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Already available embded code of this name",
                                    ], Api::HTTP_BAD_REQUEST);
                } else {
                    $embdedcode = $this->checkcode($this->shop, $shop_id);

                    $embdedid = $this->Data_model->Insert_data_id(EMBDED_CODE, ['shop' => $this->shop, 'shop_id' => $shop_id, "uniq_id" => $embdedcode, "title" => $title, 'create_date' => date('Y-m-d')]);

                    $layoutdata = $this->Data_model->Get_data_one(INSTA_LAYOUT, ['status' => '1', 'is_default' => '1']);

                    if (!empty($layoutdata)) {
                        $galaraydata = [
                            'insta_layout_id' => $layoutdata['insta_layout_id'],
                            'no_of_column' => $layoutdata['no_of_column'],
                            'no_of_rows' => $layoutdata['no_of_rows'],
                            'mobile_no_of_column' => $layoutdata['mobile_no_of_column'],
                            'mobile_no_of_rows' => $layoutdata['mobile_no_of_rows'],
                            'ul_class' => $layoutdata['class'],
                            'mobile_ul_class' => $layoutdata['mobile_class'],
                            'layout_icon' => $layoutdata['image'],
                            'layout_type' => $layoutdata['pro'],
                            'shop' => $this->shop,
                            'shop_id' => $shop_id,
                            EMBDED_CODE . '_id' => $embdedid,
                            "uniq_id" => $embdedcode,
                            'create_date' => date('Y-m-d')
                        ];
                    }

                    $this->Data_model->Insert_data(GALLARY_SETTINGS, $galaraydata);

                    return $this->respond([
                                'status' => true,
                                'data' => ['shop' => $this->shop, 'shop_id' => $shop_id, 'uniq_id' => $embdedcode, 'title' => $title, EMBDED_CODE . "_id" => $embdedid]
                                    ], Api::HTTP_OK);
                }
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function product() {

        $shop_id = $this->request->getVar('shop_id');
        $productlist = $this->request->getVar('productlist');
        $insta_feed_id = $this->request->getVar('insta_feed_id');



        if (!empty($this->shop) && !empty($shop_id) && !empty($productlist) && !empty($insta_feed_id)) {


            $sdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('id'));
            if (!empty($sdata)) {
                foreach ($productlist as $p) {

                    $pid = explode('/', $p['id']);

                    $productDetails = array(
                        "shop_id" => $shop_id,
                        "shopify_product_id" => end($pid),
                        "shopify_handle_name" => $p['handle'],
                        'product_name' => $p['title'],
                        'product_description' => strip_tags($p['descriptionHtml']),
                        'list_price' => ((isset($p['variants'][0]['compareAtPrice']) && !empty($p['variants'][0]['compareAtPrice'])) ? $p['variants'][0]['compareAtPrice'] : 0),
                        'selling_price' => (isset($p['variants'][0]['price']) ? $p['variants'][0]['price'] : 0),
                        'status' => 'A',
                        'create_date' => date('Y-m-d H:i:s'),
                        'modify_date' => date('Y-m-d H:i:s', strtotime($p['updatedAt'])),
                    );

                    $data = $this->Data_model->Get_data_one_column(PRODUCT, ['shop_id' => $shop_id, 'shopify_product_id' => end($pid)], array(PRODUCT . "_id"));

                    if (empty($data)) {

                        $productDetails['product_image'] = isset($p['variants']['image']['originalSrc']) ? $p['variants']['image']['originalSrc'] : $p['images'];

                        $productInsertId = $this->Data_model->Insert_data_id(PRODUCT, $productDetails);


                        $tagdata = [
                            'shop_id' => $shop_id,
                            INSTA_FEED . '_id' => $insta_feed_id,
                            'product_id' => $productInsertId,
                            'top_position' => "2",
                            'left_position' => "2",
                            'create_date' => date('Y-m-d')
                        ];
                        $this->Data_model->Insert_data(TAG_PRODUCT, $tagdata);
                    } else {

                        $productInsertId = $data[PRODUCT . "_id"];

                        $productDetails['product_image'] = isset($p['variants']['image']['originalSrc']) ? $p['variants']['image']['originalSrc'] : $p['images'];

                        $this->Data_model->Update_data(PRODUCT, ['shop_id' => $shop_id, 'shopify_product_id' => end($pid), PRODUCT . "_id" => $productInsertId], $productDetails);

                        $tagdata = [
                            'shop_id' => $shop_id,
                            INSTA_FEED . '_id' => $insta_feed_id,
                            'product_id' => $data[PRODUCT . "_id"],
                            'top_position' => "2",
                            'left_position' => "2",
                        ];
                        $existdata = $this->Data_model->Get_data_one(TAG_PRODUCT, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'product_id' => $data[PRODUCT . "_id"]]);
                        if (empty($existdata)) {
                            $tagdata['create_date'] = date('Y-m-d');
                            $this->Data_model->Insert_data(TAG_PRODUCT, $tagdata);
                        }
                    }
                }

                $sql = "SELECT count(" . TAG_PRODUCT . ".tag_product_id) as tag_product_count
                            ,tag_product.insta_feed_id 
                            ,JSON_ARRAYAGG(
                                    json_merge( 
                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                        , json_object('product_image', p.product_image)
                                        , json_object('product_title', p.product_name)
                                        , json_object('shopify_id', p.shopify_product_id)
                                    )) AS data
                            from " . TAG_PRODUCT . "  inner join " . PRODUCT . " as p on p.product_id=" . TAG_PRODUCT . ".product_id and p.shop_id=" . TAG_PRODUCT . ".shop_id
                            
                           where " . TAG_PRODUCT . ".insta_feed_id='" . $insta_feed_id . "' and " . TAG_PRODUCT . ".shop_id='" . $shop_id . "' GROUP BY tag_product." . INSTA_FEED . "_id";



                $data = $this->Data_model->Custome_query($sql);
                return $this->respond([
                            'status' => TRUE,
                            'data' => !empty($data) ? $data[0] : [],
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop id is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function getgallary() {

        $shop_id = $this->request->getVar('shop_id');

        $uniq_id = $this->request->getVar('uniq_id');
        $page_no = ($this->request->getVar('page_no')) ? $this->request->getVar('page_no') : 0;

        $whr = '';

        if (!empty($shop_id) && !empty($this->shop) && !empty($uniq_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop], ['id', 'domain']);

            if (!empty($shopdata)) {

                $accdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], ['shop_id']);

                if (!empty($accdata)) {

                    $instadata = $this->Data_model->Get_data_one(GALLARY_SETTINGS, ['shop' => "$this->shop", 'shop_id' => "$shop_id", "uniq_id" => $uniq_id]);

                    if ($instadata['display_type'] == "1") {
                        $limit = $instadata['slider_limit'];
                    } else {
                        $limit = ($instadata['no_of_column'] * $instadata['no_of_rows']);
                    }


                    $offset = ($page_no * $limit);




                    $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,

                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('price',  REPLACE(ss.money_format,'{{amount}}',p.selling_price))
                                                    )
                                            ) 

                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        LEFT JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        LEFT JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $shop_id . "' and ifd.is_visible='1' " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT $offset, $limit";




                    $instadata['data'] = $this->Data_model->Custome_query($sql);
                    $countdata = $this->Data_model->Custome_query("select  insta_feed_id  as total_feed from " . INSTA_FEED . " where 1=1  " . $whr);
                    $instadata['tatal_record'] = count($countdata);

                    $instadata['domain'] = $shopdata['domain'];
                    return $this->respond([
                                'status' => true,
                                'data' => $instadata,
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Please Login with facebook account and select instagram account ",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "shop deatils is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function gettaglist() {

        $shop_id = $this->request->getVar('shop_id');

        $page_no = ($this->request->getVar('page_no')) ? $this->request->getVar('page_no') : 0;
        $limit = $this->request->getVar('limit');
        $is_visible = $this->request->getVar('status');

        $whr = '';

        if (!empty($shop_id) && !empty($this->shop)) {
            if (isset($is_visible)) {
                if (strtoupper($is_visible) != 'ALL') {
                    $whr = " and is_visible='" . $is_visible . "'";
                }
                if (strtoupper($is_visible) == 'UGC') {
                    $whr = " and type='" . strtoupper($is_visible) . "'";
                } else if (strtoupper($is_visible) == 'HASH') {
                    $whr = " and type='" . strtoupper($is_visible) . "'";
                }
            }
            $accdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], ['shop_id']);

            if (!empty($accdata)) {

                $limit = (!empty($limit) ? $limit : 30);

                $offset = ($page_no * $limit);



                $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,

                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('shopify_id', p.shopify_product_id)
                                                        
                                                    )
                                            ) 

                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        LEFT JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        LEFT JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        
                                    where ifd.shop_id='" . $shop_id . "'  " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT $offset, $limit";

                $instadata['data'] = $this->Data_model->Custome_query($sql);
                $countdata = $this->Data_model->Custome_query("select count(insta_feed_id) as total_feed from " . INSTA_FEED . " where 1=1 and shop_id='" . $shop_id . "' " . $whr);
                $instadata['tatal_record'] = isset($countdata[0]['total_feed']) ? $countdata[0]['total_feed'] : 0;


                if (!empty($instadata['data'])) {
                    return $this->respond([
                                'status' => TRUE,
                                'data' => $instadata,
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => TRUE,
                                'data' => $instadata,
                                    ], Api::HTTP_OK);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Please Login with facebook account and select instagram account ",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function gallarysettingdata() {

        $shop_id = $this->request->getVar('shop_id');


        if (!empty($shop_id) && !empty($this->shop)) {

            $data = $this->Data_model->Get_data_one(GALLARY_SETTINGS, ['shop' => "$this->shop", 'shop_id' => "$shop_id"]);

            if (!empty($data)) {
                $data['message'] = "";
                return $this->respond([
                            'status' => true,
                            'data' => $data,
                                ], Api::HTTP_OK);
            } else {

                $data['message'] = "Please Login with facebook account and select instagram account ";
                return $this->respond([
                            'status' => FALSE,
                            'data' => $data,
                                ], Api::HTTP_OK);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function getmediadata() {

        $shop_id = $this->request->getVar('shop_id');

        $uniq_id = $this->request->getVar('uniq_id');

        if (!empty($shop_id) && !empty($this->shop)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop], ['id', 'domain']);

            if (!empty($shopdata)) {
                $sql = "select gs.*, ec.title from " . GALLARY_SETTINGS . " as gs inner join " . EMBDED_CODE . " as ec on ec.embed_code_id = gs.embed_code_id and gs.shop_id = ec.shop_id where gs.shop = '" . $this->shop . "' and gs.shop_id = '" . $shop_id . "' and gs.uniq_id = '" . $uniq_id . "'";
                $data = $this->Data_model->Custome_query($sql);

                $data = !empty($data) ? $data[0] : [];
                if (!empty($data)) {
                    if ($data['display_type'] == "0") {
                        $desklimit = ($data['no_of_rows'] * $data['no_of_column']);
                        $mobilelimit = ($data['mobile_no_of_rows'] * $data['mobile_no_of_column']);
                    } else {
                        $desklimit = $data['slider_limit'];
                    }

                    $whr = '';
                    if ($data['hashtag_is'] == 1) {
                        $whr .= 'and (';
                        $i = 0;
                        foreach (explode(", ", trim($data['hash_tags'])) as $f) {
                            if ($i == 0) {
                                $whr .= "ifd.caption like '%" . trim($f) . "%'";
                            } else {
                                $whr .= " or ifd.caption like '%" . trim($f) . "%'";
                            }
                            $i++;
                        }
                        $whr .= ")";
                    }


                    $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,

                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('price',  REPLACE(ss.money_format,'{{amount}}',p.selling_price))
                                                    )
                                            ) 

                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        LEFT JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        LEFT JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $shop_id . "' and ifd.is_visible='1' " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT ";

                    if ($data['display_type'] == "1") {
                        $data['meadia_data'] = $this->Data_model->Custome_query($sql . $desklimit);
                        $data['mobile_data'] = [];
                    } else {
                        $data['meadia_data'] = $this->Data_model->Custome_query($sql . $desklimit);
                        $data['mobile_data'] = $this->Data_model->Custome_query($sql . $mobilelimit);
                    }

                    $data['domain'] = $shopdata['domain'];
                    $data['message'] = "";
                } else {
                    $data['meadia_data'] = [];
                    $data['message'] = "Please Login with facebook account and select instagram account ";
                }
                return $this->respond([
                            'status' => true,
                            'data' => $data,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "shop deatils is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function gallarysetting() {
        $shop_id = $this->request->getVar('shop_id');

        $uniq_id = $this->request->getVar('uniq_id');

        if (!empty($shop_id) && !empty($this->shop)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop], ['id', 'domain']);

            if (!empty($shopdata)) {
                $postdata = $this->request->getVar();
                unset($postdata['url_params']);
                $this->Data_model->Update_data(GALLARY_SETTINGS, ['shop' => $this->shop, 'uniq_id' => $uniq_id, 'shop_id' => $shop_id, GALLARY_SETTINGS . '_id' => $this->request->getVar(GALLARY_SETTINGS . "_id")], $postdata);

                $data = $this->Data_model->Get_data_one(GALLARY_SETTINGS, ['shop' => "$this->shop", 'shop_id' => "$shop_id", 'uniq_id' => $uniq_id]);
                if (!empty($data)) {

                    if ((!empty($this->request->getVar('no_of_column')) || !empty($this->request->getVar('no_of_rows'))) || (!empty($this->request->getVar('mobile_no_of_column')) || !empty($this->request->getVar('mobile_no_of_rows'))) || ($data['hashtag_is'] == 1) || $this->request->getVar('slider_limit')) {

                        if ($data['display_type'] == "1") {
                            $limit = $data['slider_limit'];
                        } else {
                            $limit = ($data['no_of_rows'] * $data['no_of_column']);
                            $mobilelimit = ($data['mobile_no_of_column'] * $data['mobile_no_of_rows']);
                        }
                        $whr = '';

                        if ($data['hashtag_is'] == "1") {
                            $whr .= ' and (';
                            $i = 0;
                            foreach (explode(", ", trim($data['hash_tags'])) as $f) {
                                if ($i == 0) {
                                    $whr .= "ifd.caption like '%" . trim($f) . "%'";
                                } else {
                                    $whr .= " or ifd.caption like '%" . trim($f) . "%'";
                                }
                                $i++;
                            }
                            $whr .= ")";
                        }


                        $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,

                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('price',  REPLACE(ss.money_format,'{{amount}}',p.selling_price))
                                                    )
                                            ) 

                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        LEFT JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        LEFT JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $shop_id . "' and ifd.is_visible='1' " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT ";

                        $data['meadia_data'] = $this->Data_model->Custome_query($sql . $limit);
                        $data['domain'] = $shopdata['domain'];
                        if ($data['display_type'] == "0") {
                            $data['mobile_data'] = $this->Data_model->Custome_query($sql . $mobilelimit);
                        } else {
                            $data['mobile_data'] = [];
                        }


                        return $this->respond([
                                    'status' => true,
                                    'data' => $data,
                                        ], Api::HTTP_OK);
                    } else {

                        return $this->respond([
                                    'status' => TRUE,
                                        ], Api::HTTP_OK);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something went wrong",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function facebookdata() {

        $shop_id = $this->request->getVar('shop_id');

        $accesstoken = $this->request->getVar('code');

        if (!empty($this->shop) && !empty($shop_id) && !empty($accesstoken)) {

            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop, 'is_install' => '1'], ['id']);

            if (!empty($shopdata)) {

                $url = "https://graph.facebook.com/v7.0/oauth/access_token?client_id=" . FACE_CLIENT_ID . "&redirect_uri=" . $this->config->domain_url . "thfeed-admin/facebookauth&client_secret=" . FACE_SECRET_KEY . "&code=" . $accesstoken;

                $outhtoken = $this->call_curl($url, '');

                if (isset($outhtoken['access_token'])) {
                    $accesstoken = $outhtoken['access_token'];

                    $url = "https://graph.facebook.com/v7.0/me?fields=id,name,picture&access_token=" . $accesstoken;


                    $userdetails = $this->call_curl($url, '');
                    if (isset($userdetails['id'])) {

                        $userid = $userdetails['id'];
                        $name = $userdetails['name'];
                        $imageurl = $userdetails['picture']['data']['url'];


                        $facedata = [
                            'shop_id' => $shop_id,
                            'shop' => $this->shop,
                            'facebook_name' => $name,
                            'accesstoken' => $accesstoken,
                            'token_type' => $outhtoken['token_type'],
                            'expires_in' => isset($outhtoken['expires_in']) ? $outhtoken['expires_in'] : 0,
                            'user_id' => $userid,
                            'image_url' => $imageurl,
                            'graphddomain' => "graph.facebook.com",
                            'grantedscopes' => "",
                            'create_date' => date('Y-m-d'),
                            'status' => "1",
                            'register_with' => "1",
                        ];



                        $this->Data_model->Deleta_data(FACEBOOK, ['shop' => $this->shop, 'shop_id' => $shop_id]);
                        $this->Data_model->Deleta_data(FACEBOOK_PAGE, ['shop_id' => $shop_id]);
                        $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id]);
                        $this->Data_model->Deleta_data(INSTA_FEED, ['shop_id' => $shop_id]);

                        $id = $this->Data_model->Insert_data_id(FACEBOOK, $facedata);


                        $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], ['is_social_login' => "1", "login_with" => "FACEBOOK"]);

                        $url = "https://graph.facebook.com/v7.0/" . $userid . "/accounts?fields=instagram_business_account,name,access_token,id,is_webhooks_subscribed&access_token=$accesstoken";

                        $pagedata = $this->call_curl($url, '');

//                        $test_log = "\n---------FaceBook Page pagelist  ------------\n" . " $url \n---------pagelist response------------\n" . json_encode($pagedata);
//                        log_message('custom', "pagelist result:-" . $test_log);

                        if (!empty($pagedata['data'])) {

                            foreach ($pagedata['data'] as $pg) {

                                if (isset($pg['instagram_business_account']['id'])) {

                                    if ($shop_id == 39) {

                                        $suburl = "https://graph.facebook.com/v7.0/" . $pg['id'] . "/subscribed_apps";

                                        $postdata = [
                                            'subscribed_fields' => 'feed',
                                            'page_id' => $pg['id'],
                                            'access_token' => $pg['access_token']
                                        ];

                                        $subscribedata = $this->call_curl($suburl, $postdata);

                                        $test_log = "\n---------FaceBook Page Subscribe for Webhooks ------------\n" . " $suburl \n---------Webhooks response------------\n" . json_encode($subscribedata);
                                        log_message('custom', "result:-" . $test_log);
                                    }
                                    $pagedata = [
                                        'facebook_id' => $id,
                                        'shop_id' => $shop_id,
                                        'name' => $pg['name'],
                                        'page_id' => $pg['id'],
                                        'token' => $pg['access_token'],
                                        'is_check' => "0",
                                    ];
                                    $pagetableid = $this->Data_model->Insert_data_id(FACEBOOK_PAGE, $pagedata);



                                    $url = "https://graph.facebook.com/v7.0/" . $pg['instagram_business_account']['id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $accesstoken;

                                    $instadata = $this->call_curl($url, '');
                                    if (isset($instadata['name']) && !empty($instadata['name'])) {

//                                        $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($instadata);
//                                        log_message('custom', "Instagram Data result:-" . $test_log);


                                        if (isset($outhtoken['expires_in']) && !empty($outhtoken['expires_in'])) {
                                            $date = new DateTime();
                                            $date->add(new DateInterval('PT' . $outhtoken['expires_in'] . 'S'));
                                            $expireddate = $date->format('Y-m-d');
                                        } else {
                                            $expireddate = "";
                                        }
                                        $pagedata = [
                                            'facebook_id' => $id,
                                            'shop_id' => $shop_id,
                                            'instagram_id' => $pg['instagram_business_account']['id'],
                                            'name' => $instadata['name'],
                                            'username' => $instadata['username'],
                                            'image_url' => $instadata['profile_picture_url'],
                                            'media_count' => $instadata['media_count'],
                                            'page_id' => $pg['id'],
                                            'is_check' => "0",
                                            "accesstoken" => $accesstoken,
                                            "token_type" => $outhtoken['token_type'],
                                            "expires_in" => isset($outhtoken['expires_in']) ? $outhtoken['expires_in'] : 0,
                                            "expired_date" => $expireddate,
                                        ];

                                        $existdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'page_id' => $pg['id'], 'instagram_id' => $pg['instagram_business_account']['id']], ['shop_id', 'instagram_id', 'page_id']);

                                        if (empty($existdata)) {
                                            $this->Data_model->Insert_data_id(INSTAGRAM_ACCOUNT, $pagedata);
                                        } else {
                                            $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'page_id' => $pg['id'], 'instagram_id' => $pg['instagram_business_account']['id']], $pagedata);
                                        }
                                    } else {

//                                        $test_log = "\n---------Instagram Account Not found------------\n" . " $url \n---------Instagram response------------\n" . json_encode($instadata);
//                                        log_message('custom', "Instagram Data result:-" . $test_log);

                                        return $this->respond([
                                                    'status' => FALSE,
                                                    'message' => "Instagram Account is not found Please try again.",
                                                        ], Api::HTTP_OK);
                                        break;
                                    }
                                }
                            }
                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {

                            $this->Data_model->Deleta_data(FACEBOOK_PAGE, ['facebook_id' => $id, 'shop_id' => $shop_id]);
                            return $this->respond([
                                        'status' => FALSE,
                                        'is_page' => FALSE,
                                            ], Api::HTTP_OK);
                        }
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'error' => $outhtoken['error']['message'],
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function reauthfacebookdata() {

        $shop_id = $this->request->getVar('shop_id');

        $accesstoken = $this->request->getVar('code');

        if (!empty($this->shop) && !empty($shop_id) && !empty($accesstoken)) {

            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop, 'is_install' => '1'], ['id']);

            if (!empty($shopdata)) {

                $url = "https://graph.facebook.com/v7.0/oauth/access_token?client_id=" . FACE_CLIENT_ID . "&redirect_uri=" . $this->config->domain_url . "thfeed-admin/facebookauth&client_secret=" . FACE_SECRET_KEY . "&code=" . $accesstoken;

                $outhtoken = $this->call_curl($url, '');

                if (isset($outhtoken['access_token'])) {
                    $accesstoken = $outhtoken['access_token'];

                    $url = "https://graph.facebook.com/v7.0/me?fields=id,name,picture&access_token=" . $accesstoken;


                    $userdetails = $this->call_curl($url, '');
                    if (isset($userdetails['id'])) {

                        $userid = $userdetails['id'];
                        $name = $userdetails['name'];
                        $imageurl = $userdetails['picture']['data']['url'];

                        $facedata = [
                            'shop_id' => $shop_id,
                            'shop' => $this->shop,
                            'facebook_name' => $name,
                            'accesstoken' => $accesstoken,
                            'token_type' => $outhtoken['token_type'],
                            'expires_in' => isset($outhtoken['expires_in']) ? $outhtoken['expires_in'] : 0,
                            'user_id' => $userid,
                            'image_url' => $imageurl,
                            'graphddomain' => "graph.facebook.com",
                            'status' => "1",
                            'register_with' => "1",
                        ];


                        $olddata = $this->Data_model->Get_data_one_column(FACEBOOK, ['shop_id' => $shop_id, 'shop' => $this->shop], ['facebook_id']);
                        if (!empty($olddata)) {

                            $this->Data_model->Update_data(FACEBOOK, ['shop_id' => $shop_id, 'shop' => $this->shop], $facedata);
                            $id = $olddata['facebook_id'];


                            $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], ['is_social_login' => "1", "login_with" => "FACEBOOK", 'is_refresh' => "1"]);

                            $url = "https://graph.facebook.com/v7.0/" . $userid . "/accounts?fields=instagram_business_account,name,access_token,id,is_webhooks_subscribed&access_token=$accesstoken";

                            $pagedata = $this->call_curl($url, '');

                            if (!empty($pagedata['data'])) {

                                foreach ($pagedata['data'] as $pg) {

                                    if (isset($pg['instagram_business_account']['id'])) {

//                                        if ($shop_id == 39) {
//
//                                            $suburl = "https://graph.facebook.com/v7.0/" . $pg['id'] . "/subscribed_apps";
//
//                                            $postdata = [
//                                                'subscribed_fields' => 'feed',
//                                                'page_id' => $pg['id'],
//                                                'access_token' => $pg['access_token']
//                                            ];
//
//                                            $subscribedata = $this->call_curl($suburl, $postdata);
//
//                                            $test_log = "\n---------FaceBook Page Subscribe for Webhooks ------------\n" . " $suburl \n---------Webhooks response------------\n" . json_encode($subscribedata);
//                                            log_message('custom', "result:-" . $test_log);
//                                        }


                                        $oldpagedata = $this->Data_model->Get_data_one_column(FACEBOOK_PAGE, ['facebook_id' => $id, 'shop_id' => $shop_id, 'page_id' => $pg['id']], ['facebook_id']);

                                        $pagedata = [
                                            'facebook_id' => $id,
                                            'shop_id' => $shop_id,
                                            'name' => $pg['name'],
                                            'page_id' => $pg['id'],
                                            'token' => $pg['access_token'],
                                        ];
                                        if (!empty($oldpagedata)) {
                                            $this->Data_model->Update_data(FACEBOOK_PAGE, ['facebook_id' => $id, 'shop_id' => $shop_id, 'page_id' => $pg['id']], $pagedata);
                                        } else {
                                            $this->Data_model->Insert_data(FACEBOOK_PAGE, $pagedata);
                                        }



                                        $url = "https://graph.facebook.com/v7.0/" . $pg['instagram_business_account']['id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $accesstoken;

                                        $instadata = $this->call_curl($url, '');
                                        if (isset($instadata['name']) && !empty($instadata['name'])) {

//                                        $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($instadata);
//                                        log_message('custom', "Instagram Data result:-" . $test_log);


                                            if (isset($outhtoken['expires_in']) && !empty($outhtoken['expires_in'])) {
                                                $date = new DateTime();
                                                $date->add(new DateInterval('PT' . $outhtoken['expires_in'] . 'S'));
                                                $expireddate = $date->format('Y-m-d');
                                            } else {
                                                $expireddate = "";
                                            }
                                            $pagedata = [
                                                'facebook_id' => $id,
                                                'shop_id' => $shop_id,
                                                'instagram_id' => $pg['instagram_business_account']['id'],
                                                'name' => $instadata['name'],
                                                'username' => $instadata['username'],
                                                'image_url' => $instadata['profile_picture_url'],
                                                'media_count' => $instadata['media_count'],
                                                'page_id' => $pg['id'],
                                                "accesstoken" => $accesstoken,
                                                "token_type" => $outhtoken['token_type'],
                                                "expires_in" => isset($outhtoken['expires_in']) ? $outhtoken['expires_in'] : 0,
                                                "expired_date" => $expireddate,
                                                'is_refresh' => "1"
                                            ];

                                            $existdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'page_id' => $pg['id'], 'instagram_id' => $pg['instagram_business_account']['id']], ['shop_id', 'instagram_id', 'page_id']);

                                            if (empty($existdata)) {
                                                $pagedata['is_check'] = '0';
                                                $this->Data_model->Insert_data_id(INSTAGRAM_ACCOUNT, $pagedata);
                                            } else {
                                                $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'page_id' => $pg['id'], 'instagram_id' => $pg['instagram_business_account']['id']], $pagedata);
                                            }
                                        } else {

//                                        $test_log = "\n---------Instagram Account Not found------------\n" . " $url \n---------Instagram response------------\n" . json_encode($instadata);
//                                        log_message('custom', "Instagram Data result:-" . $test_log);

                                            return $this->respond([
                                                        'status' => FALSE,
                                                        'message' => "Instagram Account is not found Please try again.",
                                                            ], Api::HTTP_OK);
                                            break;
                                        }
                                    }
                                }
                                return $this->respond([
                                            'status' => TRUE,
                                                ], Api::HTTP_OK);
                            } else {

                                $this->Data_model->Deleta_data(FACEBOOK_PAGE, ['facebook_id' => $id, 'shop_id' => $shop_id]);
                                return $this->respond([
                                            'status' => FALSE,
                                            'is_page' => FALSE,
                                                ], Api::HTTP_OK);
                            }
                        }
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'error' => $outhtoken['error']['message'],
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function instadata() {

        $shop_id = $this->request->getVar('shop_id');

        $code = $this->request->getVar('code');

        if (!empty($this->shop) && !empty($shop_id) && !empty($code)) {


            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop, 'is_install' => '1'], ['id']);


            if (!empty($shopdata)) {

                $data = [
                    'client_id' => INSTA_CLIENT_ID,
                    'client_secret' => INSTA_SECRET_KEY,
                    'grant_type' => "authorization_code",
                    'redirect_uri' => $this->config->domain_url . "thfeed-admin/instagramcallback",
                    'code' => $code,
                ];
                $url = "https://api.instagram.com/oauth/access_token";

                $outhtoken = $this->call_curl($url, $data);

                if (isset($outhtoken['access_token'])) {


                    $url = "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=" . INSTA_SECRET_KEY . "&access_token=" . $outhtoken['access_token'];
                    $authtoken = $this->call_curl($url, "");



                    if (isset($authtoken['access_token'])) {

                        $url = "https://graph.instagram.com/me?fields=id,username&access_token=" . $authtoken['access_token'];

                        $userdata = $this->call_curl($url, "");


                        if (!empty($userdata) && isset($userdata['id'])) {


                            $date = new DateTime();
                            $date->getTimestamp();
                            $date->add(new DateInterval('PT' . $authtoken['expires_in'] . 'S'));


                            $pagedata = [
                                'shop_id' => $shop_id,
                                'instagram_id' => $userdata['id'],
                                'ig_id' => "",
                                'image_url' => isset($profile["graphql"]["user"]["profile_pic_url"]) ? $profile["graphql"]["user"]["profile_pic_url"] : "",
                                'name' => $userdata['username'],
                                'username' => $userdata['username'],
                                'media_count' => 0,
                                'accesstoken' => $authtoken['access_token'],
                                'token_type' => $authtoken['token_type'],
                                'expires_in' => $authtoken['expires_in'],
                                'expired_date' => $date->format('Y-m-d'),
                                'register_with' => "1",
                                'is_check' => "1",
                            ];


                            $this->Data_model->Deleta_data(FACEBOOK, ['shop_id' => $shop_id]);
                            $this->Data_model->Deleta_data(FACEBOOK_PAGE, ['shop_id' => $shop_id]);
                            $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id]);
                            $this->Data_model->Deleta_data(INSTA_FEED, ['shop_id' => $shop_id]);

                            $instragram_account_id = $this->Data_model->Insert_data_id(INSTAGRAM_ACCOUNT, $pagedata);

                            $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], ['is_social_login' => "1", "login_with" => "INSTAGRAM"]);


                            $return_url = "https://graph.instagram.com/me/media?fields=caption,media_type,permalink,media_url,timestamp&limit=50&access_token=" . $authtoken['access_token'];

                            while ($return_url != '' && $return_url != null) {
                                $instadata = $this->call_curl($return_url, '');

                                if (isset($instadata['data'])) {

                                    foreach ($instadata['data'] as $in) {
                                        $instafeeddata = [
                                            'instagram_account_id' => $instragram_account_id,
                                            'shop_id' => $shop_id,
                                            'caption' => isset($in['caption']) ? $in['caption'] : '',
                                            'feed_main_id' => $in['id'],
                                            'media_type' => $in['media_type'],
                                            'media_url' => $in['media_url'],
                                            'media_short_url' => isset($in['permalink']) ? $in['permalink'] . "media/?size=l" : "",
                                            'permalink' => isset($in['permalink']) ? $in['permalink'] : "",
                                            'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                            'is_visible' => '1'
                                        ];


                                        $einstadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                        if (!empty($einstadata)) {
                                            $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $einstadata['insta_feed_id']], $instafeeddata);
                                        } else {
                                            $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                        }
                                    }

                                    if (!empty($instadata['paging']['next'])) {
                                        $return_url = $instadata['paging']['next'];
                                    } else {
                                        $return_url = '';
                                    }
                                }
                            }


                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {


                            $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id]);

                            return $this->respond([
                                        'status' => FALSE,
                                        $userdata['error']
                                            ], Api::HTTP_OK);
                        }
                    } else {

                        return $this->respond([
                                    'status' => FALSE,
                                        ], Api::HTTP_OK);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                $outhtoken
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Invalid Shop",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function reauth() {

        $shop_id = $this->request->getVar('shop_id');
        $code = $this->request->getVar('code');

        if (!empty($this->shop) && !empty($shop_id) && !empty($code)) {


            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop, 'is_install' => '1'], ['id']);


            if (!empty($shopdata)) {

                $data = [
                    'client_id' => INSTA_CLIENT_ID,
                    'client_secret' => INSTA_SECRET_KEY,
                    'grant_type' => "authorization_code",
                    'redirect_uri' => $this->config->domain_url . "thfeed-admin/instagramcallback",
                    'code' => $code,
                ];
                $url = "https://api.instagram.com/oauth/access_token";

                $outhtoken = $this->call_curl($url, $data);

                if (isset($outhtoken['access_token'])) {


                    $url = "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=" . INSTA_SECRET_KEY . "&access_token=" . $outhtoken['access_token'];
                    $authtoken = $this->call_curl($url, "");


                    if (isset($authtoken['access_token'])) {
                        $url = "https://graph.instagram.com/" . $outhtoken['user_id'] . "?fields=id,username&access_token=" . $authtoken['access_token'];

                        $userdata = $this->call_curl($url, "");

                        if (isset($userdata['username']) && !empty($userdata)) {


                            $date = new DateTime();
                            $date->getTimestamp();
                            $date->add(new DateInterval('PT' . $authtoken['expires_in'] . 'S'));


                            $pagedata = [
                                'instagram_id' => $outhtoken['user_id'],
                                'image_url' => isset($profile["graphql"]["user"]["profile_pic_url"]) ? $profile["graphql"]["user"]["profile_pic_url"] : "",
                                'name' => $userdata['username'],
                                'username' => $userdata['username'],
                                'media_count' => 0,
                                'accesstoken' => $authtoken['access_token'],
                                'token_type' => $authtoken['token_type'],
                                'expires_in' => $authtoken['expires_in'],
                                'expired_date' => $date->format('Y-m-d'),
                                'register_with' => "1",
                                'is_check' => "1",
                                'is_refresh' => "1",
                            ];


                            $instragram_account_id = $this->Data_model->Update_data_id(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], $pagedata);


                            $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], ['is_social_login' => "1", "login_with" => "INSTAGRAM"]);


                            $return_url = "https://graph.instagram.com/" . $outhtoken['user_id'] . "/media?fields=caption,media_type,media_url,timestamp,permalink&limit=50&access_token=" . $authtoken['access_token'];

                            while ($return_url != '' && $return_url != null) {


                                $instadata = $this->call_curl($return_url, '');

                                if (isset($instadata['data'])) {
                                    foreach ($instadata['data'] as $in) {

                                        $instafeeddata = [
                                            'instagram_account_id' => $instragram_account_id,
                                            'shop_id' => $shop_id,
                                            'caption' => isset($in['caption']) ? $in['caption'] : '',
                                            'feed_main_id' => $in['id'],
                                            'media_type' => $in['media_type'],
                                            'media_url' => $in['media_url'],
                                            'media_short_url' => isset($in['permalink']) ? $in['permalink'] . "media/?size=l" : "",
                                            'permalink' => isset($in['permalink']) ? $in['permalink'] : "",
                                            'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                            'is_visible' => '1'
                                        ];

                                        $einstadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                        if (!empty($einstadata)) {
                                            $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $einstadata['insta_feed_id']], $instafeeddata);
                                        } else {
                                            $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                        }
                                    }

                                    if (!empty($instadata['paging']['next'])) {
                                        $return_url = $instadata['paging']['next'];
                                    } else {
                                        $return_url = '';
                                    }
                                } else {

                                    return $this->respond([
                                                'status' => FALSE,
                                                'error' => $instadata['error']
                                                    ], Api::HTTP_OK);
                                    break;
                                }
                            }

                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {

                            return $this->respond([
                                        'status' => FALSE,
                                        'error' => $userdata['error']
                                            ], Api::HTTP_OK);
                        }
                    } else {

                        return $this->respond([
                                    'status' => FALSE,
                                        ], Api::HTTP_OK);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                $outhtoken
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Invalid Shop",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function pagelist() {
        $shop_id = $this->request->getVar('shop_id');

        if (!empty($this->shop) && !empty($shop_id)) {

            $facebookdata = $this->Data_model->Get_data_one(FACEBOOK, ['shop_id' => $shop_id, 'shop' => $this->shop, 'status' => "1", "register_with" => '1']);


            if (!empty($facebookdata)) {
                $sql = "select fp.name as face_page_name,fp.page_id as face_page_id,fp.is_check as face_check,instagram_id,ia.name as instagram_name,image_url as insta_pic,ia.is_check as intsacheck,is_refresh,username from " . FACEBOOK_PAGE . " as fp left join " . INSTAGRAM_ACCOUNT . " as ia on ia.shop_id=fp.shop_id and ia.page_id=fp.page_id and ia.facebook_id=fp.facebook_id  where fp.shop_id='" . $shop_id . "' and fp.facebook_id='" . $facebookdata['facebook_id'] . "'";
                $pagedata = $this->Data_model->Custome_query($sql);

                $refresh = FALSE;

                foreach ($pagedata as $k => $i) {
                    if (!$this->checkurl($pagedata[$k]['insta_pic']) && $pagedata[$k]['is_refresh'] == "1") {
                        $refresh = TRUE;
                        $this->refreshdata($shop_id);
                    } elseif (!$this->checkurl($pagedata[$k]['insta_pic']) && $pagedata[$k]['is_refresh'] == "0") {
                        $pagedata[$k]['image'] = $pagedata[$k]['insta_pic'];
                        $pagedata[$k]['insta_pic'] = base_url('assets/image/user.png');
                    }
                }
                if ($refresh) {
                    $sql = "select fp.name as face_page_name,fp.page_id as face_page_id,fp.is_check as face_check,instagram_id,ia.name as  instagram_name,image_url as insta_pic,ia.is_check as intsacheck,is_refresh,username  from " . FACEBOOK_PAGE . " as fp left join " . INSTAGRAM_ACCOUNT . " as ia on ia.shop_id=fp.shop_id and ia.page_id=fp.page_id and ia.facebook_id=fp.facebook_id  where fp.shop_id='" . $shop_id . "' and fp.facebook_id='" . $facebookdata['facebook_id'] . "'";
                    $pagedata = $this->datamodel->Custome_query($sql);
                }

                $listdata = [
                    'account_name' => $facebookdata['facebook_name'],
                    'profile_pic' => ($this->checkurl($facebookdata['image_url'])) ? $facebookdata['image_url'] : "https://graph.facebook.com/" . $facebookdata['user_id'] . "/picture?type=normal",
                    'facebook_id' => $facebookdata['facebook_id'],
                    'page_list_data' => $pagedata,
                    'is_login' => "FACEBOOK",
                ];
            } else {
                $sql = "select  instagram_id,ia.name as instagram_name,image_url as insta_pic,ia.is_check as intsacheck,is_refresh,username from " . INSTAGRAM_ACCOUNT . " as ia  where ia.shop_id='" . $shop_id . "' and ia.register_with='1'";
                $listdata = $this->Data_model->Custome_query($sql);
                if (!empty($listdata)) {
                    $listdata = $listdata[0];
                    $listdata['is_login'] = "INSTAGRAM";
                } else {
                    $listdata = [];
                }
            }


            if (!empty($listdata)) {

                return $this->respond([
                            'status' => TRUE,
                            'data' => $listdata
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                                ], Api::HTTP_OK);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    function checkurl($url) {

        $headers = @get_headers($url);
        if ($headers && strpos($headers[0], '200')) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function updatestatus() {
        $type = $this->request->getVar('type');
        $shop_id = $this->request->getVar('shop_id');
        $id = $this->request->getVar('id');
        $facebook_id = $this->request->getVar('facebook_id');
        if (!empty($type) && !empty($shop_id) && !empty($id)) {



            if (strtolower($type) == "fp") {

                $this->Data_model->Update_data(FACEBOOK_PAGE, ['shop_id' => $shop_id, 'facebook_id' => $facebook_id, 'page_id' => $id], ['is_check' => "1"]);
                $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'facebook_id' => $facebook_id], ['is_check' => "0"]);
                $sql = "select fp.name as face_page_name,fp.page_id as face_page_id,fp.is_check as face_check,instagram_id,ia.name as  instagram_name,image_url as insta_pic,ia.is_check as intsacheck,ia.media_count from " . FACEBOOK_PAGE . " as fp left join " . INSTAGRAM_ACCOUNT . " as ia on ia.shop_id=fp.shop_id and ia.page_id=fp.page_id and ia.facebook_id=fp.facebook_id  where fp.shop_id='" . $shop_id . "' and fp.facebook_id='" . $facebook_id . "'";
                $pagedata = $this->Data_model->Custome_query($sql);
                $listdata['page_list_data'] = $pagedata;
            } elseif (strtolower($type) == "ip") {


                $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'facebook_id' => $facebook_id, 'instagram_id' => $id], ['is_check' => "1"]);

                $sql = "select fp.name as face_page_name,fp.page_id as face_page_id,fp.is_check as face_check,instagram_id,ia.name as  instagram_name,image_url as insta_pic,ia.is_check as intsacheck,ia.media_count from " . FACEBOOK_PAGE . " as fp left join " . INSTAGRAM_ACCOUNT . " as ia on ia.shop_id=fp.shop_id and ia.page_id=fp.page_id and ia.facebook_id=fp.facebook_id  where fp.shop_id='" . $shop_id . "' and fp.facebook_id='" . $facebook_id . "'";
                $pagedata = $this->Data_model->Custome_query($sql);
                $listdata['page_list_data'] = $pagedata;

                $total_pages = ceil($pagedata[0]['media_count'] / 50);
                $page_count = $total_pages;
                $return_url = NULL;



                $sql = "select accesstoken,count(ifd.insta_feed_id)as feedcount,ia.instagram_account_id,ia.username from " . INSTAGRAM_ACCOUNT . "  as ia  left join " . INSTA_FEED . " as ifd on ifd.instagram_account_id=ia.instagram_account_id where ia.shop_id='" . $shop_id . "' and ia.instagram_id='" . $id . "' ";

                $existfeed = $this->Data_model->Custome_query($sql);

                $this->Data_model->Update_data(PRODUCT_GALLARY, ['shop_id' => $shop_id], ['embed_heading' => '#showyourstyle @' . $existfeed[0]['username']]);

                if ($existfeed[0]['feedcount'] <= 0) {
                    $return_url = "https://graph.facebook.com/v7.0/" . $id . "/media?fields=caption,like_count,media_type,media_url,permalink,shortcode,timestamp,comments_count,is_comment_enabled&limit=50&access_token=" . $existfeed[0]['accesstoken'];

                    while ($return_url != '' && $return_url != null) {


                        $instadata = $this->call_curl($return_url, '');


                        foreach ($instadata['data'] as $in) {
                            if (isset($in['media_url'])) {
                                $instafeeddata = [
                                    'instagram_account_id' => $existfeed[0]['instagram_account_id'],
                                    'shop_id' => $shop_id,
                                    'caption' => isset($in['caption']) ? $in['caption'] : '',
                                    'feed_main_id' => $in['id'],
                                    'media_type' => $in['media_type'],
                                    'media_url' => $in['media_url'],
                                    'media_short_url' => $in['permalink'] . "media/?size=l",
                                    'permalink' => $in['permalink'],
                                    'like_count' => $in['like_count'],
                                    'comments_count' => $in['comments_count'],
                                    'shortcode' => $in['shortcode'],
                                    'is_comment_enabled' => $in['is_comment_enabled'],
                                    'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                    'is_visible' => '1'
                                ];

                                $einstadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                if (!empty($einstadata)) {
                                    $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $einstadata['insta_feed_id']], $instafeeddata);
                                } else {
                                    $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                }
                            }
                        }
                        if (!empty($instadata['paging']['next'])) {
                            $return_url = $instadata['paging']['next'];
                        } else {
                            $return_url = '';
                        }
                    }
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "type is invalid.",
                                ], Api::HTTP_BAD_REQUEST);
            }



            return $this->respond([
                        'status' => TRUE,
                        'data' => $listdata
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function remove_facebookdata() {
        $shop_id = $this->request->getVar('shop_id');

        if (!empty($this->shop) && !empty($shop_id)) {

            $this->Data_model->Deleta_data(FACEBOOK, ['shop' => $this->shop, 'shop_id' => $shop_id]);
            $this->Data_model->Deleta_data(FACEBOOK_PAGE, ['shop_id' => $shop_id]);
            $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id]);
            $this->Data_model->Deleta_data(INSTA_FEED, ['shop_id' => $shop_id]);

            $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop], ['is_social_login' => "0", "login_with" => ""]);

            return $this->respond([
                        'status' => TRUE,
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function tagproduct() {

        $shop_id = $this->request->getVar('shop_id');
        $insta_feed_id = $this->request->getVar('insta_feed_id');
        $data = $this->request->getVar('data');
        $instagram_account_id = $this->request->getVar('instagram_account_id');
        $caption = $this->request->getVar('caption');
        $show_hotspot = $this->request->getVar('show_hotspot');
        if (!empty($shop_id) && !empty($insta_feed_id) && !empty($instagram_account_id)) {

            $checkcorrectdata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'instagram_account_id' => $instagram_account_id, 'insta_feed_id' => $insta_feed_id], ['shop_id', 'instagram_account_id', 'insta_feed_id']);

            if (!empty($checkcorrectdata)) {

                if (!empty($data)) {

                    foreach ($data as $d) {

                        $tagdata = [
                            'shop_id' => $shop_id,
                            INSTA_FEED . '_id' => $insta_feed_id,
                            'product_id' => $d['shopify_product_id'],
                            'top_position' => $d['top_position'],
                            'left_position' => $d['left_position'],
                        ];

                        if (!empty($d['tag_product_id'])) {
                            $existdata = $this->Data_model->Get_data_one(TAG_PRODUCT, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'tag_product_id' => $d['tag_product_id']]);
                            if (!empty($existdata)) {
                                $tagdata['update_date'] = date('Y-m-d');
                                $this->Data_model->Update_data(TAG_PRODUCT, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'tag_product_id' => $d['tag_product_id']], $tagdata);
                            }
                        } else {
                            $existdata = $this->Data_model->Get_data_one(TAG_PRODUCT, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'product_id' => $d['shopify_product_id']]);
                            if (!empty($existdata)) {
                                $tagdata['update_date'] = date('Y-m-d');
                                $this->Data_model->Update_data(TAG_PRODUCT, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'tag_product_id' => $existdata['tag_product_id']], $tagdata);
                            } else {
                                $tagdata['create_date'] = date('Y-m-d');
                                $this->Data_model->Insert_data(TAG_PRODUCT, $tagdata);
                            }
                        }
                    }
                }
                $updata['show_hotspot'] = $show_hotspot;
                if (!empty($caption)) {
                    $updata['caption'] = $caption;
                }
                $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => "$shop_id", INSTA_FEED . '_id' => "$insta_feed_id", 'instagram_account_id' => $instagram_account_id], $updata);

                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Feed is not available ,something went wrong",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong.",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function updatetagflag() {
        $shop_id = $this->request->getVar('shop_id');
        $insta_feed_id = $this->request->getVar('insta_feed_id');
        $instagram_account_id = $this->request->getVar('instagram_account_id');
        $is_visible = $this->request->getVar('is_visible');
        if (!empty($shop_id) && !empty($insta_feed_id)) {
            $updatetrue = $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, 'instagram_account_id' => $instagram_account_id, INSTA_FEED . '_id' => $insta_feed_id], ['is_visible' => "$is_visible"]);
            if ($updatetrue) {
                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Something went wrong",
                                ], Api::HTTP_OK);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function deletetagproduct() {
        $shop_id = $this->request->getVar('shop_id');
        $insta_feed_id = $this->request->getVar('insta_feed_id');
        $tag_product_id = $this->request->getVar('tag_product_id');
        if (!empty($tag_product_id) && !empty($insta_feed_id) && !empty($shop_id)) {

            $true = $this->Data_model->Deleta_data(TAG_PRODUCT, ["shop_id" => $shop_id, INSTA_FEED . "_id" => $insta_feed_id, "tag_product_id" => $tag_product_id]);
            if ($true) {
                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Something went wrong.",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong.",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function getproduct() {
        $shop_id = $this->request->getVar('shop_id');

        if (!empty($shop_id)) {

            $sql = "SELECT p.product_id,p.product_name,pi.image_name as src FROM  " . PRODUCT . " as p INNER JOIN (SELECT shopify_product_id,image_name FROM  " . PRODUCT_IMAGES . " GROUP BY shopify_product_id) as pi on pi.shopify_product_id=p.shopify_product_id where p.shop_id='" . $shop_id . "'";

            $data = $this->Data_model->Custome_query($sql);

            return $this->respond([
                        'status' => TRUE,
                        'data' => $data
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Shop id is invalid",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function productgallarylist() {
        $shop_id = $this->request->getVar('shop_id');

        if (!empty($this->shop) && !empty($shop_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop], ['id', 'domain']);

            if (!empty($shopdata)) {
                $productdata = $this->Data_model->Get_data_one(PRODUCT_GALLARY, ['shop' => $this->shop, 'shop_id' => $shop_id]);

                $limit = ($productdata['no_of_column'] * $productdata['no_of_rows']);
                $mobilelimit = ($productdata['mobile_no_of_column'] * $productdata['mobile_no_of_rows']);
                $sql = "select tp.product_id,p.shopify_product_id,p.shopify_handle_name,p.product_name,p.product_description,p.product_image from " . TAG_PRODUCT . " as tp inner join " . PRODUCT . " as p on p.product_id=tp.product_id and tp.shop_id=p.shop_id where tp.shop_id='" . $shop_id . "' limit 1";

                $tagproductdata = $this->Data_model->Custome_query($sql);
                if (!empty($tagproductdata)) {


                    $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,FIND_IN_SET('" . $tagproductdata[0]['product_id'] . "', GROUP_CONCAT(p.product_id)) as cnt,
                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('price',  REPLACE(ss.money_format,'{{amount}}',p.selling_price))
                                                    )
                                            ) 
                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        INNER JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        INNER JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $shop_id . "'  GROUP BY ifd.insta_feed_id HAVING cnt > 0 order by ifd.timestamp desc   LIMIT ";

                    $productdata['product_details'] = $tagproductdata[0];
                    if ($this->shop == 'wc-ketan.myshopify.com') {
//                        echo $sql . $limit;
                    }
                    $productdata['instafeed'] = $this->Data_model->Custome_query($sql . $limit);
                    $productdata['mobilefeed'] = $this->Data_model->Custome_query($sql . $mobilelimit);
                    $productdata['domain'] = $shopdata['domain'];
                }
                return $this->respond([
                            'status' => TRUE,
                            'data' => $productdata
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function productgallary() {

        $postdata = $this->request->getVar();

        $shop_id = $this->request->getVar('shop_id');

        $product_gallary_id = $this->request->getVar('product_gallary_id');
        $product_id = $this->request->getVar('product_id');

        unset($postdata['product_id']);
        unset($postdata['url_params']);

        if (!empty($this->shop) && !empty($shop_id) && !empty($product_gallary_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['id' => $shop_id, 'shop' => $this->shop], ['id', 'domain']);

            if (!empty($shopdata)) {
                $productdata = $this->Data_model->Get_data_one(PRODUCT_GALLARY, ['shop' => $this->shop, 'shop_id' => $shop_id, 'product_gallary_id' => $product_gallary_id]);

                if (!empty($productdata)) {

                    $updatetrue = $this->Data_model->Update_data(PRODUCT_GALLARY, ['shop' => $this->shop, 'shop_id' => $shop_id, 'product_gallary_id' => $product_gallary_id], $postdata);

                    if ($updatetrue) {

                        if (!empty($postdata['no_of_column']) || !empty($postdata['no_of_rows']) || !empty($postdata['mobile_no_of_column']) || !empty($postdata['mobile_no_of_rows']) || !empty($postdata['slider_limit'])) {

                            if ($productdata['display_type'] == "0") {

                                $no_of_column = !empty($this->request->getVar('no_of_column')) ? $this->request->getVar('no_of_column') : $productdata['no_of_column'];

                                $no_of_rows = !empty($this->request->getVar('no_of_rows')) ? $this->request->getVar('no_of_rows') : $productdata['no_of_rows'];

                                $limit = ($no_of_rows * $no_of_column);

                                $mobile_no_of_column = !empty($this->request->getVar('mobile_no_of_column')) ? $this->request->getVar('mobile_no_of_column') : $productdata['mobile_no_of_column'];

                                $mobile_no_of_rows = !empty($this->request->getVar('mobile_no_of_rows')) ? $this->request->getVar('mobile_no_of_rows') : $productdata['mobile_no_of_rows'];

                                $mobilelimit = ($mobile_no_of_rows * $mobile_no_of_column);
                            } else {
                                $limit = !empty($this->request->getVar('slider_limit')) ? $this->request->getVar('slider_limit') : $productdata['slider_limit'];
                                $mobilelimit = "";
                            }

                            if (!empty($product_id)) {
                                $sql = "SELECT ifd.* ,
                                    ifnull(ifd.username,ia.username) as username,
                                    ia.image_url as logo,
                                    DATE_FORMAT(date(ifd.timestamp), '%M %d, %Y')as datetime,
                                    count(tag_product.tag_product_id) as tag_product_count,
                                    ifd.insta_feed_id,FIND_IN_SET('" . $product_id . "', GROUP_CONCAT(p.product_id)) as cnt,
                                    (CASE
                                        WHEN tag_product.insta_feed_id THEN 
                                            JSON_ARRAYAGG(
                                                    JSON_MERGE_PRESERVE( 
                                                        json_object('tag_product_id', " . TAG_PRODUCT . ".tag_product_id)
                                                        , json_object('top_position', " . TAG_PRODUCT . ".top_position)
                                                        , json_object('left_position', " . TAG_PRODUCT . ".left_position)
                                                        , json_object('is_number', " . TAG_PRODUCT . ".is_number)
                                                        , json_object('shopify_product_id', " . TAG_PRODUCT . ".product_id)
                                                        , json_object('product_image', p.product_image)
                                                        , json_object('product_title', p.product_name)
                                                        , json_object('shopify_handle_name', p.shopify_handle_name)
                                                        , json_object('price',  REPLACE(ss.money_format,'{{amount}}',p.selling_price))
                                                    )
                                            ) 
                                        ELSE  'null'
                                    END) AS data
                                   from " . INSTA_FEED . " as ifd
                                   inner join " . INSTAGRAM_ACCOUNT . " as ia on ia.instagram_account_id=ifd.instagram_account_id and ifd.shop_id=ia.shop_id 
                                        INNER JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        INNER JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id 
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $shop_id . "'  GROUP BY ifd.insta_feed_id HAVING cnt > 0 order by ifd.timestamp desc   LIMIT ";

                                if ($productdata['display_type'] == "0") {
                                    $data['instafeed'] = $this->Data_model->Custome_query($sql . $limit);
                                    $data['mobilefeed'] = $this->Data_model->Custome_query($sql . $mobilelimit);
                                } else {
                                    $data['instafeed'] = $this->Data_model->Custome_query($sql . $limit);
                                    $data['mobilefeed'] = [];
                                }
                            }

                            $data['domain'] = $shopdata['domain'];

                            return $this->respond([
                                        'status' => TRUE,
                                        'data' => $data
                                            ], Api::HTTP_OK);
                        } else {
                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        }
                    } else {
                        return $this->respond([
                                    'status' => FALSE,
                                    'message' => "Something went wrong",
                                        ], Api::HTTP_OK);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something Went Wrong",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went Wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function applyplain() {

        $shop_id = $this->request->getVar('shop_id');
        $type = $this->request->getVar('type');
        $url_params = $this->request->getVar('url_params');

        $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop', 'charge_id'));

        if (!empty($shopdata)) {
            if (strtolower($type) == "free") {


                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );
                $this->shopify = new Shopify($data);



                $senddata = [
                    'METHOD' => 'DELETE',
                    'URL' => "/admin/api/2020-04/recurring_application_charges/" . $shopdata['charge_id'] . ".json",
                    'HEADERS' => array(),
                    'DATA' => array(),
                    'FAILONERROR' => TRUE,
                    'RETURNARRAY' => TRUE,
                    'ALLDATA' => FALSE
                ];

                $resultdata = $this->shopify->call($senddata);

                $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id], ['paid_plain' => "0", 'charge_id' => "", 'activate_date' => date('Y-m-d')]);




                $sql = "select shop,shop_id,embed_code_id from " . EMBDED_CODE . " where shop='" . $this->shop . "' and shop_id='" . $shop_id . "' ORDER BY  embed_code_id ASC";
                $embdeddata = $this->Data_model->Custome_query($sql);

                array_shift($embdeddata);
                foreach ($embdeddata as $d) {
                    $this->Data_model->Deleta_data(EMBDED_CODE, ['shop_id' => $d['shop_id'], 'embed_code_id' => $d['embed_code_id'], 'shop' => $d['shop']]);
                }

                $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id], ['paid_plain' => "0", 'charge_id' => "", 'activate_date' => date('Y-m-d')]);


                $layoutdata = $this->Data_model->Get_data_one(INSTA_LAYOUT, ['status' => '1', 'is_default' => '1']);

                if (!empty($layoutdata)) {

                    if ($layoutdata['type'] == '1') {
                        $updata = [
                            'insta_layout_id' => $layoutdata['insta_layout_id'],
                            'display_type' => $layoutdata['type'],
                            'cell_size' => $layoutdata['no_of_column'],
                            'ul_class' => $layoutdata['class'],
                            'mobile_ul_class' => $layoutdata['mobile_class'],
                            'layout_icon' => $layoutdata['image'],
                            'slider_limit' => ($layoutdata['no_of_column'] * 2),
                        ];
                    } else {
                        $updata = [
                            'insta_layout_id' => $layoutdata['insta_layout_id'],
                            'no_of_column' => $layoutdata['no_of_column'],
                            'no_of_rows' => $layoutdata['no_of_rows'],
                            'mobile_no_of_column' => $layoutdata['mobile_no_of_column'],
                            'mobile_no_of_rows' => $layoutdata['mobile_no_of_rows'],
                            'ul_class' => $layoutdata['class'],
                            'mobile_ul_class' => $layoutdata['mobile_class'],
                            'layout_icon' => $layoutdata['image'],
                            'layout_type' => $layoutdata['pro'],
                            'display_type' => $layoutdata['type']
                        ];
                    }
                    $this->Data_model->Update_data(GALLARY_SETTINGS, ['shop' => $this->shop, 'shop_id' => $shop_id], $updata);

                    $this->Data_model->Update_data(PRODUCT_GALLARY, ['shop' => $this->shop, 'shop_id' => $shop_id], $updata);
                }


                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } elseif (strtolower($type) == "premium") {

                $chargdata = $this->Data_model->Get_data_one_column(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id], ['shop_id', 'shop']);



                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );

                $this->shopify = new Shopify($data);

                $postdata = [];

                $postdata["recurring_application_charge"] = [
                    "name" => "Pro Plan",
                    "price" => "7.99",
//                    "return_url" => $this->config->domain_url . "thfeed-admin/payment?shop=" . $this->shop . "&shop_id=" . $shop_id,
                    "return_url" => base_url('payment') . "?shop=" . $this->shop . "&shop_id=" . $shop_id,
                    "trial_days" => (!empty($chargdata) ? "0" : "7"),
                    "test" => ((WORK_ON == 'LIVE') ? false : true)
                ];


//                $resultdat = $this->api_call($shopdata['token'], $shop, '/admin/api/2020-04/recurring_application_charges.json', $postdata, 'POST');
//                echo "<pre>";
//                print_r($resultdat['response']);
//                die();

                $senddata = [
                    'METHOD' => 'POST',
                    'URL' => '/admin/api/2020-04/recurring_application_charges.json',
                    'HEADERS' => array(),
                    'DATA' => $postdata,
                    'FAILONERROR' => TRUE,
                    'RETURNARRAY' => TRUE,
                    'ALLDATA' => FALSE
                ];

                $resultdata = $this->shopify->call($senddata);


                if ($resultdata['recurring_application_charge']) {

                    $chargsavedata = [
                        "charge_id" => $resultdata['recurring_application_charge']['id'],
                        "shop_id" => $shop_id,
                        "shop" => $this->shop,
                        "name" => $resultdata['recurring_application_charge']['name'],
                        "api_client_id" => $resultdata['recurring_application_charge']['api_client_id'],
                        "price" => $resultdata['recurring_application_charge']['price'],
                        "status" => $resultdata['recurring_application_charge']['status'],
                        "return_url" => $resultdata['recurring_application_charge']['return_url'],
                        "billing_on" => $resultdata['recurring_application_charge']['billing_on'],
                        "test" => $resultdata['recurring_application_charge']['test'],
                        "activated_on" => $resultdata['recurring_application_charge']['activated_on'],
                        "cancelled_on" => $resultdata['recurring_application_charge']['cancelled_on'],
                        "trial_days" => $resultdata['recurring_application_charge']['trial_days'],
                        "trial_ends_on" => $resultdata['recurring_application_charge']['trial_ends_on'],
                        "decorated_return_url" => $resultdata['recurring_application_charge']['decorated_return_url'],
                        "confirmation_url" => $resultdata['recurring_application_charge']['confirmation_url'],
                        "url_params" => http_build_query($url_params),
                    ];


                    if (!empty($chargdata)) {
                        $shop_id = $this->Data_model->Update_data(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id], $chargsavedata);
                    } else {
                        $this->Data_model->Insert_data(APPLICATION_CHARGE, $chargsavedata);
                    }

//                    die;
                    return $this->respond([
                                'status' => TRUE,
                                'confirmation_url' => $resultdata['recurring_application_charge']['confirmation_url']
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something Went wrong please contact support system",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Something Went wrong",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function demoapplyplain() {

        $shop_id = $this->request->getVar('shop_id');
        $type = $this->request->getVar('type');
        $url_params = $this->request->getVar('url_params');

        $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop', 'charge_id'));

        if (!empty($shopdata)) {
            if (strtolower($type) == "free") {



                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );

                $this->shopify = new Shopify($data);


                $senddata = [
                    'METHOD' => 'DELETE',
                    'URL' => "/admin/api/2020-04/recurring_application_charges/" . $shopdata['charge_id'] . ".json",
                    'HEADERS' => array(),
                    'DATA' => array(),
                    'FAILONERROR' => TRUE,
                    'RETURNARRAY' => TRUE,
                    'ALLDATA' => FALSE
                ];

                $resultdata = $this->shopify->call($senddata);

                $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id], ['paid_plain' => "0", 'charge_id' => "", 'activate_date' => date('Y-m-d')]);

                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } elseif (strtolower($type) == "premium") {

                $chargdata = $this->Data_model->Get_data_one_column(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id], ['shop_id', 'shop']);


                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );



                $this->shopify = new Shopify($data);

                $postdata["recurring_application_charge"] = [
                    "name" => "Pro Plan",
                    "price" => "7.99",
                    "return_url" => $this->config->domain_url . "thfeed-admin/payment?shop=" . $this->shop . "&shop_id=" . $shop_id,
                    "trial_days" => (!empty($chargdata) ? "0" : "7"),
                    "test" => ((WORK_ON == 'LIVE') ? false : true)
                ];

//                $resultdat = $this->api_call($shopdata['token'], $shop, '/admin/api/2020-04/recurring_application_charges.json', $postdata, 'POST');
//                echo "<pre>";
//                print_r($resultdat);
//                die();

                $senddata = [
                    'METHOD' => 'POST',
                    'URL' => '/admin/api/2020-04/recurring_application_charges.json',
                    'HEADERS' => array(),
                    'DATA' => $postdata,
                    'FAILONERROR' => TRUE,
                    'RETURNARRAY' => TRUE,
                    'ALLDATA' => FALSE
                ];

                $resultdata = $this->shopify->call($senddata);
//                print_r($resultdata);
//                die;

                if ($resultdata['recurring_application_charge']) {

                    $chargsavedata = [
                        "charge_id" => $resultdata['recurring_application_charge']['id'],
                        "shop_id" => $shop_id,
                        "shop" => $this->shop,
                        "name" => $resultdata['recurring_application_charge']['name'],
                        "api_client_id" => $resultdata['recurring_application_charge']['api_client_id'],
                        "price" => $resultdata['recurring_application_charge']['price'],
                        "status" => $resultdata['recurring_application_charge']['status'],
                        "return_url" => $resultdata['recurring_application_charge']['return_url'],
                        "billing_on" => $resultdata['recurring_application_charge']['billing_on'],
                        "test" => $resultdata['recurring_application_charge']['test'],
                        "activated_on" => $resultdata['recurring_application_charge']['activated_on'],
                        "cancelled_on" => $resultdata['recurring_application_charge']['cancelled_on'],
                        "trial_days" => $resultdata['recurring_application_charge']['trial_days'],
                        "trial_ends_on" => $resultdata['recurring_application_charge']['trial_ends_on'],
                        "decorated_return_url" => $resultdata['recurring_application_charge']['decorated_return_url'],
                        "confirmation_url" => $resultdata['recurring_application_charge']['confirmation_url'],
                        "url_params" => http_build_query($url_params),
                    ];


                    if (!empty($chargdata)) {
                        $shop_id = $this->Data_model->Update_data(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id], $chargsavedata);
                    } else {
                        $this->Data_model->Insert_data(APPLICATION_CHARGE, $chargsavedata);
                    }

//                    die;
                    return $this->respond([
                                'status' => TRUE,
                                'confirmation_url' => $resultdata['recurring_application_charge']['confirmation_url']
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something Went wrong please contact support system",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Something Went wrong",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function getlistplain() {

        $shop_id = $this->request->getVar('shop_id');


        $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop', 'charge_id'));

        if (!empty($shopdata)) {



            $data = array(
                'API_KEY' => $this->config->shopify_api_key,
                'API_SECRET' => $this->config->shopify_secret,
                'SHOP_DOMAIN' => $this->shop,
                'ACCESS_TOKEN' => $shopdata['token']
            );
            $this->shopify = new Shopify($data);

            $senddata = [
                'METHOD' => 'GET',
                'URL' => "/admin/api/2020-04/recurring_application_charges.json",
                'HEADERS' => array(),
                'DATA' => array(),
                'FAILONERROR' => TRUE,
                'RETURNARRAY' => TRUE,
                'ALLDATA' => FALSE
            ];

            $resultdata = $this->shopify->call($senddata);



            return $this->respond([
                        'status' => TRUE,
                        'data' => $resultdata
                            ], Api::HTTP_OK);
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function activateplain() {

        $shop_id = $this->request->getVar('shop_id');
        $charge_id = $this->request->getVar('charge_id');


        if (!empty($charge_id) && !empty($this->shop) && !empty($shop_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('token', 'id', 'shop'));
            if (!empty($shopdata)) {


                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $this->shop,
                    'ACCESS_TOKEN' => $shopdata['token']
                );

                $this->shopify = new Shopify($data);

                $chargdata = $this->Data_model->Get_data_one(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id, "charge_id" => $charge_id]);
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

                        $this->Data_model->Update_data(APPLICATION_CHARGE, ['shop' => $this->shop, 'shop_id' => $shop_id, 'charge_id' => $charge_id], $resultdata['recurring_application_charge']);

                        $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id], ['paid_plain' => "1", 'charge_id' => $charge_id, 'activate_date' => date('Y-m-d')]);

                        return $this->respond([
                                    'status' => TRUE,
                                    'url_params' => $url_params
                                        ], Api::HTTP_OK);
                    } else {
                        return $this->respond([
                                    'status' => FALSE,
                                    'message' => "Something went wrong",
                                        ], Api::HTTP_BAD_REQUEST);
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Something went wrong",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Someting went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function checkplan() {

        $shop_id = $this->request->getVar('shop_id');
        if (!empty($shop_id) && !empty($this->shop)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'paid_plain' => "1", 'is_install' => '1'], ['shop', 'id', 'charge_id', 'paid_plain', 'is_install']);
            if (!empty($shopdata)) {
                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                                ], Api::HTTP_OK);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                            ], Api::HTTP_OK);
        }
    }

    public function getugcdata() {
        $shop_id = $this->request->getVar('shop_id');
        $after = $this->request->getVar('after');
        if (!empty($this->shop) && !empty($shop_id)) {
            $userlogindata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('login_with', 'id', 'shop'));
            if (!empty($userlogindata)) {
                $instadata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $userlogindata['id']], ['instagram_account_id', 'instagram_id', 'accesstoken']);

                if ($userlogindata['login_with'] == 'FACEBOOK') {

                    $id = $instadata['instagram_account_id'];

                    $sql = "SELECT GROUP_CONCAT(feed_main_id)as data FROM " . INSTA_FEED . " WHERE type='UGC' and shop_id='" . $shop_id . "' and instagram_account_id='" . $id . "'";

                    $existugcdata = $this->Data_model->Custome_query($sql);
                    if (!empty($existugcdata)) {
                        $existugcdata = explode(",", $existugcdata[0]['data']);
                    }

                    $url = "https://graph.facebook.com/" . $instadata['instagram_id'] . "/tags?fields=caption,id,media_url,username,timestamp,comments_count,like_count,media_type,permalink&limit=30&access_token=" . $instadata['accesstoken'];
                    if (!empty($after)) {
                        $url .= "&after=" . $after;
                    }
                    $userdata = $this->call_curl($url, "");
                    if (isset($userdata['data']) && !empty($userdata['data'])) {

                        $after = isset($userdata['paging']['cursors']['after']) ? $userdata['paging']['cursors']['after'] : "";

                        $userdata = array_map(function($arr) use ($id, $existugcdata) {

                            if (!empty($existugcdata)) {
                                if (in_array($arr['id'], $existugcdata)) {
                                    return $arr + ['instagram_id' => $id, 'is_check' => "1"];
                                } else {
                                    return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                                }
                            } else {
                                return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                            }
                        }, $userdata['data']);

                        if (!empty($userdata)) {
                            return $this->respond([
                                        'status' => TRUE,
                                        'data' => $userdata,
                                        'after' => $after,
                                            ], Api::HTTP_OK);
                        } else {
                            return $this->respond([
                                        'status' => FAlSE,
                                        'message' => "Sorry there is no Post which mentioning you recently so you can not add any post in your Shoppable Gallery.",
                                            ], Api::HTTP_OK);
                        }
                    } else {
                        return $this->respond([
                                    'status' => FAlSE,
                                    'message' => $userdata['error']['message'],
                                        ], Api::HTTP_OK);
                    }
                } elseif ($userlogindata['login_with'] == 'INSTAGRAM') {

                    return $this->respond([
                                'status' => FAlSE,
                                'message' => "Sorry you have connected your Personal Instagram account so we can not get User Generated Content for that account. So if you want UGC post then please login with Facebook.",
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FAlSE,
                                'message' => "Currently there is no account connected so please connect your account <a href='/approve-thfeed-admin/dashboard'>here.</a>",
                                    ], Api::HTTP_OK);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shope details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Someting went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function gallaryupdate() {

        $shop_id = $this->request->getVar("shop_id");
        $data = $this->request->getVar('data');
        $type = $this->request->getVar('type');

        if (!empty($this->shop) && !empty($shop_id) && !empty($data) && !empty($type)) {
            $userlogindata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('id'));
            if (!empty($userlogindata)) {

                $instafeeddata = [
                    'username' => isset($data['username']) ? $data['username'] : "",
                    'instagram_account_id' => $data['instagram_id'],
                    'shop_id' => $shop_id,
                    'caption' => isset($data['caption']) ? $data['caption'] : '',
                    'feed_main_id' => $data['id'],
                    'media_type' => $data['media_type'],
                    'media_url' => $data['media_url'],
                    'media_short_url' => $data['permalink'] . "media/?size=l",
                    'permalink' => $data['permalink'],
                    'like_count' => $data['like_count'],
                    'comments_count' => $data['comments_count'],
                    'shortcode' => isset($data['shortcode']) ? $data['shortcode'] : "",
                    'timestamp' => date('Y-m-d H:i:s', strtotime($data['timestamp'])),
                    'is_visible' => '1',
                    'type' => $type
                ];
                $feeddata = $this->Data_model->Get_data_one(INSTA_FEED, ['shop_id' => $shop_id, 'instagram_account_id' => $data['instagram_id'], 'feed_main_id' => $data['id'], 'type' => $type]);
                if (empty($feeddata)) {
                    $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                } else {
                    $true = $this->Data_model->Deleta_data(INSTA_FEED, ["shop_id" => $shop_id, "instagram_account_id" => $data['instagram_id'], "feed_main_id" => $data['id']]);
                }

                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shope details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Someting went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function supportmail() {

        $shop_id = $this->request->getVar("shop_id");
        $subject = $this->request->getVar("subject");
        $name = $this->request->getVar("name");
        $massage = $this->request->getVar("message");
        $fromemail = $this->request->getVar("email_id");

        if (!empty($this->shop) && !empty($shop_id) && !empty($massage) && !empty($fromemail) && !empty($subject) && !empty($name)) {
            $email = $this->email_val($fromemail);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

                return $this->respond([
                            'status' => FALSE,
                            'message' => "Please enter valid email id .",
                                ], Api::HTTP_BAD_REQUEST);
            } else {

                $html = $this->load->view('contactmail', $this->request->getVar(), true);
                $mail = sendMail($email, SUPPORT_MAIL, $subject, $html);
                if ($mail) {
                    return $this->respond([
                                'status' => TRUE,
                                'message' => "Request send successfully",
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Mail not send",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Someting went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function analystics() {

        $shop_id = $this->request->getVar("shop_id");
        $interval = $this->request->getVar("interval");

        if (!empty($this->shop) && !empty($shop_id)) {
            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('shop', 'id', 'paid_plain', 'charge_id'));
            if (!empty($shopdata)) {

                $sql = "SELECT x,gallaryviewcount,popupviewcount from(
                            SELECT 
                                    date(create_date) AS x
                                    ,  COUNT(CASE WHEN feed_id = 0  THEN 1 END) as gallaryviewcount
                                    ,  COUNT(CASE WHEN feed_id != 0  THEN 1 END) as popupviewcount
                                FROM " . ANALYSTICS . " where shop_id='" . $shop_id . "' and date(create_date) >= DATE_SUB(CURDATE(), INTERVAL " . $interval . " DAY) 
                                GROUP BY date(create_date)
                            UNION ALL
                            SELECT DATE(cal.date) as x,0 as gallaryviewcount,0 as popupviewcount
                             FROM (
                                   SELECT SUBDATE(NOW(), INTERVAL " . $interval . " DAY) + INTERVAL xc DAY AS date
                                   FROM (
                                         SELECT @xi:=@xi+1 as xc from
                                         (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) xc1,
                                         (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) xc2,
                                         (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) xc3,
                                         (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) xc4,
                                         (SELECT @xi:=-1) xc0
                                   ) xxc1
                             ) cal
                             WHERE cal.date <= NOW()
                        )as c GROUP BY x";

                $data['analyticsdata'] = $this->Data_model->Custome_query($sql);

                $data["total_count"] = $this->getcount($this->shop, $shop_id, $interval);

                return $this->respond([
                            'status' => TRUE,
                            'data' => $data
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function getpostlist() {

        $shop_id = $this->request->getVar('shop_id');
        if (!empty($this->shop) && !empty($shop_id)) {
            $sdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1', 'is_social_login' => '1'], array('id', 'is_social_login', 'login_with'));

            if (!empty($sdata)) {

                $existdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, "is_check" => '1'], [INSTAGRAM_ACCOUNT . '_id', 'accesstoken', 'shop_id', 'instagram_id', 'register_with']);

                if (!empty($existdata)) {

                    $return_url = '';

                    if ($existdata['register_with'] == "1") {
                        $url = "https://graph.instagram.com/" . $existdata['instagram_id'] . "?fields=id,username&access_token=" . $existdata['accesstoken'];

                        $userdata = $this->call_curl($url, "");

                        if (isset($userdata['username']) && !empty($userdata['username'])) {

                            $pagedata = [
                                'shop_id' => $shop_id,
                                'image_url' => isset($profile["graphql"]["user"]["profile_pic_url"]) ? $profile["graphql"]["user"]["profile_pic_url"] : "",
                                'name' => $userdata['username'],
                                'username' => $userdata['username'],
                                'media_count' => 0,
                            ];

                            $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, "instagram_id" => $existdata['instagram_id']], $pagedata);

                            $return_url = "https://graph.instagram.com/" . $existdata['instagram_id'] . "/media?fields=caption,media_type,media_url,timestamp,permalink&limit=50&access_token=" . $existdata['accesstoken'];


                            while ($return_url != '' && $return_url != null) {


                                $instadata = $this->call_curl($return_url, '');

                                if (isset($instadata['data'])) {
                                    foreach ($instadata['data'] as $in) {
                                        $instafeeddata = [
                                            'instagram_account_id' => $existdata[INSTAGRAM_ACCOUNT . '_id'],
                                            'shop_id' => $shop_id,
                                            'caption' => isset($in['caption']) ? $in['caption'] : '',
                                            'feed_main_id' => $in['id'],
                                            'media_type' => $in['media_type'],
                                            'media_url' => $in['media_url'],
                                            'media_short_url' => isset($in['permalink']) ? $in['permalink'] . "media/?size=l" : "",
                                            'permalink' => isset($in['permalink']) ? $in['permalink'] : "",
                                            'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                            'is_visible' => '1'
                                        ];

                                        $einstadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                        if (!empty($einstadata)) {
                                            $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $einstadata['insta_feed_id']], $instafeeddata);
                                        } else {
                                            $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                        }
                                    }

                                    if (!empty($instadata['paging']['next'])) {
                                        $return_url = $instadata['paging']['next'];
                                    } else {
                                        $return_url = '';
                                    }
                                } else {
                                    $return_url = '';
                                }
                            }

                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {

                            $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], ["is_refresh" => "0", 'reason' => $userdata['error']['message']]);

                            return $this->respond([
                                        'status' => FALSE,
                                        'error' => $userdata['error']
                                            ], Api::HTTP_OK);
                        }
                    } elseif ($existdata['register_with'] == "0") {



                        $url = "https://graph.facebook.com/v7.0/" . $existdata['instagram_id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $existdata['accesstoken'];

                        $instadata = $this->call_curl($url, '');

//                        $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($instadata);
//                        log_message('custom', "Instagram Data result:-" . $test_log);

                        if (isset($instadata['username']) && !empty($instadata['username'])) {

                            $pagedata = [
                                'shop_id' => $shop_id,
                                'instagram_id' => $existdata['instagram_id'],
                                'name' => $instadata['name'],
                                'username' => $instadata['username'],
                                'image_url' => $instadata['profile_picture_url'],
                                'media_count' => $instadata['media_count'],
                            ];

                            $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'instagram_id' => $existdata['instagram_id']], $pagedata);

                            $total_pages = ceil($instadata['media_count'] / 50);
                            $page_count = $total_pages;

                            $return_url = "https://graph.facebook.com/v7.0/" . $existdata['instagram_id'] . "/media?fields=caption,like_count,media_type,media_url,permalink,shortcode,timestamp,comments_count,is_comment_enabled&limit=50&access_token=" . $existdata['accesstoken'];

                            while ($return_url != '' && $return_url != null) {

                                $instadata = $this->call_curl($return_url, '');

                                if (isset($instadata['data'])) {

                                    foreach ($instadata['data'] as $in) {
                                        $instafeeddata = [
                                            'instagram_account_id' => $existdata[INSTAGRAM_ACCOUNT . '_id'],
                                            'shop_id' => $shop_id,
                                            'caption' => isset($in['caption']) ? $in['caption'] : '',
                                            'feed_main_id' => $in['id'],
                                            'media_type' => $in['media_type'],
                                            'media_url' => $in['media_url'],
                                            'media_short_url' => $in['permalink'] . "media/?size=l",
                                            'permalink' => $in['permalink'],
                                            'like_count' => $in['like_count'],
                                            'comments_count' => $in['comments_count'],
                                            'shortcode' => $in['shortcode'],
                                            'is_comment_enabled' => $in['is_comment_enabled'],
                                            'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                            'is_visible' => '1'
                                        ];

                                        $einstadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));

                                        if (!empty($einstadata)) {
                                            $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $einstadata['insta_feed_id']], $instafeeddata);
                                        } else {
                                            $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                        }
                                    }

                                    if (!empty($instadata['paging']['next'])) {
                                        $return_url = $instadata['paging']['next'];
                                    } else {
                                        $return_url = '';
                                    }
                                } else {
                                    return $this->respond([
                                                'status' => FALSE,
                                                'error' => $instadata
                                                    ], Api::HTTP_BAD_REQUEST);
                                }
                            }

                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {

                            $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], ["is_refresh" => "0", 'reason' => $userdata['error']['message']]);

                            return $this->respond([
                                        'status' => FALSE,
                                        'error' => $instadata['error']
                                            ], Api::HTTP_OK);
                        }
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Please select page or account",
                                    ], Api::HTTP_OK);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop id is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function deleteembed() {
        $shop_id = $this->request->getVar('shop_id');
        $embed_code_id = $this->request->getVar('embed_code_id');
        if (!empty($this->shop) && !empty($shop_id) && !empty($embed_code_id)) {
            $sdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('id'));
            if (!empty($sdata)) {
                $this->Data_model->Deleta_data(EMBDED_CODE, ['shop_id' => $shop_id, 'embed_code_id' => $embed_code_id, 'shop' => $this->shop]);
                return $this->respond([
                            'status' => TRUE,
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop id is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function layoutlist() {
//        
        $sql = "select insta_layout_id,title,sub_titile,image,pro,status,type from " . INSTA_LAYOUT . " where status='1' order by pro asc";
//      $data = $this->Data_model->Get_data_all_columns(INSTA_LAYOUT, ['status' => '1'], ['insta_layout_id', 'title', 'sub_titile', 'image', 'pro', 'status', 'type']);
        $data = $this->Data_model->Custome_query($sql);
        return $this->respond([
                    'status' => TRUE,
                    'data' => $data
                        ], Api::HTTP_OK);
    }

    public function layoutupdate() {

        $shop_id = $this->request->getVar("shop_id");
        $uniq_id = $this->request->getVar('uniq_id');
        $insta_layout_id = $this->request->getVar('insta_layout_id');
        $id = $this->request->getVar('id');

        if (!empty($this->shop) && !empty($shop_id) && !empty($insta_layout_id) && !empty($id)) {

            $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1'], array('shop', 'id', 'paid_plain', 'charge_id'));

            if (!empty($shopdata)) {

                $layoutdata = $this->Data_model->Get_data_one(INSTA_LAYOUT, ['insta_layout_id' => $insta_layout_id, 'status' => '1']);

                if (!empty($layoutdata)) {

                    if ($layoutdata['type'] == '1') {
                        $updata = [
                            'insta_layout_id' => $layoutdata['insta_layout_id'],
                            'display_type' => $layoutdata['type'],
                            'cell_size' => $layoutdata['no_of_column'],
                            'ul_class' => $layoutdata['class'],
                            'mobile_ul_class' => $layoutdata['mobile_class'],
                            'layout_icon' => $layoutdata['image'],
                            'slider_limit' => ($layoutdata['no_of_column'] * 2),
                        ];
                    } else {
                        $updata = [
                            'insta_layout_id' => $layoutdata['insta_layout_id'],
                            'no_of_column' => $layoutdata['no_of_column'],
                            'no_of_rows' => $layoutdata['no_of_rows'],
                            'mobile_no_of_column' => $layoutdata['mobile_no_of_column'],
                            'mobile_no_of_rows' => $layoutdata['mobile_no_of_rows'],
                            'ul_class' => $layoutdata['class'],
                            'mobile_ul_class' => $layoutdata['mobile_class'],
                            'layout_icon' => $layoutdata['image'],
                            'layout_type' => $layoutdata['pro'],
                            'display_type' => $layoutdata['type']
                        ];
                    }
                    if (!empty($uniq_id)) {
                        $this->Data_model->Update_data(GALLARY_SETTINGS, ['shop' => $this->shop, 'uniq_id' => $uniq_id, 'gallary_setting_id' => $id, 'shop_id' => $shop_id], $updata);
                    } else {
                        $this->Data_model->Update_data(PRODUCT_GALLARY, ['shop' => $this->shop, 'product_gallary_id' => $id, 'shop_id' => $shop_id], $updata);
                    }
                    return $this->respond([
                                'status' => TRUE,
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Layout id is invalid",
                                    ], Api::HTTP_BAD_REQUEST);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop details is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function hashtag() {
        $shop_id = $this->request->getVar('shop_id');
        $hashtag = $this->request->getVar('hashtag');
        $media_type = $this->request->getVar('media_type');
        if (!empty($shop_id) && !empty($this->shop) && !empty($hashtag)) {
            if (empty($media_type)) {
                $media_type = "recent_media";
            }

            $existdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'register_with' => '0'], array('instagram_account_id', 'shop_id', 'instagram_id', 'accesstoken', 'register_with'));

            if (!empty($existdata)) {

                $url = "https://graph.facebook.com/v7.0/ig_hashtag_search?user_id=" . $existdata['instagram_id'] . "&q=" . str_replace("#", "", $hashtag) . "&access_token=" . $existdata['accesstoken'];
                $hashdata = $this->call_curl($url, '');

                $hash = [];
                $next = '';

                if (isset($hashdata['data']) && !empty($hashdata['data'])) {

                    foreach ($hashdata['data'] as $h) {
                        $url = "https://graph.facebook.com/v7.0/" . $h['id'] . "/$media_type?fields=caption,like_count,media_type,media_url,permalink,timestamp,comments_count&user_id=" . $existdata['instagram_id'] . "&limit=30&access_token=" . $existdata['accesstoken'];

                        $hashdatas = $this->call_curl($url, '');

                        if (isset($hashdatas['data']) && !empty($hashdatas['data'])) {
                            $hash = array_merge($hash, $hashdatas['data']);
                            $next = isset($hashdatas['paging']['next']) ? $hashdatas['paging']['next'] : "";
                        } else {
                            return $this->respond([
                                        'status' => FALSE,
                                        'message' => "No data found"
                                            ], Api::HTTP_OK);
                        }
                    }

                    $id = $existdata['instagram_account_id'];

                    $sql = "SELECT GROUP_CONCAT(feed_main_id)as data FROM " . INSTA_FEED . " WHERE type='HASH' and shop_id='" . $shop_id . "' and instagram_account_id='" . $id . "'";

                    $existhashdata = $this->Data_model->Custome_query($sql);
                    if (!empty($existhashdata)) {
                        $existhashdata = explode(",", $existhashdata[0]['data']);
                    }

                    $hash = array_map(function($arr) use ($id, $existhashdata) {
                        if (isset($arr['media_url'])) {
                            if (!empty($existhashdata)) {
                                if (in_array($arr['id'], $existhashdata)) {
                                    return $arr + ['instagram_id' => $id, 'is_check' => "1"];
                                } else {
                                    return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                                }
                            } else {
                                return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                            }
                        }
                    }, $hash);

                    $hash = array_values(array_filter($hash));

                    return $this->respond([
                                'status' => TRUE,
                                'data' => $hash,
                                'next' => $next
                                    ], Api::HTTP_OK);
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => $hashdata['error']['message'],
                                    ], Api::HTTP_OK);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "shop is invlid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went Wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    public function pagehashtag() {

        $shop_id = $this->request->getVar('shop_id');
        $url = $this->request->getVar('url');

        if (!empty($shop_id) && !empty($this->shop) && !empty($url)) {
            $hash = [];
            $hashdatas = $this->call_curl($url, '');
            $next = '';
            if (isset($hashdatas['data']) && !empty($hashdatas['data'])) {

                $existdata = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'register_with' => '0'], array('instagram_account_id', 'shop_id', 'instagram_id', 'accesstoken', 'register_with'));
                $id = $existdata['instagram_account_id'];


                $next = isset($hashdatas['paging']['next']) ? $hashdatas['paging']['next'] : "";

                $hash = array_merge($hash, $hashdatas['data']);

                $sql = "SELECT GROUP_CONCAT(feed_main_id)as data FROM " . INSTA_FEED . " WHERE type='HASH' and shop_id='" . $shop_id . "' and instagram_account_id='" . $id . "'";

                $existhashdata = $this->Data_model->Custome_query($sql);
                if (!empty($existhashdata)) {
                    $existhashdata = explode(",", $existhashdata[0]['data']);
                }

                $hash = array_map(function($arr) use ($id, $existhashdata) {
                    if (isset($arr['media_url'])) {
                        if (!empty($existhashdata)) {
                            if (in_array($arr['id'], $existhashdata)) {
                                return $arr + ['instagram_id' => $id, 'is_check' => "1"];
                            } else {
                                return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                            }
                        } else {
                            return $arr + ['instagram_id' => $id, 'is_check' => "0"];
                        }
                    }
                }, $hash);

                $hash = array_values(array_filter($hash));

                return $this->respond([
                            'status' => TRUE,
                            'data' => $hash,
                            'next' => $next
                                ], Api::HTTP_OK);
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => $hashdatas['message']
                                ], Api::HTTP_OK);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something Went Wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

    private function getcount($shop, $shop_id, $interval) {
        $sql = "SELECT  COUNT(CASE WHEN feed_id = 0 THEN 1 END) AS gallarycount,
                        COUNT(CASE WHEN feed_id != 0 THEN 1 END) AS poupcount,
                        COUNT(CASE WHEN click_feed = '1' THEN 1 END) AS clickcount,
                        COUNT(CASE WHEN type = 'GV' and feed_id = 0 THEN 1 END) AS Gallaryviewcount,
                        COUNT(CASE WHEN type = 'PV' and feed_id = 0 THEN 1 END) AS Productviewcount
                   FROM " . ANALYSTICS . " where shop='" . $shop . "' and shop_id='" . $shop_id . "' and  date(create_date) >= DATE_SUB(CURDATE(), INTERVAL " . $interval . " DAY) group by shop_id";

        $data = $this->Data_model->Custome_query($sql);
        return !empty($data) ? $data[0] : ["gallarycount" => 0, "poupcount" => 0, "clickcount" => 0, "Gallaryviewcount" => 0, "Productviewcount" => 0];
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

    private function call_curl($url, $data) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        if (!empty($data)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result, true);
    }

    private function callpic_curl($url) {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Cookie: csrftoken=9UPsGMNDY9UFTuCqEZyzOcQtovY3P8KR; ig_did=84EAFE42-9F0C-4F81-AE66-6309A993F3E2; mid=XucdlwAEAAF2E5GlEt36iTgTAByP; rur=ASH; urlgen=\"{\\\"49.36.65.191\\\": 55836}:1jyu39:Sv9oT7G2zTXMWm2AhQpxPVVdZKU\""
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }

    private function hmac_validate($data) {


        // Retrieve HMAC request parameter

        if (!empty($data['hmac'])) {
            $hmac = $data['hmac'];
            $shared_secret = $this->config->shopify_secret;

            // Retrieve all request parameters
            $params = array_diff_key($data, array('hmac' => '')); // Remove hmac from params

            ksort($params); // Sort params lexographically

            $computed_hmac = hash_hmac('sha256', http_build_query($params), utf8_encode($shared_secret));

            if (hash_equals($hmac, $computed_hmac)) {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }

    private function api_call($token, $shop, $api_endpoint, $query = array(), $method = 'GET', $request_headers = array()) {
        $url = "https://" . $shop . $api_endpoint;
        if (!empty($query) && !is_null($query) && in_array($method, array('GET', 'DELETE'))) {
            $url = $url . "?" . http_build_query($query);
        } else {
            $url = $url;
        }
        // Configure cURL
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, TRUE);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($curl, CURLOPT_MAXREDIRS, 3);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_USERAGENT, 'My New Shopify App v.1');
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_HEADERFUNCTION, function($curl, $header) use (&$headers) {
            $len = strlen($header);
            $header = explode(':', $header, 2);
            if (count($header) < 2) // ignore invalid headers
                return $len;
            $headers[strtolower(trim($header[0]))] = trim($header[1]);
            return $len;
        }
        );
        $request_headers[] = "";
        if (!is_null($token))
            $request_headers[] = "X-Shopify-Access-Token: " . $token;
        curl_setopt($curl, CURLOPT_HTTPHEADER, $request_headers);
        if ($method != 'GET' && in_array($method, array('POST', 'PUT'))) {
            if (is_array($query))
                $query = http_build_query($query);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $query);
        }

        $response = curl_exec($curl);
        $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
        //$header = substr($response, 0, $header_size);
        $body = substr($response, $header_size);

        $error_number = curl_errno($curl);
        $error_message = curl_error($curl);
        curl_close($curl);
        /**
         *  Return an error is cURL has a problem
         */
        if ($error_number) {
            return $error_message;
        } else {
            return array('headers' => $headers, 'response' => $body);
        }
    }

    public function cretaewebhooks() {




        $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['is_install' => "1"], array('id', 'shop', 'token'));
        if (!empty($existdata)) {
            $accessToken = $existdata['token'];

            $shop_update = array("webhook" => array("topic" => "app/uninstalled", "address" => base_url('uninstall') . "?shop=" . $shop, "format" => "json"));
            $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


            $shop_update = array("webhook" => array("topic" => "shop/update", "address" => base_url('shopupdate') . "?shop=" . $shop, "format" => "json"));
            $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


            $shop_update = array("webhook" => array("topic" => "products/update", "address" => base_url('productupdate') . "?shop=" . $shop, "format" => "json"));
            $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);


            $shop_update = array("webhook" => array("topic" => "products/delete", "address" => base_url('deletproduct') . "?shop=" . $shop, "format" => "json"));
            $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);
//
//                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
//                log_message('custom', "result:-" . $test_log);
//
//                $test_log = "\n---------Shop_id------------\n" . $shop_id;
//                log_message('custom', "result:-" . $test_log);
        }
    }

    public function getinfo() {
        echo phpinfo();
    }

    private function refreshdata($shop_id) {

        if (!empty($this->shop) && !empty($shop_id)) {

            $sdata = $this->datamodel->Get_data_one_column(SHOP_SETTINGS, ['shop' => $this->shop, 'id' => $shop_id, 'is_install' => '1', 'is_social_login' => '1'], array('id', 'is_social_login', 'login_with'));

            if (!empty($sdata)) {

                $existdata = $this->datamodel->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, "is_check" => '1'], [INSTAGRAM_ACCOUNT . '_id', 'accesstoken', 'shop_id', 'instagram_id', 'register_with']);

                if (!empty($existdata)) {

                    $return_url = '';

                    if ($existdata['register_with'] == "1") {
                        $url = "https://graph.instagram.com/" . $existdata['instagram_id'] . "?fields=id,ig_id,username,media_count&access_token=" . $existdata['accesstoken'];

                        $userdata = $this->call_curl($url, "");

                        if (isset($userdata['username']) && !empty($userdata['username'])) {

                            $pagedata = [
                                'shop_id' => $shop_id,
                                'image_url' => isset($profile["graphql"]["user"]["profile_pic_url"]) ? $profile["graphql"]["user"]["profile_pic_url"] : "",
                                'name' => $userdata['username'],
                                'username' => $userdata['username'],
                                'media_count' => $userdata['media_count'],
                            ];

                            $this->datamodel->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, "instagram_id" => $existdata['instagram_id']], $pagedata);

                            $total_pages = ceil($userdata['media_count'] / 50);


                            while ($total_pages > 0) {

                                if ($return_url != '' && $return_url != null) {
                                    $url = $return_url;
                                } else {
                                    $url = "https://graph.instagram.com/" . $existdata['instagram_id'] . "/media?fields=caption,media_type,media_url,permalink,timestamp&limit=50&access_token=" . $existdata['accesstoken'];
                                }
                                $instadata = $this->call_curl($url, '');


                                foreach ($instadata['data'] as $in) {
                                    $instafeeddata = [
                                        'instagram_account_id' => $existdata[INSTAGRAM_ACCOUNT . '_id'],
                                        'shop_id' => $shop_id,
                                        'caption' => isset($in['caption']) ? $in['caption'] : '',
                                        'feed_main_id' => $in['id'],
                                        'media_type' => $in['media_type'],
                                        'media_url' => $in['media_url'],
                                        'media_short_url' => $in['permalink'] . "media/?size=l",
                                        'permalink' => $in['permalink'],
                                        'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                        'is_visible' => '1'
                                    ];

                                    $instadata = $this->datamodel->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                    if (!empty($instadata)) {
                                        $this->datamodel->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $instadata['insta_feed_id']], $instafeeddata);
                                    } else {
                                        $this->datamodel->Insert_data(INSTA_FEED, $instafeeddata);
                                    }
                                }

                                if (!empty($instadata['paging']['next'])) {
                                    $return_url = $instadata['paging']['next'];
                                } else {
                                    $return_url = '';
                                }
                                $total_pages--;
                            }

                            return $this->respond([
                                        'status' => TRUE,
                                            ], Api::HTTP_OK);
                        } else {

                            $this->datamodel->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id], ["is_refresh" => "0", 'reason' => $userdata['error']['message']]);

                            return $this->respond([
                                        'status' => FALSE,
                                        'error' => $userdata['error']
                                            ], Api::HTTP_OK);
                        }
                    } elseif ($existdata['register_with'] == "0") {



                        $url = "https://graph.facebook.com/v7.0/" . $existdata['instagram_id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $existdata['accesstoken'];

                        $instadata = $this->call_curl($url, '');

                        $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($instadata);
                        log_message('custom', "Instagram Data result:-" . $test_log);


                        $pagedata = [
                            'shop_id' => $shop_id,
                            'instagram_id' => $existdata['instagram_id'],
                            'name' => $instadata['name'],
                            'username' => $instadata['username'],
                            'image_url' => $instadata['profile_picture_url'],
                            'media_count' => $instadata['media_count'],
                        ];

                        $this->datamodel->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $shop_id, 'instagram_id' => $existdata['instagram_id']], $pagedata);

                        $total_pages = ceil($instadata['media_count'] / 50);
                        $page_count = $total_pages;
                        while ($page_count > 0) {

                            if ($return_url != '' && $return_url != null) {
                                $url = $return_url;
                            } else {
                                $url = "https://graph.facebook.com/v7.0/" . $existdata['instagram_id'] . "/media?fields=caption,like_count,media_type,media_url,permalink,shortcode,timestamp,comments_count,is_comment_enabled&limit=50&access_token=" . $existdata['accesstoken'];
                            }

                            $instadata = $this->call_curl($url, '');


                            foreach ($instadata['data'] as $in) {
                                $instafeeddata = [
                                    'instagram_account_id' => $existdata[INSTAGRAM_ACCOUNT . '_id'],
                                    'shop_id' => $shop_id,
                                    'caption' => isset($in['caption']) ? $in['caption'] : '',
                                    'feed_main_id' => $in['id'],
                                    'media_type' => $in['media_type'],
                                    'media_url' => $in['media_url'],
                                    'media_short_url' => $in['permalink'] . "media/?size=l",
                                    'permalink' => $in['permalink'],
                                    'like_count' => $in['like_count'],
                                    'comments_count' => $in['comments_count'],
                                    'shortcode' => $in['shortcode'],
                                    'is_comment_enabled' => $in['is_comment_enabled'],
                                    'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                    'is_visible' => '1'
                                ];

                                $instadata = $this->datamodel->Get_data_one_column(INSTA_FEED, ['shop_id' => $shop_id, 'feed_main_id' => $in['id']], array('insta_feed_id'));

                                if (!empty($instadata)) {
                                    $this->datamodel->Update_data(INSTA_FEED, ['shop_id' => $shop_id, "insta_feed_id" => $instadata['insta_feed_id']], $instafeeddata);
                                } else {
                                    $this->datamodel->Insert_data(INSTA_FEED, $instafeeddata);
                                }
                            }

                            if (!empty($instadata['paging']['next'])) {
                                $return_url = $instadata['paging']['next'];
                            } else {
                                $return_url = '';
                            }
                            $page_count--;
                        }
                        return true;
                    }
                } else {
                    return $this->respond([
                                'status' => FALSE,
                                'message' => "Please select page or account",
                                    ], Api::HTTP_OK);
                }
            } else {
                return $this->respond([
                            'status' => FALSE,
                            'message' => "Shop id is invalid",
                                ], Api::HTTP_BAD_REQUEST);
            }
        } else {
            return $this->respond([
                        'status' => FALSE,
                        'message' => "Something went wrong",
                            ], Api::HTTP_BAD_REQUEST);
        }
    }

}
