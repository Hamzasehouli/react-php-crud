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
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    public static function addUser()
    {
        echo 'add user';
    }
    public static function getUser()
    {
        echo 'get user';
    }
    public static function updateUser($id)
    {
    }
    public static function deleteUser($id)
    {
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
                unlink($_SERVER['DOCUMENT_ROOT'] . '/public/images/' . $user['image'] . '.png');
                header("Location:/");

            }
        } else {
            echo 'no user found';
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
    public static function updateUserTest($id)
    {
        $userId = $id;
        extract($_POST);

        $imageName = null;
        if (!empty($_FILES['image']['tmp_name'])) {
            $generateImageName = function ($num) {
                $chars = '1234567890QWERTZUIOPLKJHGFDSAYXCVBNMqwertzuioplkjhgfdsayxcvbnm';
                $imageName = $chars[3];
                $charsLen = strlen($chars);
                // echo $randoNum;
                for ($i = 0; $i <= $num; $i++) {
                    $randoNum = rand(1, $charsLen);
                    $imageName .= $chars[$randoNum];
                }
                return $imageName;
            };

            $imageName = $generateImageName(20);

            move_uploaded_file($_FILES["image"]["tmp_name"], $_SERVER['DOCUMENT_ROOT'] . '/public/images/' . $imageName . '.png');
        }

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
            if ($imageName) {
                $sql .= "image=:image";
            }
            // print_r(trim($sql));
            $arr = explode(' ', trim($sql));
            $tata = implode(',', $arr);
            print_r($tata);
            // print_r($tata);
            // $imageValidity = $name ? 'name=:name' : '';
            // $emailValidty = $email ? 'email=:email' : '';
            // $imageValidiy = $imageName ? 'image=:image' : '';

            // print_r($_POST);
            $query = "UPDATE user SET $tata WHERE id=:id";
            // print_r($query);

            $stmt1 = $con->prepare($query);

            $stmt1->bindValue(':id', $userId);
            if ($name) {
                $stmt1->bindValue(':name', $name);
            }

            if ($email) {
                $stmt1->bindValue(':email', $email);
            }

            if ($imageName) {
                $stmt1->bindValue(':image', $imageName);
                unlink($_SERVER['DOCUMENT_ROOT'] . '/public/images/' . $user['image'] . '.png');
            }

            if ($imageName || $email || $name) {
                if ($stmt1->execute()) {
                    header("Location:/");
                }
            } else {
                echo 'Please enter at least one field to update data';
            }

        } else {
            echo 'no user found';
        }
    }

}