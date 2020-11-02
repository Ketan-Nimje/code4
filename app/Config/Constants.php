<?php

//--------------------------------------------------------------------
// App Namespace
//--------------------------------------------------------------------
// This defines the default Namespace that is used throughout
// CodeIgniter to refer to the Application directory. Change
// this constant to change the namespace that all application
// classes should use.
//
// NOTE: changing this will require manually modifying the
// existing namespaces of App\* namespaced-classes.
//
defined('APP_NAMESPACE') || define('APP_NAMESPACE', 'App');

/*
  |--------------------------------------------------------------------------
  | Composer Path
  |--------------------------------------------------------------------------
  |
  | The path that Composer's autoload file is expected to live. By default,
  | the vendor folder is in the Root directory, but you can customize that here.
 */
defined('COMPOSER_PATH') || define('COMPOSER_PATH', ROOTPATH . 'vendor/autoload.php');

/*
  |--------------------------------------------------------------------------
  | Timing Constants
  |--------------------------------------------------------------------------
  |
  | Provide simple ways to work with the myriad of PHP functions that
  | require information to be in seconds.
 */
defined('SECOND') || define('SECOND', 1);
defined('MINUTE') || define('MINUTE', 60);
defined('HOUR') || define('HOUR', 3600);
defined('DAY') || define('DAY', 86400);
defined('WEEK') || define('WEEK', 604800);
defined('MONTH') || define('MONTH', 2592000);
defined('YEAR') || define('YEAR', 31536000);
defined('DECADE') || define('DECADE', 315360000);

/*
  |--------------------------------------------------------------------------
  | Exit Status Codes
  |--------------------------------------------------------------------------
  |
  | Used to indicate the conditions under which the script is exit()ing.
  | While there is no universal standard for error codes, there are some
  | broad conventions.  Three such conventions are mentioned below, for
  | those who wish to make use of them.  The CodeIgniter defaults were
  | chosen for the least overlap with these conventions, while still
  | leaving room for others to be defined in future versions and user
  | applications.
  |
  | The three main conventions used for determining exit status codes
  | are as follows:
  |
  |    Standard C/C++ Library (stdlibc):
  |       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
  |       (This link also contains other GNU-specific conventions)
  |    BSD sysexits.h:
  |       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
  |    Bash scripting:
  |       http://tldp.org/LDP/abs/html/exitcodes.html
  |
 */
defined('EXIT_SUCCESS') || define('EXIT_SUCCESS', 0); // no errors
defined('EXIT_ERROR') || define('EXIT_ERROR', 1); // generic error
defined('EXIT_CONFIG') || define('EXIT_CONFIG', 3); // configuration error
defined('EXIT_UNKNOWN_FILE') || define('EXIT_UNKNOWN_FILE', 4); // file not found
defined('EXIT_UNKNOWN_CLASS') || define('EXIT_UNKNOWN_CLASS', 5); // unknown class
defined('EXIT_UNKNOWN_METHOD') || define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
defined('EXIT_USER_INPUT') || define('EXIT_USER_INPUT', 7); // invalid user input
defined('EXIT_DATABASE') || define('EXIT_DATABASE', 8); // database error
defined('EXIT__AUTO_MIN') || define('EXIT__AUTO_MIN', 9); // lowest automatically-assigned error code
defined('EXIT__AUTO_MAX') || define('EXIT__AUTO_MAX', 125); // highest automatically-assigned error code




defined('SUPPORT_MAIL') OR define('SUPPORT_MAIL', 'hello@thimatic.com');
defined('SHOP_NAME') OR define('SHOP_NAME', 'wc-ketan.myshopify.com');

// Key And Client Id's Live

defined('FACE_CLIENT_ID') OR define('FACE_CLIENT_ID', '922067108240158');
defined('FACE_SECRET_KEY') OR define('FACE_SECRET_KEY', '1afad2434146acb8cc1964085737e56b');


defined('INSTA_CLIENT_ID') OR define('INSTA_CLIENT_ID', '2602995316695952');
defined('INSTA_SECRET_KEY') OR define('INSTA_SECRET_KEY', '8a3faefb8aec61bc6e38a2aaf803d624');



// TABLE NAME DEFINE


defined('SHOP_SETTINGS') OR define('SHOP_SETTINGS', 'shop_setting');
defined('GALLARY_SETTINGS') OR define('GALLARY_SETTINGS', 'gallary_setting');
defined('PRODUCT_GALLARY') OR define('PRODUCT_GALLARY', 'product_gallary');
defined('PAGELIST') OR define('PAGELIST', 'pagelist');
defined('FACEBOOK') OR define('FACEBOOK', 'facebook');
defined('FACEBOOK_PAGE') OR define('FACEBOOK_PAGE', 'facebook_pages');
defined('INSTAGRAM_ACCOUNT') OR define('INSTAGRAM_ACCOUNT', 'instagram_account');
defined('SHOP_SCRIPT_TAG') OR define('SHOP_SCRIPT_TAG', 'create_shop_screpttag');

defined('EMBDED_CODE') OR define('EMBDED_CODE', 'embed_code');

defined('INSTA_FEED') OR define('INSTA_FEED', 'insta_feed');
defined('INSTA_LAYOUT') OR define('INSTA_LAYOUT', 'insta_layout');
defined('TAG_PRODUCT') OR define('TAG_PRODUCT', 'tag_product');
defined('PRODUCT') OR define('PRODUCT', 'product');
defined('PRODUCT_IMAGES') OR define('PRODUCT_IMAGES', 'product_images');
defined('APPLICATION_CHARGE') OR define('APPLICATION_CHARGE', 'recurring_application_charges');
defined('ANALYSTICS') OR define('ANALYSTICS', 'analystics_detials');


defined('HASHTAG_SETTINGS') OR define('HASHTAG_SETTINGS', 'hashtag_setting');
defined('HASHLIST') OR define('HASHLIST', 'hashtag_list');
defined('HASH_MEDIA') OR define('HASH_MEDIA', 'hashtag_media');



