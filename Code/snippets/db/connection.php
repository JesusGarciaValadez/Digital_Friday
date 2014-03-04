<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=cmv', 'CMV4sf4l70', '{AmKZQvX3dzbcAVpc)qe8Kei');
    $dbh->exec("SET CHARACTER SET utf8");
} catch ( PDOException $e ) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}