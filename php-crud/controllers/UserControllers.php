<?php

namespace app\controllers;

use app\config\Database;

class UserControllers
{

    public static function getAllUsers()
    {

        $con = Database::connect();
        $nn = true;
        $query = "SELECT * FROM user WHERE active=$nn";

        $stmt = $con->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        header("HTTP/1.1 200");
        print_r(json_encode(['status' => 'success', 'message' => 'You sign up successfully', 'data' => ['users' => $results]]));
    }
    public static function addUser()
    {

        $con = Database::connect();

        $body = json_decode(file_get_contents('php://input'));

        print_r($body);

        $name = $body->firstName;
        $email = $body->email;

        if ($name && $email) {

            if (empty($name)) {
                echo 'Please enter a name';
                exit;
            }
            if (empty($email)) {
                echo 'Please enter a valid email';
                exit;
            }

            $query = "INSERT INTO user (name, email) VALUES(:name, :email)";

            $stmt = $con->prepare($query);
            $stmt->bindValue(':name', $name);
            $stmt->bindValue(':email', $email);

            if ($stmt->execute()) {
                header("HTTP/1.1 201");
                print_r(json_encode(['status' => 'success', 'message' => 'User added successfully']));
            }
        }
    }

    public static function getUser()
    {
        $body = json_decode(file_get_contents('php://input'));
        $id = $body->id;
        $con = Database::connect();
        $stmt = $con->prepare("SELECT * FROM user WHERE(id=:id)");
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        header("HTTP/1.1 200");
        print_r(json_encode(['status' => 'success', 'data' => ['users' => $result]]));

    }

    public static function deleteUser()
    {
        $body = json_decode(file_get_contents('php://input'));
        $id = $body->id;
        $con = Database::connect();
        $stmt = $con->prepare("SELECT * FROM user WHERE(id=:id)");
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $user = $stmt->fetch();
        $row = $stmt->rowCount();
        print_r($row);
        if ($row > 0) {
            echo 'there is a user with that id';
            $stmt1 = $con->prepare("UPDATE user SET active=:active WHERE id=:id");
            $stmt1->bindValue(':id', $id);
            $stmt1->bindValue(':active', false);
            if ($stmt1->execute()) {
                header("HTTP/1.1 204");

            }
        } else {
            header("HTTP/1.1 400");
        }
        // $con = Database::connect();
        // $stmt = $con->prepare("SELECT * FROM user WHERE(id=:id)");
        // $stmt->bindValue(':id', $id);
        // $stmt->execute();
        // $user = $stmt->fetch();
        // $row = $stmt->rowCount();
        // print_r($row);
        // if ($row > 0) {
        //     echo 'there is a user with that id';
        //     $stmt1 = $con->prepare("DELETE FROM user WHERE id=:id");
        //     $stmt1->bindValue(':id', $id);
        //     if ($stmt1->execute()) {
        //         unlink($_SERVER['DOCUMENT_ROOT'] . '/public/images/' . $user['image'] . '.png');
        //         header("Location:/");

        //     }
        // } else {
        //     echo 'no user found';
        // }
    }
    public static function updateUser()
    {
        $body = json_decode(file_get_contents('php://input'));

        $userId = $body->id;
        $email = $body->email;
        $name = $body->name;

        $con = Database::connect();
        $stmt = $con->prepare("SELECT * FROM user WHERE(id=:id)");
        $stmt->bindValue(':id', $userId);
        $stmt->execute();
        $user = $stmt->fetch();

        $row = $stmt->rowCount();
        if ($row > 0) {
            $sql = '';
            if ($name) {
                $sql .= "name=:name ";
            }
            if ($email) {
                $sql .= "email=:email ";
            }

            $arr = explode(' ', trim($sql));
            $tata = implode(',', $arr);

            $query = "UPDATE user SET $tata WHERE id=:id";

            $stmt1 = $con->prepare($query);

            $stmt1->bindValue(':id', $userId);
            if ($name) {
                $stmt1->bindValue(':name', $name);
            }

            if ($email) {
                $stmt1->bindValue(':email', $email);
            }

            if ($email || $name) {
                if ($stmt1->execute()) {
                    print_r('success');
                }
            } else {
                header("HTTP/1.1 400");
                print_r(json_encode(['status' => 'fail', 'message' => 'Please enter at least one field to update data']));

            }

        } else {
            header("HTTP/1.1 404");
            print_r(json_encode(['status' => 'fail', 'message' => 'no user found']));

        }
    }

}
