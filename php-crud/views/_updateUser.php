<?php
use app\config\Database;

$id = $_GET['userid'];
if ($id) {

    $con = Database::connect();
    $stmt = $con->prepare("SELECT *FROM user WHERE id=:id");
    $stmt->bindValue(':id', $id);
    if ($stmt->execute()) {
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        extract($user);

    } else {
        echo 'something went wrong';
    }
} else {
    echo 'no id found';
}
?>

<!DOCTYPE html>
<html lang="en">
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_head.php';?>
<title>Edit a user</title>

<body>
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_header.php';?>
    <form method='post' action="/updateuser?userid=<?php print_r($id)?>" class="form" enctype="multipart/form-data">
        <div class="form__control">
            <label for="name" class="form__label">Name</label>
            <input placeholder=<?php echo $name ?> name="name" type="text" id="name" class="form__input">
        </div>
        <div class="form__control">
            <label for="email" class="form__label">Email</label>
            <input placeholder=<?php echo $email ?> name="email" type="email" id="email" class="form__input">
        </div>
        <div class="form__control">
            <label for="image" class="form__label">Image</label>
            <?php if ($image) {?>
            <img style="width:100px;height:100px;display:block" src="/public/images/<?php echo $image ?>.png">
            <?php }?>
            <input name="image" id="image" type="file" class="form__input">
        </div>
        <button type="submit" class="btn btn-flat">Save</button>
    </form>

</body>

</html>