<?php
    function generate_rack($n){
        $tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
        $rack_letters = substr(str_shuffle($tileBag), 0, $n);
        $temp = str_split($rack_letters);
        sort($temp);
        return implode($temp);
    };
    $true_rack = generate_rack(7);
    //echo $true_rack;
    
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
    
    //$answer = $_POST['answer'];
    //$test_query = $_POST['query'];
    
    $query = "SELECT rack, words FROM racks WHERE length=7 order by random() limit 0,1";
    //$query2 = "SELECT words FROM racks WHERE length=7 order by random() limit 0,1";
    //echo $query;
    
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    header('HTTP/1.1 200 OK');
    
    header('Content-Type: application/json');
    
    echo json_encode($results);
?>