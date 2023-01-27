<?php

$curl = curl_init();
$timeout = 30;
$ret = "";
$url="http://localhost:8080/?url=".$_GET["url"];
function check_empty_url(){
	if(empty($_GET["url"])) {
		print_r("Invalid URL!");
		exit;
	} else {
		return $_GET["url"];
	}
}
function check_empty_ua() {
	if(empty($_GET["ua"])) {
		return "cpprestsdk/2.9.0";
	} else {
		return $_GET["ua"];
	}
}
curl_setopt ($curl, CURLOPT_URL, check_empty_url()/*$url*/);
curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($curl, CURLOPT_USERAGENT, check_empty_ua()/*"cpprestsdk/2.9.0"*/);
curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
$text = curl_exec($curl);
echo $text;
if(curl_errno($curl)){
    echo 'Request Error:' . curl_error($curl);
}
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
if($httpCode == 403) {
	print_r("Access Denied!");
	exit;
} elseif($httpCode == 404) {
	print_r("Not Found!");
	exit;
} elseif($httpCode == 503) {
	print_r("Service Unavailable!");
	exit;
}

?>
