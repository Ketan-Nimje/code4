<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

$routes->post('Api/access', 'Authapi::access');
$routes->resource('Api');
$routes->get('payment', 'Callback::payment');
$routes->get('authshop', 'Callback::shopcallback');

$routes->get('updatetag', 'Callback::scriptagupdate');

$routes->get('uninstall', 'Webhooks::uninstall');
$routes->post('uninstall', 'Webhooks::uninstall');

$routes->get('product', 'Webhooks::product');
$routes->post('product', 'Webhooks::product');

$routes->get('productupdate', 'Webhooks::product');
$routes->post('productupdate', 'Webhooks::product');

$routes->get('deletproduct', 'Webhooks::deletproduct');
$routes->post('deletproduct', 'Webhooks::deletproduct');

$routes->post('shop-info-remove', 'Webhooks::deletestore');

$routes->get('shopupdate', 'Webhooks::shopupdate');
$routes->post('shopupdate', 'Webhooks::shopupdate');

$routes->get('newwebhooks', 'Webhooks::cretaewebhooks');

$routes->get('live-notification', 'Instawebhook::facebookhook');


$routes->get('feeddata', 'Instagram::instaFeed');
$routes->post('viewgallary', 'Instagram::analytics');

$routes->get('Install', 'Install::index');
$routes->get('privacy-policy', 'Install::index');

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

$routes->get('/', 'Home::index');

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
