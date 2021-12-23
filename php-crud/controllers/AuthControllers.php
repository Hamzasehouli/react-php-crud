<?php
namespace app\controllers;

use app\config\Database;
use app\JwtHandler;

class AuthControllers
{
    public static function login()
    {
        $body = json_decode(file_get_contents('php://input'));
        // extract($body);
        $email = $body->email;
        $password = $body->password;

        if (!$email) {
            echo 'Please enter a valid email';
            return;
        }
        if (!$password) {
            echo 'Please enter a valid password';
            return;
        }

        $con = Database::connect();

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

        $jwt = JwtHandler::generateToken($email);
        header("HTTP/1.1 200");
        print_r(json_encode(['status' => 'success', 'message' => 'You logged in successfully', 'token' => $jwt, 'isLoggedin' => true, 'email' => $email]));

    }
    public static function logout()
    {
        session_destroy();
        header('Location:/login');
    }
    public static function signup()
    {
        // extract($_POST);
        $body = json_decode(file_get_contents('php://input'));
        // extract($body);
        $email = $body->email;
        $username = $body->username;
        $password = $body->password;

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

        $query = "INSERT INTO admin (username, email, password) VALUES(:username, :email,:password)";
        $stmt = $con->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindValue(':password', $passwordHashed);
        if ($stmt->execute()) {
            $jwt = JwtHandler::generateToken($email);
            header("HTTP/1.1 201");
            print_r(json_encode(['status' => 'success', 'message' => 'You sign up successfully', 'token' => $jwt, 'isLoggedin' => true, 'email' => $email]));

        }

    }

    public static function protect()
    {
        JwtHandler::verifyToken();
    }
}