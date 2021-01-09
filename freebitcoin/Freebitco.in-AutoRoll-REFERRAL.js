var script_version = 0.1;

(function() {
    'use strict';
  
    setTimeout(function(){ panel_referral_init(); }, 1200 );
    setTimeout(function(){ graphs_init(); }, 2500 );

})();
var max_consecutive_losts = G_getCookie('max_consecutive_losts');
var tot_multiply_sessions = G_getCookie('tot_multiply_games');
var tot_multiply_bets = G_getCookie('tot_multiply_bets');
var last_multiply = Date.parse(G_getCookie("last_multiply"));

if ( isNaN(parseFloat(max_consecutive_losts)) ) max_consecutive_losts = 0;
if ( isNaN(parseFloat(tot_multiply_sessions)) ) tot_multiply_sessions = 0;
if ( isNaN(parseFloat(tot_multiply_bets)) ) tot_multiply_bets = 0;
if ( isNaN(parseFloat(last_multiply)) ) last_multiply = 0;


function panel_referral_init(){

	var d = new Date();
	var last_multiply_diff = Math.floor(d.getTime() - last_multiply);
	var milli_between_multiplies = Math.floor(G_MULTIPLY_WAIT_HOURS*60*60*1000);


	var script_output_css, script_output;	

	script_output_css =  "<style>";
	script_output_css += ".cards-wrapper { display: grid; justify-content: center; align-items: center; grid-gap: 1rem; grid-template-columns: 1fr 1fr; padding: 0.5rem 0rem; margin: 0 auto; width: max-content; }";
	script_output_css += ".cards-wrapper-1col { grid-template-columns: 1fr; }";
	script_output_css += ".cards-column-wrapper { display: grid; justify-content: center; grid-template-columns: 1fr 1fr; margin: 0 auto; grid-gap: 0.5em; }";	
	script_output_css += ".card {position: relative; height: 12em; width: 28em; font-size: 0.8em; border-radius: 1em ;padding: 3em 1em; display: flex; flex-direction: column; background-color:#666; box-shadow: 0 0 5em -1em black; border: 1px solid lime; text-decoration: none; text-align: left;}";
	script_output_css += ".card-double-size {width: 56em; }";
	script_output_css += ".card-column {display: flex; flex-direction: column; }";
	script_output_css += ".card-button {border: 1px solid grey; box-shadow: 0 0 5em -1em white; padding: 0.3em; background-color: beige; color: black; border-radius:10px; display: flex; flex-direction: column; text-align: center;}";
	script_output_css += ".card-button-num {font-size: 1.4em;}";
	script_output_css += ".colored .white {color:white; }";
	script_output_css += ".colored .card .purple {color:plum; }";
	script_output_css += ".colored .card .coral {color:coral; }";
	script_output_css += ".colored .card .lime {color:lime; }";
	script_output_css += ".colored .card .lgrey {color:#bbb; }";
	script_output_css += ".script_referral {font-size: 12px; background: #bbb; border: 2px groove #09ff00; margin-bottom: 1em;}";
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += ".script_referral.grayed {color: #a9a9a9}";
	script_output_css += ".card .true {color:lime; }";
	script_output_css += ".card .false {color:darkred; }";
	script_output_css += ".card h3 {font-size:1.3em; color: aquamarine; position: absolute; top: 0.3em; left: 50%; transform: translate(-50%,0);}";
	script_output_css += " @media screen and (max-width: 900px) { .cards-wrapper { grid-template-columns: 1fr; } } "; 
	script_output_css += " @media screen and (max-width: 500px) { .card {max-width: calc(100vw - 4rem); } } ";
	script_output_css += "</style>";


	script_output =  "<div class='center free_play_bonus_box_large script_referral colored' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>Just for referrals</h2>";
	script_output += "<div class='cards-wrapper cards-wrapper-1col white'>";
	
	script_output += "<div class='cards-wrapper'>";	

	script_output += "<div id='card1' class='card'>";
	script_output += "<div id='card1' class='cards-column-wrapper'>";
	script_output += "<h3>General Settings</h3>";
	script_output += "<div id='card1-left' class='card-column'>";
	script_output += "<span>Multiply: <span id='ref_multiply_status' class='bold'></span></span>";
	script_output += "<span>Multiply at night: <span id='ref_multiply_at_night' class='bold'></span></span>";
	script_output += "<span>Mode: <span id='ref_multiply_game_mode' class='bold purple'></span></span>";
	script_output += "<span>Type: <span id='ref_multiply_game_type' class='bold purple'></span></span>";
	script_output += "<span>Speed: <span id='ref_multiply_speed' class='bold coral'></span></span>";
	script_output += "</div>"; //card 1 left close
	script_output += "<div id='card1-right' class='card-column'>";
	script_output += "<div id='card1-buttons-container' class='cards-column-wrapper'>"
	script_output += "<div class='card-button'><span>Wait H</span><span class='bold coral card-button-num'>"+G_MULTIPLY_WAIT_HOURS+"</span></div>";
	script_output += "<div class='card-button'><span>Missing H</span><span id='ref_multiply_missing_hours' class='bold coral card-button-num'>"+Math.floor((milli_between_multiplies - last_multiply_diff)/1000/60/60)+"</span></div>";
	script_output += "<div class='card-button'><span>Max Rolls </span><span class='bold coral card-button-num'>"+G_MAX_ROLLS_AT_MULTIPLY+"</span></div>";
	script_output += "<div class='card-button'><span>Max Plays </span><span class='bold coral card-button-num'>"+G_MAX_PLAY+" </span></div>";
	script_output += "</div>"; //card 1 right buttons close
	script_output += "</div>"; //card 1 right close
	script_output += "</div>"; //card 1 column wrapper close
	script_output += "</div>"; //card 1 close

	script_output += "<div id='card2' class='card'>";
	script_output += "<h3>Game Type Settings</h3>";
	script_output += "<span>Min Bet: <span class='bold lime'>"+parseFloat(G_MIN_BET).toFixed(8)+"</span></span>";
	script_output += "<span>Bas Bet: <span class='bold lime'>"+parseFloat(G_BAS_BET).toFixed(8)+"</span></span>";
	script_output += "<span>Max Bet: <span class='bold lime'>"+parseFloat(G_MAX_BET).toFixed(8)+"</span></span>";
	script_output += "<span>Wait Before Losses: <span class='bold coral'>"+G_MIN_LOSSES_BEFORE_PLAY+"</span></span>"; 
	script_output += "<span>Wait After Losses: <span class='bold coral'>"+G_WAIT_PLAY_AFTER_LOSSES+"</span></span>"; 
	script_output += "<span>Odds: <span class='bold dimgray'>"+G_ODDS+"</span></span>";
	script_output += "<span>Increase Rate: <span class='bold dimgray'>"+G_INCR+"%</span></span>";
	script_output += "</div>"; //card 2 close

	script_output += "<div id='card3' class='card'>";
	script_output += "<h3>General Stats</h3>";
	script_output += "<span>Sessions: <span id='ref_multiply_tot_sessions'>"+tot_multiply_sessions+"</span></span>";
	script_output += "<span>Plays: <span id='ref_multiply_tot_plays'></span></span>";
	script_output += "<span>Bets: <span id='ref_multiply_tot_bets'>"+tot_multiply_bets+"</span></span>";
	script_output += "</div>"; //card 3 close
	
	script_output += "<div id='card4' class='card'>";
	script_output += "<h3>Last Session Stats</h3>";
	script_output += "<span>Max Consecutive Losess (Session): <span id='ref_multiply_max_consecutive_losts'></span></span>";
	script_output += "<span>Max Consecutive Losses (Always): <span id='ref_multiply_max_consecutive_losts'>"+max_consecutive_losts+"</span></span>";
	script_output += "</div>"; //card 4close

	script_output += "</div>"; //card wrapper 4 cards close

	script_output += "<div class='cards-wrapper cards-wrapper-1col'>"; //card wrapper 1 card open	
	script_output += "<div id='card4' class='card card-double-size'>";
	script_output += "<canvas id='myChart'></canvas>";
	script_output += "</div>"; //card 3close
	script_output += "</div>"; //card wrapper 1 cards close

	script_output += "</div>"; //card wrapper close
	script_output += "</div>"; //main div close 

	$('head').append(script_output_css);
	
	$('#script_output').after(script_output);

	if (Boolean(G_MULTIPLY)) {
		$('#ref_multiply_status').addClass('true').text('Enabled');
	} else {
		$('#ref_multiply_status').addClass('false').text('Disabled');
		$('#script_referral').removeClass('colored').addClass('grayed');
	}
	if (Boolean(G_MULTIPLY_AT_NIGHT)) {
		$('#ref_multiply_at_night').addClass('lime').text('Enabled');
	} else {
		$('#ref_multiply_status').addClass('false').text('Disabled');
	}
	if (G_SPEED == 0 ) {
		$("#ref_multiply_speed").text('really slow');
	} else if (G_SPEED == 1 ) {
		$("#ref_multiply_speed").text('Human Simulation');
	} else if (G_SPEED == 0 ) {
		$("#ref_multiply_speed").text('Medium');
	} else if (G_SPEED == 0 ) {
		$("#ref_multiply_speed").text('Fast');
	}  

	if (G_GAME_MODE == 0) {
		$("#ref_multiply_game_mode").text('Manual');
	} else $("#ref_multiply_game_mode").text('Auto');

	if (G_GAME_TYPE == 0) {
		$('#ref_multiply_game_type').text('Mart Classic (0)');	
	} else if (G_GAME_TYPE == 1) {
		$('#ref_multiply_game_type').text('Mart Min Losses (1)');	
	} else if (G_GAME_TYPE == 2) {
		$('#ref_multiply_game_type').text('Mart After Losses (2)');	
	} else if (G_GAME_TYPE == 3) {
		$('#ref_multiply_game_type').text('Mart After losses ++ (3)');	
	}
} 

function graphs_init () {
	

	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	        datasets: [{
	            label: 'My First dataset',
	            backgroundColor: 'rgb(255, 99, 132)',
	            borderColor: 'rgb(255, 99, 132)',
	            data: [0, 10, 5, 2, 20, 30, 45]
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	legend: {
	            display: false,
	            labels: {
	                fontColor: 'rgb(255, 99, 132)',
	                fontSize: 11
	            }
        	},
        	aspectRatio: 5
    	}
	});
}

function G_getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
