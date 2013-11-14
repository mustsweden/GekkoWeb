$(document).ready(function(){
$('#secondgraph').hide();
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
 
 


function drawVisualization() {
        
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














// toggle between divs
$('#togglesecondchart').click(function() {
    $('#CompanyContent').hide();
	$('#secondgraph').show().css("height","1000px");
});
$('#togglefirstchart').click(function() {
    $('#secondgraph').hide();
	$('#CompanyContent').show();
});

/*line charts*/

 google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ['2004',  1000],
          ['2005',  1170],
          ['2006',  660],
		   ['2004',  1000],
          ['2005',  1170],
          ['2006',  660],
		   ['2004',  1000],
          ['2005',  1170],
          ['2006',  660],
          ['2007',  1030]
        ]);

        var options = {
          title: 'Company Performance'
        };

        var chart = new google.visualization.LineChart(document.getElementById('secondgraph'));
        chart.draw(data, options);
      }


 
});


