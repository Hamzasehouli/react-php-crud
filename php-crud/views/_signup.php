<!DOCTYPE html>
<html lang="en">
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_head.php';?>
<title>Signup</title>

<body>
    <?php include_once $_SERVER['DOCUMENT_ROOT'] . '/views/_header.php';?>
    <form method='post' action="/api/v1/auth/signup" class="form">


        <div class="form__control">
            <label for="name" class="form__label">Username</label>
            <input name="username" type="text" id="name" class="form__input">
        </div>
        <div class="form__control">
            <label for="email" class="form__label">Email</label>
            <input name="email" type="email" id="email" class="form__input">
        </div>
        <div class="form__control">
            <label for="email" class="form__label">Password</label>
            <input name="password" type="password" id="password" class="form__input">
        </div>
        <button type="submit" class="btn btn-flat">Signup</button>
        <a href="/login">You do not have an account yet? Signup here</a>
    </form>
</body>

</html>