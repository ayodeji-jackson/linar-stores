<?php

class Database {
    private $mysqli;

    function __construct() {
        try {
            $this->mysqli = new mysqli('localhost', 'root', '', 'linarStores');
        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
    function read($tableName, $id, $extra_param = "") {
        return $this->mysqli->query("SELECT * FROM $tableName WHERE $tableName" . "_Id = $id $extra_param")->fetch_assoc();
    }
    function readAll($tableName, $extra_param = "") {
        return $this->mysqli->query("SELECT * FROM $tableName $extra_param")->fetch_all(MYSQLI_ASSOC);
    } 
    function insert($sql) {

    }
    function update($sql) {

    }
    function delete($sql) {

    }
    function search($tableName, $column, $value, $extra_param = "") {
        return $this->mysqli->query("SELECT * FROM $tableName WHERE MATCH($tableName" . "_$column) AGAINST('$value') $extra_param")->fetch_all(MYSQLI_ASSOC);
    }
    function __destruct() {
        $this->mysqli->close();
    }
}

?>