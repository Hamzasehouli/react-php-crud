<?php
require_once './vendor/autoload.php';
session_start();
if (isset($_SESSION['expTime'])) {
    // echo 'main';
    // print_r($_SESSION['expTime']);
    if ($_SESSION['expTime'] > time()) {
        $_SESSION['expTime'] = null;
        $_SESSION['expTime'] = time() + 60;
        // echo 'after';
        // print_r($_SESSION['expTime']);
    } else {
        session_destroy();
        header('Location:/login');
    }
}

use app\config\Database;
use app\controllers\AuthControllers;
use app\controllers\UserControllers;
use app\controllers\ViewControllers;
use app\Router;

Database::connect();

$router = new Router();

if (str_starts_with($_SERVER['REQUEST_URI'], '/api/v1/users')) {

    $router->get('/api/v1/users', [UserControllers::class, 'getAllUsers']);
    $router->post('/api/v1/users', [UserControllers::class, 'addUser']);
    $router->get('/api/v1/users/getuser', [UserControllers::class, 'getUser']);
    $router->update('/api/v1/users/updateuser', [UserControllers::class, 'updateUser']);
    $router->delete('/api/v1/users/deleteuser', [UserControllers::class, 'deleteUser']);
    $router->run();
    exit;
}
if (str_starts_with($_SERVER['REQUEST_URI'], '/api/v1/auth')) {

    $router->post('/api/v1/auth/login', [AuthControllers::class, 'login']);
    $router->post('/api/v1/auth/signup', [AuthControllers::class, 'signup']);
    $router->post('/api/v1/auth/logout', [AuthControllers::class, 'logout']);
    $router->run();
    exit;
}

$router->get('/', [ViewControllers::class, 'overview']);
$router->get('/adduser', [ViewControllers::class, 'addUser']);
$router->post('/adduser', [ViewControllers::class, 'addUser']);
$router->get('/login', [ViewControllers::class, 'login']);
$router->get('/signup', [ViewControllers::class, 'signup']);
$router->get('/deleteuser', [ViewControllers::class, 'deleteUser']);
$router->get('/updateuser', [ViewControllers::class, 'updateUser']);
$router->post('/updateuser', [ViewControllers::class, 'updateUserTest']);
$router->run();