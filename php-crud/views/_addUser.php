<?php

use app\config\Database;

$con = Database::connect();

if (!empty($_POST)) {

    extract($_POST);

    if (empty($name)) {
        echo 'Please enter a name';
        exit;
    }
    if (empty($email)) {
        echo 'Please enter a valid email';
        exit;
    }

    $query = !empty($_FILES['image']['tmp_name']) ? "INSERT INTO user (name, email,image) VALUES(:name, :email,:image)" : "INSERT INTO user (name, email) VALUES(:name, :email)";

    $stmt = $con->prepare($query);
    $stmt->bindValue(':name', $name);
    $stmt->bindValue(':email', $email);
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
        $stmt->bindValue(':image', $imageName);
    }
    if (

        $stmt->execute()
    ) {
        $_POST = [];
        print_r($_POST);
        ?>
<script type='text/javascript'>
window.location.replace("/");
</script><?php
}

}

?>


<!DOCTYPE html>
<html lang="en">
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_head.php';?>
<title>Add a user</title>

<body>
    <?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_header.php';?>
    <form method='post' action="/adduser" class="form" enctype="multipart/form-data">
        <div class="form__control">
            <label for="name" class="form__label">Name</label>
            <input name="name" type="text" id="name" class="form__input">
        </div>
        <div class="form__control">
            <label for="email" class="form__label">Email</label>
            <input name="email" type="email" id="email" class="form__input">
        </div>
        <div class="form__control">
            <label for="image" class="form__label">Image</label>
            <input name="image" id="image" type="file" class="form__input">
        </div>
        <button type="submit" class="btn btn-flat">Add</button>
    </form>

</body>

</html>