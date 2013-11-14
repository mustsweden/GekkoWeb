// JavaScript Document




$(document).ready(function(){
	
var companyname
$("#searchbutton").click(function() {
	
	 edValue = document.getElementById("searchboxcontent");
	 var str1 = "http://dev.semprog.se/Gekko.svc/GetInfo/";
         companyname = edValue.value;
		// testing ajax
		$.ajax({ 
    url: str1.concat(companyname), 
    dataType: 'json', 
    
    async: false, 
    success: function(obj){ 
	
	 $("#companyInfo").empty();
	  
	   $("#companyInfo").append(obj.Name);


   } 
   
   
});

		//testing ends
		
/* $.getJSON( str1.concat(s), function(obj) { 
 
      $("#companyInfo").empty();
	  
	   $("#companyInfo").append(obj.Name);
	  
	      
  
 });*/


});


/*Candle Stick Charts */
var s = []
var chartdata =[]
var coname
var charturl
var miao = [["10", 20, 28, 38, 45],["20",30,20,21,50]]


 coname = "aapl";
 
 

 google.load("visualization", "1", {packages:["corechart"]});
     
function drawVisualization1() {
        
		$("#searchbutton").click(function() {
			edValue1 = document.getElementById("searchboxcontent");
			companyname1 = edValue1.value;
			charturl = "http://dev.semprog.se/Gekko.svc/GetDaily/" + companyname1 + "/20120525/20120601";
 s=[]
$.ajax({ 
    url: charturl, 
    dataType: 'json', 
    
    async: false, 
    success: function(json){ 
	
	for (var i = 0; i < json.length; i++) {

	var date = new Date(parseInt(json[i].Date.substr(6)));
	var date2 = Date.parse(parseInt(json[i].Date))
	
	s.push([date.toLocaleDateString(),parseFloat(json[i].Low),parseFloat(json[i].Open),parseFloat(json[i].Close),parseFloat(json[i].High)])
	
	}


   } 
   

});
var data = google.visualization.arrayToDataTable(
          s
          // Treat first row as data as well.
        , true);

        var options = {
          legend:'none',
		 	
        };

        var chart = new google.visualization.CandlestickChart(document.getElementById('CompanyContent'));
		
        chart.draw(data, options);
		
});
      }
	  

      google.setOnLoadCallback(drawVisualization);
	        google.setOnLoadCallback(drawVisualization1);















// toggle between divs
/*$('#togglesecondchart').click(function() {
    //$('#CompanyContent').hide();
	
	$('#CompanyContent').hide();
	$('#secondgraph').show(); 
	return true;
	
});
$('#togglefirstchart').click(function() {
 $('#CompanyContent').show(); 
 $('#secondgraph').hide();  //$('#secondgraph').hide("slow");
   
	//$('#CompanyContent').show();
});*/
/*line charts*/


    /* function drawChart() {
		  	$("#searchbutton").click(function() {
			edValue1 = document.getElementById("searchboxcontent");
			companyname1 = edValue1.value;
			charturl = "http://dev.semprog.se/Gekko.svc/GetDaily/" + companyname1 + "/20120525/20120601";

var testdata = [];
testdata.push(['year','miao'])
var linedata=[];

$.ajax({ 
    url: charturl, 
    dataType: 'json', 
    
    async: false, 
    success: function(json){ 
	
	for (var i = 0; i < json.length; i++) {

	var date = new Date(parseInt(json[i].Date.substr(6)));
	var date2 = Date.parse(parseInt(json[i].Date))
	
	linedata.push([json[i].Symbol,parseFloat(json[i].Open)])
	
	}
	    



   } 
   
});


  var data = google.visualization.arrayToDataTable(


linedata, true

        );

        var options = {
          title: 'Company Performance',
		   animation:{
        duration: 10000,
        easing: 'out',
      },
        };

        var chart = new google.visualization.LineChart(document.getElementById('secondgraph'));
        chart.draw(data, options);
});


   
      }*/

 google.setOnLoadCallback(drawChart);
     google.load('visualization', '1', {packages: ['annotatedtimeline']});
    function drawVisualization() {
		$("#searchbutton").click(function() {
			edValue1 = document.getElementById("searchboxcontent");
			companyname1 = edValue1.value;
			charturl = "http://dev.semprog.se/Gekko.svc/GetDaily/" + companyname1 + "/20080525/20131114";

var testdata = [];
testdata.push(['year','miao'])
var linedata=[];

$.ajax({ 
    url: charturl, 
    dataType: 'json', 
    
    async: false, 
    success: function(json){ 
	
	for (var i = 0; i < json.length; i++) {

	var date = new Date(parseInt(json[i].Date.substr(6)));
	
	
	linedata.push([new Date(date),parseFloat(json[i].Open)])
	}
	    



   } 
   
});
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Price');
  
      data.addRows(
   
	   linedata
      );
	  var jjj = new Date(2008, 1 ,1);
      var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
          document.getElementById('secondgraph'));
      annotatedtimeline.draw(data, {'displayAnnotations': true});
	  });
    }
	
    
    
 
  
});


