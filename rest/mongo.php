<?php
  
//require 'vendor/autoload.php' ;

class db {
    private $user = "user" ;
    private $pass = "password";
    private $host = "localhost";
    private $base = "";
    private $usersColl = "users";
    private $usersCollection;
    private $sessionColl = "session";
    private $sessionCollection;
    private $surveyColl = "survey";
    private $surveyCollection;
    private $conn;
    private $dbase;
    
    function __construct() {
      $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");    
      $this->usersCollection = $this->conn->{$this->base}->{$this->usersColl};
      $this->sessionCollection = $this->conn->{$this->base}->{$this->sessionColl};
      $this->surveyCollection = $this->conn->{$this->base}->{$this->surveyColl};
    }
  
    function Read() {
      $cursor = $this->surveyCollection->find();
      $table = iterator_to_array($cursor);
      return $table ;
    }

    function RegisterAdd($user){
      $cursor = $this->usersCollection->find(array('login' => $user['login']));
      $flag = iterator_to_array($cursor);
      if(empty($flag)){
        $ret = $this->usersCollection->insertOne($user) ;
        return $ret;
      }else{
        return false;
      }
    }

    function Login($user){
      $cursor = $this->usersCollection->find(array('login' => $user['login'], 'pass' => $user['pass']));
      $flag = iterator_to_array($cursor);
      if(empty($flag)){
        return false;
      }else{
        return true;
      }
    }

    function AnswersAdd($answers){
      $ret = $this->surveyCollection->insertOne($answers) ;
      return $ret;
    }

    function SessionCheck($session){
      $cursor = $this->sessionCollection->findOne(array('token' => $session['token']));
      if(empty($cursor)){
        return false;
      }else{
        if(time()-$cursor['start'] < 600){
          return true;
        }else{
          $this->sessionCollection->deleteMany(['token' => $session['token']]);
          return false;
        }
      }
    }

    function GetSessionUser($session){
      $cursor = $this->sessionCollection->findOne(array('token' => $session['token']));
      return $cursor['login'];
    }

    function NewSession($user){
      $unique = uniqid();
      $ret = $this->sessionCollection->insertOne(array('token' => $unique, 'login' => $user['login'], 'start' => time())) ;
      return $unique;
    }

    function DestroySession($session){
      $ret = $this->sessionCollection->deleteMany(['token' => $session['token']]);
      return $ret;
    }
}
?>
