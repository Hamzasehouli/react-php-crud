<?php

namespace app\controllers;

use app\controllers\UserControllers;

class ViewControllers
{
    public static function overview()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_overview.php';
    }
    public static function login()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_login.php';
    }
    public static function signup()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_signup.php';
    }
    public static function addUser()
    {
        if (isset($_SESSION)) {
            if (isset($_SESSION['isLoggedIn']) && isset($_SESSION['expTime'])) {
                if ($_SESSION['isLoggedIn'] && $_SESSION['expTime'] > time()) {
                    include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_addUser.php';
                }
            } else {
                
                session_destroy();
                header('Location:/login');

            }
        }

    }
    public static function updateUser()
    {if (isset($_SESSION)) {
        if (isset($_SESSION['isLoggedIn']) && isset($_SESSION['expTime'])) {
            if ($_SESSION['isLoggedIn'] && $_SESSION['expTime'] > time()) {
                include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_updateuser.php';
            }
        } else {
            session_destroy();
            header('Location:/login');

        }
    }
    }
    public static function updateUserTest()
    {
        UserControllers::updateUserTest($_GET['userid']);
    }
    public static function deleteuser()
    {
        if (isset($_SESSION)) {
            if (isset($_SESSION['isLoggedIn']) && isset($_SESSION['expTime'])) {
                if ($_SESSION['isLoggedIn'] && $_SESSION['expTime'] > time()) {
                    if (isset($_GET['userid'])) {

                        UserControllers::deleteUser($_GET['userid']);
                    } else {
                        echo 'no user id has been given';
                    }
                }
            } else {
                session_destroy();
                header('Location:/login');

            }
        }

    }

}