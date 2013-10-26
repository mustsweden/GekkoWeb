$(document).ready(function(){
var str1 = "http://dev.semprog.se/Gekko.svc/GetInfo/";
var str2 = "VVUS";

$("#searchbutton").click(function() {
	var edValue = document.getElementById("Autocomplete1");
        var s = edValue.value;
 $.getJSON( str1.concat(s), function(obj) { 
 
      $("#CompanyName").empty();
	  $("#CompanyContent").empty();
	   $("#CompanyName").append(obj.Name);
	   $("#CompanyContent").append("<br>Current Price: "+obj.CurrentPrice+" USD <br>"  + "Open Price: " + obj.Open);
	      
  
 });
});
});// JavaScript Document