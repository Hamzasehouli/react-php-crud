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
            header("HTTP/1.1 400");
            echo (json_encode(['status' => 'fail', 'message' => 'Please enter a valid email']));
            exit;
        }
        if (!$password) {
            header("HTTP/1.1 400");
            echo (json_encode(['status' => 'fail', 'message' => 'Please enter a valid password']));
            exit;
        }

        $con = Database::connect();

        $query = "SELECT * FROM admin WHERE email=:email";
        $stmt = $con->prepare($query);
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        $row = $stmt->rowCount();
        if ($row < 1) {
            header("HTTP/1.1 404");
            echo (json_encode(['status' => 'fail', 'message' => 'user not found with that email']));

            exit;
        }
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        $isPasswordValid = password_verify($password, $user['password']);
        if (!$isPasswordValid) {
            header("HTTP/1.1 404");
            echo (json_encode(['status' => 'fail', 'message' => 'user not found with that password']));
            exit;
        }

        $jwt = JwtHandler::generateToken($email);
        header("HTTP/1.1 200");
        echo (json_encode(['status' => 'success', 'message' => 'You logged in successfully', 'token' => $jwt, 'isLoggedin' => true, 'email' => $email]));

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
            header("HTTP/1.1 404");
            echo (json_encode(['status' => 'fail', 'message' => 'Please enter a valid username']));
            exit;
        }
        if (!$email) {
            header("HTTP/1.1 404");
            echo (json_encode(['status' => 'fail', 'message' => 'Please enter a valid email']));
            exit;
        }
        if (!$password) {
            header("HTTP/1.1 404");
            echo (json_encode(['status' => 'fail', 'message' => 'Please enter a valid password']));
            exit;
        }

        $con = Database::connect();

        $query = "INSERT INTO admin (username, email, password) VALUES(:username, :email,:password)";
        $stmt = $con->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindValue(':password', $passwordHashed);
        try {
            $stmt->execute();
            $jwt = JwtHandler::generateToken($email);
            header("HTTP/1.1 201");
            echo (json_encode(['status' => 'success', 'message' => 'You sign up successfully', 'token' => $jwt, 'isLoggedin' => true, 'email' => $email]));
        } catch (\PDOException$e) {
            header("HTTP/1.1 500");
            echo (json_encode(['status' => 'fail', 'message' => 'The entered email is already used']));
        }

    }

    public static function protect()
    {
        JwtHandler::verifyToken();
    }
}
