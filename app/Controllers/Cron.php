<?php

namespace App\Controllers;

use App\Models\Data_model;

class Cron extends BaseController {

    public function __construct() {
        $db = db_connect();
        $this->Data_model = new Data_model($db);
    }

    public function cronpost() {
        if ($this->request->isCLI()) {

            $sdata = $this->Data_model->Get_data_all_columns(SHOP_SETTINGS, ['paid_plain' => "0", 'is_install' => '1'], array('id', 'shop', 'paid_plain', 'is_social_login', 'login_with'));
            
            if (!empty($sdata)) {
                
                foreach ($sdata as $sd) {

                    if ($sd['is_social_login'] == "1" && ($sd['login_with'] == "INSTAGRAM" || $sd['login_with'] == "FACEBOOK ")) {

                        $sd = $this->Data_model->Get_data_one_column(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], "is_check" => '1'], [INSTAGRAM_ACCOUNT . '_id', 'accesstoken', 'shop_id', 'instagram_id']);

                        if (!empty($sd)) {
                            if ($sd['login_with'] == "INSTAGRAM") {
                                $url = "https://graph.instagram.com/" . $sd['instagram_id'] . "?fields=id,ig_id,username,media_count&access_token=" . $sd['accesstoken'];

                                $userdata = $this->call_curl($url, "");

                                if (!empty($userdata)) {

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
                                            $url = "https://graph.instagram.com/" . $sd['instagram_id'] . "/media?fields=caption,media_type,media_url,permalink,timestamp&limit=50&access_token=" . $sd['accesstoken'];
                                        }
                                        $instadata = $this->call_curl($url, '');


                                        foreach ($instadata['data'] as $in) {
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

                                            $instadata = $this->Data_model->Get_data_one_column(INSTA_FEED, ['shop_id' => $sd['id'], 'feed_main_id' => $in['id']], array('insta_feed_id'));
                                            if (!empty($instadata)) {
                                                $this->Data_model->Update_data(INSTA_FEED, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id'], "insta_feed_id" => $instadata['insta_feed_id']], $instafeeddata);
                                            } else {
                                                $this->Data_model->Insert_data(INSTA_FEED, $instafeeddata);
                                            }
                                        }

                                        if (!empty($instadata['paging']['next'])) {
                                            $return_url = $instadata['paging']['next'];
                                        } else {
                                            $return_url = '';
                                        }
                                        $total_pages--;
                                    }
                                }
                            } elseif ($sd['login_with'] == "FACEBOOK") {

                                $url = "https://graph.facebook.com/v7.0/" . $sd['instagram_id'] . "?fields=profile_picture_url,media_count,name,username&access_token=" . $sd['accesstoken'];


                                $facedata = $this->call_curl($url, '');

                                $test_log = "\n---------Instagram Data------------\n" . " $url \n---------Instagram Data response------------\n" . json_encode($facedata);
                                log_message('custom', "Instagram Data result:-" . $test_log);



                                $pagedata = [
                                    'shop_id' => $sd['id'],
                                    'instagram_id' => $sd['instagram_id'],
                                    'name' => $facedata['name'],
                                    'username' => $facedata['username'],
                                    'image_url' => $facedata['profile_picture_url'],
                                    'media_count' => $facedata['media_count'],
                                ];

                                $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], 'instagram_id' => $sd['instagram_id']], $pagedata);

                                $total_pages = ceil($facedata['media_count'] / 50);
                                $page_count = $total_pages;
                                $return_url = '';
                                while ($page_count > 0) {

                                    if ($return_url != '' && $return_url != null) {
                                        $url = $return_url;
                                    } else {
                                        $url = "https://graph.facebook.com/v7.0/" . $sd['instagram_id'] . "/media?fields=caption,like_count,media_type,media_url,permalink,shortcode,timestamp,comments_count,is_comment_enabled&limit=50&access_token=" . $sd['accesstoken'];
                                    }

                                    $instadata = $this->call_curl($url, '');


                                    foreach ($instadata['data'] as $in) {
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

                                    if (!empty($instadata['paging']['next'])) {
                                        $return_url = $instadata['paging']['next'];
                                    } else {
                                        $return_url = '';
                                    }
                                    $page_count--;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            echo "You dont have access";
        }
    }

    public function refreshtoken() {

        $sql = "SELECT instagram_account_id,shop_id,facebook_id,accesstoken,expires_in,register_with,ss.is_social_login,ss.login_with,ss.shop,ss.id FROM instagram_account 
                        INNER JOIN shop_setting as ss on ss.id=instagram_account.shop_id
                        WHERE  ss.is_install='1' and ss.is_social_login='1' and  date(instagram_account.expired_date)=CURDATE() + 5";

        $sdata = $this->Data_model->Custome_query($sql);

        if (!empty($sdata)) {
            $ids = '';
            foreach ($sdata as $sd) {

                if ($sd['register_with'] == "1" && !empty($sd['expires_in'])) {

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
                            'expires_in' => ((isset($outhtoken['expires_in']) && !empty($outhtoken['expires_in'])) ? $outhtoken['expires_in'] : 0),
                            'expired_date' => $expireddate,
                            'is_refresh' => 1
                        ];

                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], $updata);
                        unset($updata['expired_date']);
                        unset($updata['is_refresh']);
                        $this->Data_model->Update_data(FACEBOOK, ['shop_id' => $sd['id']], $updata);
                    } else {
                        $this->Data_model->Update_data(INSTAGRAM_ACCOUNT, ['shop_id' => $sd['id'], INSTAGRAM_ACCOUNT . '_id' => $sd[INSTAGRAM_ACCOUNT . '_id']], ['is_refresh' => 0, "reason" => $outhtoken['error']['message']]);
                    }
                }
            }

            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => true]);
        }
    }

    public function cronrun() {
        if ($this->request->isCLI()) {
            log_message('custom', "Cron Run Mid Night ");
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
