<?php
session_regenerate_id();
$isLoggedIn = null;
if (!empty($_SESSION['isLoggedIn'])) {
    $isLoggedIn = $_SESSION['isLoggedIn'];
}

?>
<!DOCTYPE html>
<html lang="en">
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_head.php';?>
<title>Add a user</title>

<body>

    <header class="header">
        <nav class"nav">
            <a href="/">Home</a>
            <ul class="nav__list">
                <?php if ($isLoggedIn) {

    ?>

                <li class="nav__item">
                    <form action="/api/v1/auth/logout" method="post">
                        <button type="submit" class="btn btn-primary">Log out</button>
                    </form>
                </li>
                <li class="nav__item">
                    <p><?php if (isset($_SESSION['email'])) {
        echo $_SESSION['email'];
    }?></p>
                </li>
                <?php } else {?>
                <li class="nav__item">
                    <a class="nav__link btn-primary anch" href="/login">login</a>
                </li>
                <li class="nav__item">
                    <a class="nav__link btn-primary anch" href="/signup">signup</a>
                </li>
                <?php }?>
            </ul>
        </nav>
    </header>

</body>

</html>