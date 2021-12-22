<?php
namespace app;

use app\config\Database;

class JwtHandler
{

    public static function generateToken($email)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

        $payload = json_encode(['user_id' => $email, 'exp' => (time() + (120 * 60))]);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        return $jwt;
    }

    public static function verifyToken()
    {
        $d = json_decode(file_get_contents('php://input'), true);
        if (isset($d['jwt'])) {

            $resp = explode('=', $d['jwt']);
            $jwt = $resp[1];
        } else {
            extract($_COOKIE);
            print_r($jwt);
        }

        $tokenParts = explode('.', $jwt);
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signature_provided = $tokenParts[2];

        $expiration = json_decode($payload)->exp;
        $id = json_decode($payload)->user_id;

        $is_token_expired = ($expiration - time()) < 0;

        if ($expiration - time() < 0) {
            header("HTTP/1.1 400");
            return print_r(json_encode(['status' => 'fail', 'message' => 'your are logged out', 'isLoggedin' => false]));
        }

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        $is_signature_valid = ($base64UrlSignature === $signature_provided);
        $database = new Database();
        $con = $database->connect();
        $query = 'SELECT * FROM user WHERE id=:id';
        $stmt = $con->prepare($query);

        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $row = $stmt1->rowCount();
        if ($row < 0) {
            header("HTTP/1.1 404");
            return print_r(json_encode(['status' => 'fail', 'message' => 'User not found', 'isLoggedin' => false]));
        }
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        extract($user);

        if ($is_signature_valid) {
            header("HTTP/1.1 200");
            print_r(json_encode(['status' => 'success', 'message' => 'You logged in successfully', 'token' => $jwt, 'isLoggedin' => true, 'email' => $email]));

        } else {
            header("HTTP/1.1 403");
            print_r(json_encode(['status' => 'fail', 'message' => 'your ere not logged in to perform the task', 'isLoggedin' => false]));

        }
    }
};
