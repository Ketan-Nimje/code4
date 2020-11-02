<?php

namespace App\Controllers;

class Instagram extends BaseController {

    public function __construct() {
        $allowed_cors_headers = [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Access-Control-Request-Method'
        ];
        $allowed_cors_methods = [
            'GET',
            'POST',
            'OPTIONS',
            'PUT',
            'PATCH',
            'DELETE'
        ];
        $allowed_headers = implode(', ', $allowed_cors_headers);
        $allowed_methods = implode(', ', $allowed_cors_methods);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: ' . $allowed_headers);
        header('Access-Control-Allow-Methods: ' . $allowed_methods);

        $db = db_connect();
        $this->Data_model = new \App\Models\Data_model($db);
    }

    public function index() {
        echo view('gallary');
    }

    public function instaFeed() {

        extract($_REQUEST);

        $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop]);
        $response = [];
        if (!empty($existdata)) {

            if (isset($gallery_type) && $gallery_type == 'InstaProductFeed') {

                $data = $this->Data_model->Get_data_one(GALLARY_SETTINGS, ['shop' => "$shop", 'uniq_id' => $uniq_id]);

                if (!empty($data)) {

                    $page_no = isset($page_no) ? $page_no : 0;

                    if ($data['display_type'] == "1") {
                        $limit = $data['slider_limit'];
                    } else {
                        if (strtolower($limit) == "desktop") {
                            $limit = ($data['no_of_rows'] * $data['no_of_column']);
                        } elseif (strtolower($limit) == "mobile") {
                            $limit = ($data['mobile_no_of_rows'] * $data['mobile_no_of_column']);
                        }
                    }


                    $whr = '';
                    if ($data['hashtag_is'] == 1) {
                        $whr .= 'and (';
                        $i = 0;
                        foreach (explode(",", trim($data['hash_tags'])) as $f) {
                            if ($i == 0) {
                                $whr .= "ifd.caption like '%" . trim($f) . "%'";
                            } else {
                                $whr .= " or ifd.caption like '%" . trim($f) . "%'";
                            }
                            $i++;
                        }
                        $whr .= ")";
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
                                    where ifd.shop_id='" . $existdata['id'] . "' and ifd.is_visible='1' " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT $offset, $limit";


                    $instadata['data'] = $this->Data_model->Custome_query($sql);
                    $countdata = $this->Data_model->Custome_query("select ifd.insta_feed_id from " . INSTA_FEED . " as ifd where ifd.is_visible='1' and ifd.shop_id='" . $existdata['id'] . "'  " . $whr);
                    $instadata['tatal_record'] = count($countdata);
                    $data['domain'] = $existdata['domain'];
                    $data['subscribe'] = $existdata['paid_plain'];
                    $response['data'] = $instadata;
                    $response['response_code'] = 200;
                    $response['shop_data'] = $data;
                } else {

                    $response['response_code'] = 400;
                }
            } elseif (isset($gallery_type) && $gallery_type == 'InstaProductTagFeed') {

                $data = $this->Data_model->Get_data_one(PRODUCT_GALLARY, ['shop' => "$shop", 'shop_id' => $existdata['id']]);
                if (!empty($data)) {
                    $page_no = isset($page_no) ? $page_no : 0;

                    if ($data['display_type'] == "1") {
                        $limit = $data['slider_limit'];
                    } else {
                        if (strtolower($limit) == "desktop") {
                            $limit = ($data['no_of_rows'] * $data['no_of_column']);
                        } elseif (strtolower($limit) == "mobile") {
                            $limit = ($data['mobile_no_of_rows'] * $data['mobile_no_of_column']);
                        }
                    }
                    if (isset($product_id) && !empty($product_id)) {

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
                                        INNER JOIN " . TAG_PRODUCT . "  on ifd.insta_feed_id=tag_product.insta_feed_id
                                        INNER JOIN " . PRODUCT . " as p on p.product_id=tag_product.product_id and p.shopify_product_id='" . $product_id . "'
                                        LEFT JOIN " . SHOP_SETTINGS . "  as ss on ss.id=ifd.shop_id  
                                    where ifd.shop_id='" . $existdata['id'] . "' and ifd.is_visible='1' " . $whr . "  GROUP BY ifd.insta_feed_id order by ifd.timestamp desc   LIMIT  $limit";

                        $instadata['data'] = $this->Data_model->Custome_query($sql);
                        $data['domain'] = $existdata['domain'];
                        $data['subscribe'] = $existdata['paid_plain'];
                        $response['data'] = $instadata;
                        $response['response_code'] = 200;
                        $response['shop_data'] = $data;
                    } else {
                        $response['response_code'] = 400;
                    }
                } else {
                    $response['response_code'] = 200;
                }
            } else {

                log_message("custom", "Shop Gallary Type Not Found <==> " . $shop);

                $response['response_code'] = 400;
            }
            echo json_encode($response);
        } else {
            $response['response_code'] = 400;
            echo json_encode($response);
        }
    }

    public function analytics() {
        extract($_POST);
        if (isset($_POST)) {
            $existdata = $this->Data_model->Get_data_one(SHOP_SETTINGS, ['shop' => $shop]);
            if (!empty($existdata)) {
                if ($gallery_type == 'InstaProductTagFeed') {
                    $type = "PV";
                } else if ($gallery_type == 'InstaProductFeed') {
                    $type = "GV";
                }
                $data = [
                    "shop_id" => $existdata['id'],
                    "shop" => $shop,
                    "uniq_id" => (isset($uniq_id) && !empty($uniq_id)) ? $uniq_id : 0,
                    "feed_id" => ((isset($feed_id) && !empty($feed_id)) ? $feed_id : 0),
                    "type" => $type,
                    "click_feed" => $click,
                ];
                $this->Data_model->Insert_data(ANALYSTICS, $data);

                $response['response_code'] = 200;

                echo json_encode($response);
            } else {
                $response['response_code'] = 400;
                echo json_encode($response);
            }
        } else {
            $response['response_code'] = 400;
            echo json_encode($response);
        }
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

/* End of file filename.php */
