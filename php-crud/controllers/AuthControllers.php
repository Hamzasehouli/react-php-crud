<?php
namespace app\controllers;

session_regenerate_id();
use app\config\Database;

class AuthControllers
{
    public static function login()
    {
        extract($_POST);
        if (!$email) {
            echo 'Please enter a valid email';
            return;
        }
        if (!$password) {
            echo 'Please enter a valid password';
            return;
        }

        $con = Database::connect();
        if (!empty($_POST)) {
            $query = "SELECT * FROM admin WHERE email=:email";
            $stmt = $con->prepare($query);
            $stmt->bindValue(':email', $email);
            $stmt->execute();
            $row = $stmt->rowCount();
            if ($row < 1) {
                echo 'user not found with that email';
                return;
            }
            $user = $stmt->fetch(\PDO::FETCH_ASSOC);

            $isPasswordValid = password_verify($password, $user['password']);
            if (!$isPasswordValid) {
                echo 'user not found with that password';
                return;
            }

            $_SESSION['isLoggedIn'] = true;
            $_SESSION['email'] = $email;
            $_SESSION['expTime'] = time() + 60;
            header('Location:/');

        }

    }
    public static function logout()
    {
        session_destroy();
        header('Location:/login');
    }
    public static function signup()
    {
        extract($_POST);
        if (!$username) {
            echo 'Please enter a valid username';
            return;
        }
        if (!$email) {
            echo 'Please enter a valid email';
            return;
        }
        if (!$password) {
            echo 'Please enter a valid password';
            return;
        }

        $con = Database::connect();
        if (!empty($_POST)) {
            $query = "INSERT INTO admin (username, email, password) VALUES(:username, :email,:password)";
            $stmt = $con->prepare($query);
            $stmt->bindValue(':username', $username);
            $stmt->bindValue(':email', $email);
            $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bindValue(':password', $passwordHashed);
            if ($stmt->execute()) {
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['email'] = $email;
                $_SESSION['expTime'] = time() + 60 * 60;
                header("Location:/");
            }
        }

    }
}