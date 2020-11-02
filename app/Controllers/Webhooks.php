<?php

namespace App\Controllers;

use App\Models\Data_model;

class Webhooks extends BaseController {

    private $shopify;
    private $Data_model;

    public function __construct() {
        $db = db_connect();
        $this->Data_model = new Data_model($db);
        helper("custome");
    }

    public function uninstall() {
        $response_data = file_get_contents('php://input');
        $shop = $this->request->getVar("shop");
        $data = (array) json_decode($response_data);

        log_message("custom", "Uninstall shop:-" . $shop . $response_data);
        if (!empty($shop)) {
            log_message("custom", "Uninstall with shop" . $response_data);
            $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $shop], ['is_install' => "0", "is_social_login" => "0", "login_with" => "", 'paid_plain' => "0"]);
            $existdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], ['id', 'shop', 'store_email']);
            if (!empty($existdata)) {

                $this->Data_model->Deleta_data(EMBDED_CODE, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
                $this->Data_model->Deleta_data(GALLARY_SETTINGS, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
                $this->Data_model->Deleta_data(PRODUCT_GALLARY, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
                $this->Data_model->Deleta_data(FACEBOOK, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
                $this->Data_model->Deleta_data(FACEBOOK_PAGE, ["shop_id" => $existdata['id']]);
                $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ["shop_id" => $existdata['id']]);
                $this->Data_model->Deleta_data(INSTA_FEED, ["shop_id" => $existdata['id']]);
                $this->Data_model->Deleta_data(ANALYSTICS, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
                $this->Data_model->Deleta_data(APPLICATION_CHARGE, ["shop_id" => $existdata['id']]);
            }
            $html = '<html>
                            <head>
                                <title>InstaPlus</title>
                            </head>
                            <body>
                                <p style=""><b style="">Dear Instaplus Users,</b></p>
                                <p style="">We are extremely apologetic for the inconvenience that our application didn\'t match your business goal.&nbsp;</p>
                                <p style="">We would love to know the exact reason that makes you uninstall Instaplus application and we are requesting you to install Instaplus application once again. We promise to resolve your any doubt immediately.&nbsp;&nbsp;</p>
                                <p style="">We really appreciate your business and your market goal so we do not want to miss the chance to be part of your success story. Our agile team is working very hard each and every day to make our application better and to satisfy your business goal.</p>
                                <p style="">If there are any other issues that need to be addressed, please don’t hesitate to contact us at&nbsp;<a data-is-link="mailto:support@thimatic.com" class="textEditor-link" href="mailto:support@thimatic.com" rel="noreferrer nofollow" target="_blank" style="cursor: pointer;"><b>support@thimatic.com</b></a>. Our technical service agents are always glad to help you.</p>
                                <p style=""><b>Sincerely,</b>
                                    <br><b>Instaplus App Team</b></p>
                            </body>
                        </html>';
            $mail = sendMail(SUPPORT_MAIL, $existdata['store_email'], "Apology to Instaplus Shopify App Users!", $html);

            echo json_encode(array("status" => 200));
        }
    }

    public function chargedata() {
        $response_data = file_get_contents('php://input');
        $shop = $this->request->getVar("shop");
        $data = (array) json_decode($response_data);
        log_message("custom", "Plain Buy" . $response_data);
    }

    public function shopupdate() {
        echo json_encode(array("status" => 200));
    }

    public function product() {

        $response_data = file_get_contents('php://input');
        $shop = $this->request->getVar("shop");
        $data = (array) json_decode($response_data);
        if (!empty($data)) {
            $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop, "is_install" => "1"]);
            if (!empty($existdata)) {

                $productDetails = array(
                    "shop_id" => $existdata['id'],
                    "shopify_product_id" => $data['id'],
                    "shopify_handle_name" => $data['handle'],
                    'product_name' => $data['title'],
                    'product_description' => strip_tags($data['body_html']),
                    'list_price' => (isset($data['variants'][0]->compare_at_price) ? $data['variants'][0]->compare_at_price : 0),
                    'selling_price' => (isset($data['variants'][0]->price) ? $data['variants'][0]->price : 0),
                    'status' => 'A',
                    'create_date' => date('Y-m-d H:i:s'),
                    'modify_date' => date('Y-m-d H:i:s', strtotime($data['updated_at'])),
                );

                $existproductdata = $this->Data_model->Get_data_one(PRODUCT, ['shopify_product_id' => $data['id'], 'shop_id' => $existdata['id']]);

                if (!empty($existproductdata)) {

                    $productDetails['product_image'] = $data['images'][0]->src;

                    $this->Data_model->Update_data(PRODUCT, ['shop_id' => $existdata['id'], 'shopify_product_id' => $data['id']], $productDetails);
                }
                echo json_encode(array("status" => 200));
            } else {
                echo json_encode(array("status" => 200));
            }
        } else {
            echo json_encode(array("status" => 200));
        }
    }

    public function deletproduct() {
        $response_data = file_get_contents('php://input');
        $shop = $this->request->getVar("shop");
        $data = (array) json_decode($response_data);

        $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop]);
        if (!empty($existdata)) {
            $productdata = $this->Data_model->Get_data_one(PRODUCT, ['shop_id' => $existdata['id'], 'shopify_product_id' => $data['id']]);
            if (!empty($productdata)) {
                $true = $this->Data_model->Deleta_data(PRODUCT, ["shop_id" => $shop_id, PRODUCT . "_id" => $productdata[PRODUCT . "_id"], "shopify_product_id" => $data['id']]);
                if ($true) {
                    $this->Data_model->Deleta_data(TAG_PRODUCT, ["shop_id" => $existdata['id'], PRODUCT . "_id" => $productdata[PRODUCT . "_id"]]);
                    echo json_encode(array("status" => 200));
                } else {
                    echo json_encode(array("status" => 200));
                }
            }
        }
    }

    public function deletestore() {
        $response_data = file_get_contents('php://input');
        $shop = $this->request->getVar("shop");
        $data = (array) json_decode($response_data);
        log_message("custom", "Product Delete Data" . $response_data);

        $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $data[
            'shop']]);
        if (!empty($existdata)) {

            $this->Data_model->Deleta_data(EMBDED_CODE, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(GALLARY_SETTINGS, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(PRODUCT_GALLARY, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(FACEBOOK, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(FACEBOOK_PAGE, ["shop_id" => $existdata['id']]);
            $this->Data_model->Deleta_data(INSTAGRAM_ACCOUNT, ["shop_id" => $existdata['id']]);
            $this->Data_model->Deleta_data(INSTA_FEED, ["shop_id" => $existdata['id']]);
            $this->Data_model->Deleta_data(ANALYSTICS, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(SHOP_SCRIPT_TAG, ["shop_id" => $existdata['id'], 'shop' => $existdata['shop']]);
            $this->Data_model->Deleta_data(APPLICATION_CHARGE, ["shop_id" => $existdata['id']]);
            $this->Data_model->Deleta_data(PRODUCT, ["shop_id" => $existdata['id']]);
            $this->Data_model->Deleta_data(PRODUCT_IMAGES, ["shop_id" => $existdata['id']]);

            echo json_encode(array("status" => 200));
        }
    }

    public function customer() {
        echo json_encode(array("status" => 200));
    }

    public function cronpost() {

        $sql = "SELECT instagram_account_id,instagram_id,shop_id,facebook_id,accesstoken,register_with,ss.is_social_login,ss.login_with,ss.shop,ss.id,media_count FROM instagram_account 
                           INNER JOIN shop_setting as ss on ss.id=instagram_account.shop_id
                           WHERE  ss.is_install='1' and instagram_account.is_refresh='1' and ss.is_social_login='1'";

        $sdata = $this->Data_model->Custome_query($sql);

        if (!empty($sdata)) {

            foreach ($sdata as $sd) {


                if ($sd['register_with'] == "1") {

                    $url = "https://graph.instagram.com/" . $sd['instagram_id'] . "?fields=id,ig_id,username,media_count&access_token=" . $sd['accesstoken'];

                    $userdata = $this->call_curl($url, "");

                    if (!empty($userdata['id'])) {

                        $pagedata = [
                            'shop_id' => $sd['id'],
                            'image_url' => isset($profile["graphql"]["user"]["profile_pic_url"]) ? $profile["graphql"]["user"]["profile_pic_url"] : "",
                            'name' => $userdata['username'],
                            'username' => $userdata['username'],
                            'media_count' => $userdata['media_count'],
                        ];

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], "instagram_id" => $sd['instagram_id']], $pagedata);

                        $total_pages = ceil($userdata['media_count'] / 50);
                        $return_url = '';

                        while ($total_pages > 0) {

                            if ($return_url != '' && $return_url != null) {
                                $url = $return_url;
                            } else {
                                echo $url = "https://graph.instagram.com/" . $sd['instagram_id'] . "/media?fields=caption,media_type,media_url,permalink,timestamp&limit=50&access_token=" . $sd['accesstoken'];
                            }

                            $instadata = $this->call_curl($url, '');

                            if (isset($instadata['data'])) {
                                foreach ($instadata['data'] as $in) {
                                    if (isset($in['media_url'])) {
                                        $instafeeddata = [
                                            'instagram_account_id' => $sd[INSTAGRAM_ACCOUNT . '_id'],
                                            'shop_id' => $sd['id'],
                                            'caption' => isset($in['caption']) ? $in['caption'] : '',
                                            'feed_main_id' => $in['id'],
                                            'media_type' => $in['media_type'],
                                            'media_url' => $in['media_url'],
                                            'media_short_url' => $in['permalink'] . "media/?size=l",
                                            'permalink' => $in['permalink'],
                                            'timestamp' => date('Y-m-d H:i:s', strtotime($in['timestamp'])),
                                            'is_visible' => '1'
                                        ];

                                        $instadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id'], 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                        if (!empty($instadata)) {
                                            $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id'], "insta_feed_id" => $instadata['insta_feed_id']], $instafeeddata);
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
                                $total_pages--;
                            } else {
                                $total_pages = 0;
                            }
                        }
                    }
                } elseif ($sd['register_with'] == "0") {

                    $url = "https://graph.facebook.com/v7.0/" . $sd['instagram_id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $sd['accesstoken'];

                    $facedata = $this->call_curl($url, '');

                    $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($facedata);
                    log_message('custom', "Instagram Data result:-" . $test_log);

                    if ($facedata['media_count'] > $sd['media_count']) {

                        $limit = $facedata['media_count'] - $sd['media_count'];

                        $pagedata = [
                            'shop_id' => $sd['id'],
                            'instagram_id' => $sd['instagram_id'],
                            'name' => $facedata['name'],
                            'username' => $facedata['username'],
                            'image_url' => $facedata['profile_picture_url'],
                            'media_count' => $facedata['media_count'],
                        ];

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], 'instagram_id' => $sd['instagram_id']], $pagedata);

                        $url = "https://graph.facebook.com/v7.0/" . $sd['instagram_id'] . "/media?fields=caption,like_count,media_type,media_url,permalink,shortcode,timestamp,comments_count,is_comment_enabled&limit=$limit&access_token=" . $sd['accesstoken'];

                        $instadata = $this->call_curl($url, '');

                        if (isset($instadata['data'])) {

                            foreach ($instadata['data'] as $in) {

                                if (isset($in['media_url']) && !empty($in['media_url'])) {

                                    $instafeeddata = [
                                        'instagram_account_id' => $sd[INSTAGRAM_ACCOUNT . '_id'],
                                        'shop_id' => $sd['id'],
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

                                    $instadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id'], 'feed_main_id' => $in['id']], array('insta_feed_id'));

                                    if (!empty($instadata)) {
                                        $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id'], "insta_feed_id" => $instadata['insta_feed_id']], $instafeeddata);
                                    } else {
                                        $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            echo json_encode(array("success" => 1));
        }
    }

    public function refreshtoken() {

        $sql = "SELECT instagram_account_id,shop_id,facebook_id,accesstoken,expires_in,register_with,ss.is_social_login,ss.login_with,ss.shop,ss.id FROM instagram_account 
                        INNER JOIN shop_setting as ss on ss.id=instagram_account.shop_id
                        WHERE  ss.is_install='1' and ss.is_social_login='1'";

        $sdata = $this->Data_model->Custome_query($sql);

        if (!empty($sdata)) {
            $ids = '';
            foreach ($sdata as $sd) {

                if ($sd['register_with'] == "1") {

                    $url = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=" . $sd['accesstoken'];
                    $authtoken = $this->call_curl($url, "");
                    if (isset($authtoken['access_token'])) {

                        $date = new DateTime();
                        $date->add(new DateInterval('PT' . $authtoken['expires_in'] . 'S'));

                        $updata = [
                            'accesstoken' => $authtoken['access_token'],
                            'token_type' => $authtoken['token_type'],
                            'expires_in' => $authtoken['expires_in'],
                            'expired_date' => $date->format('Y-m-d'),
                            'is_refresh' => 1
                        ];

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], $updata);
                    } else {

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], ['is_refresh' => 0, "reason" => $authtoken['error']['message']]);
                    }
                } else if ($sd['register_with'] == "0" && !empty($sd['expires_in'])) {


                    $url = "https://graph.facebook.com/v7.0/oauth/access_token?grant_type=fb_exchange_token&client_id=" . FACE_CLIENT_ID . "&client_secret=" . FACE_SECRET_KEY . "&fb_exchange_token=" . $sd['accesstoken'];

                    $outhtoken = $this->call_curl($url, '');
                    if (isset($outhtoken['access_token'])) {
                        if (isset($outhtoken['expires_in']) && !empty($outhtoken['expires_in'])) {
                            $date = new DateTime();
                            $date->add(new DateInterval('PT' . $outhtoken['expires_in'] . 'S'));
                            $expireddate = $date->format('Y-m-d');
                        } else {
                            $expireddate = "";
                        }

                        $updata = [
                            'accesstoken' => $outhtoken['access_token'],
                            'token_type' => $outhtoken['token_type'],
                            'expires_in' => isset($outhtoken['expires_in']) ? $outhtoken['expires_in'] : 0,
                            'expired_date' => $expireddate,
                        ];

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], $updata);
                        unset($updata['expired_date']);
                        $this->Data_model->Update_data(FACEBOOK, ['shop_id' => $sd['id']], $updata);
                    } else {
                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], ['is_refresh' => 0, "reason" => $outhtoken['error']['message']]);
                    }
                }
            }

            echo json_encode(['status' => true]);
        }
    }

    public function getweebhokslist_get($shop) {

        $shopdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], array('token', 'id', 'shop'));
        if (!empty($shopdata)) {

            $shopdata['token'];


            $data = array(
                'API_KEY' => $this->config->shopify_api_key,
                'API_SECRET' => $this->config->shopify_secret,
                'SHOP_DOMAIN' => $shop,
                'ACCESS_TOKEN' => $shopdata['token']
            );


            $this->shopify = new \App\Libraries\Shopify($data);


            $senddata = [
                'METHOD' => 'GET',
                'URL' => '/admin/api/2020-04/webhooks.json',
                'HEADERS' => array(),
                'FAILONERROR' => TRUE,
                'RETURNARRAY' => TRUE,
                'ALLDATA' => FALSE
            ];

            $resultdata = $this->shopify->call($senddata);

            echo json_encode($resultdata);
        }
    }

    public function cretaewebhooks() {
        extract($_REQUEST);

        $existdatas = $this->Data_model->Get_data_all_columns(SHOP_SETTINGS, ['is_install' => "1"], array('id', 'shop', 'token'));
        if (!empty($existdatas)) {

            foreach ($existdatas as $existdata) {

                $accessToken = $existdata['token'];

                $shop_update = array("webhook" => array("topic" => "app/uninstalled", "address" => base_url('uninstall') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "shop/update", "address" => base_url('shopupdate') . "?shop=" . $shop, "format" => "json"));
                $webhooksdata = $this->create_webhook($shop, $accessToken, $shop_update);

                $test_log = "\n---------Webhooks ------------\n" . "/admin/api/2020-04/webhooks.json \n---------Webhooks response------------\n" . json_encode($webhooksdata);
                log_message('custom', "result:-" . $test_log);


                $shop_update = array("webhook" => array("topic" => "products/create", "address" => base_url('product') . "?shop=" . $shop, "format" => "json"));
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
            }
        }
    }

    public function shopdetailsupdate() {
        extract($_REQUEST);
        $sql = "SELECT shop,id,token FROM shop_setting  where id  NOT IN(2,4) and is_install='1'";
        $existdata = $this->Data_model->Custome_query($sql);

        foreach ($existdata as $d) {
            $shop_id = $d['id'];

            $shop = $d['shop'];

            if (!empty($d)) {
                $accessToken = $d['token'];


                $data = array(
                    'API_KEY' => $this->config->shopify_api_key,
                    'API_SECRET' => $this->config->shopify_secret,
                    'SHOP_DOMAIN' => $d['shop'],
                    'ACCESS_TOKEN' => $accessToken
                );

                $this->shopify = new \App\Libraries\Shopify($data);

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

                if ($resultdata) {

                    $shopdata = [
                        'shopify_id' => $resultdata['shop']['id'],
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
                        'update_date' => $resultdata['shop']['id'],
                        'create_date' => date('Y-m-d'),
                        'key' => '',
                    ];


                    $exdata = $this->Data_model->Get_data_one_column(SHOP_SETTINGS, ['shop' => $shop], array('id', 'shop'));
                    if (!empty($exdata)) {
                        $this->Data_model->Update_data(SHOP_SETTINGS, ['shop' => $shop, 'id' => $exdata['id']], $shopdata);
                        $shop_id = $exdata['id'];
                    }
                }
            }
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

}
