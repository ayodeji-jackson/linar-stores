<?php

class AppConfig {
    private $mysqli;

    function __construct() {
        try {
            $this->mysqli = new mysqli('localhost', 'root', '', 'linarStores');
        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
    function read($tableName, $id) {
        return $this->mysqli->query("SELECT * FROM $tableName WHERE $tableName" . "_Id = $id")->fetch_assoc();
    }
    function readAll($tableName) {
        return $this->mysqli->query("SELECT * FROM $tableName")->fetch_all(MYSQLI_ASSOC);
    } 
    function insert($sql) {

    }
    function update($sql) {

    }
    function delete($sql) {

    }
    function __destruct() {
        $this->mysqli->close();
    }
}

?>