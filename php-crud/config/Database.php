<?php
namespace app\config;

class Database
{

    public static function connect()
    {
        try {
            $con = new \PDO("mysql:host=localhost;port=3306;dbname=php_crud", 'root', '');
            $con->setAttribute(\PDO::ERRMODE_EXCEPTION, \PDO::ATTR_ERRMODE);
            return $con;
        } catch (\PDOException$e) {
            print_r($e->getMessage());
        }
    }
}