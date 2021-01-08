var script_version = 0.1;

(function() {
    'use strict';
    var script_output_js = "<script src='https://cdn.jsdelivr.net/npm/chart.js@2.8.0' />";
	$('head').append(script_output_js);

    setTimeout(function(){ panel_referral_init(); }, 1200 );
    setTimeout(function(){ graphs_init(); }, 2500 );

})();
var max_consecutive_losts = G_getCookie('max_consecutive_losts');
var tot_multiply_sessions = G_getCookie('tot_multiply_games');
var tot_multiply_bets = G_getCookie('tot_multiply_bets');

if ( isNaN(parseFloat(max_consecutive_losts)) ) max_consecutive_losts = 0;
if ( isNaN(parseFloat(tot_multiply_sessions)) ) tot_multiply_sessions = 0;
if ( isNaN(parseFloat(tot_multiply_bets)) ) tot_multiply_bets = 0;


function panel_referral_init(){
	var script_output_css, script_output;

	

	script_output_css =  "<style>";
	script_output_css += ".cards-wrapper { display: grid; justify-content: center; align-items: center; grid-template-columns: 1fr 1fr; grid-gap: 1rem; padding: 1rem; margin: 0 auto; width: max-content; }";
	script_output_css += ".card {height: 12em; width: 25em; font-size: 0.8em; border-radius: 1em ;padding: 1em; display: flex;flex-direction:column; align-items: flex-start;background-size: cover;background-position: center;box-shadow: 0 0 5em -1em black; position: relative; overflow: hidden; border: 1px solid lime; text-decoration: none; text-align: left;}";
	script_output_css += ".colored .white {color:white; }";
	script_output_css += ".colored .card .true {color:darkgreen; }";
	script_output_css += ".colored .card .purple {color:purple; }";
	script_output_css += ".colored .card .brown {color:brown; }";
	script_output_css += ".colored .card .dimgray {color:dimgrey; }";
	script_output_css += ".colored .card .bisque {color:bisque; }";
	script_output_css += ".script_referral {font-size: 12px; background: #bbb; border: 2px groove #09ff00; margin-bottom: 1em;}";
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += ".script_referral.grayed {color: #a9a9a9}";
	script_output_css += ".card .false {color:darkred; }";
	script_output_css += ".card h3 {font-size:1.2em; }";
	script_output_css += " @media screen and (max-width: 900px) { .cards-wrapper { grid-template-columns: 1fr; } } "; 
	script_output_css += " @media screen and (max-width: 500px) { .card {max-width: calc(100vw - 4rem); } } ";
	script_output_css += "</style>";

	script_output =  "<div class='center free_play_bonus_box_large script_referral colored' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>Just for referrals</h2>";
	script_output += "<div class='cards-wrapper white'>";
	
	script_output += "<div id='card1' class='card'>";
	script_output += "<h3>Settings</h3>";
	script_output += "<span>Multiply: <span id='ref_multiply_status' class='bold'></span></span>";
	script_output += "<span>Wait Hours: <span id='ref_multiply_status' class='bold bisque'>"+G_MULTIPLY_WAIT_HOURS+"</span></span>";
	script_output += "<span>Mode: <span id='ref_multiply_game_mode' class='bold purple'></span></span>";
	script_output += "<span>Type: <span id='ref_multiply_game_type' class='bold brown'></span></span>";
	script_output += "<span>Odds: <span id='ref_multiply_game_type' class='bold dimgray'>"+G_ODDS+"</span></span>";
	script_output += "<span>Increase Rate: <span id='ref_multiply_game_type' class='bold dimgray'>"+G_INCR+"%</span></span>";
	script_output += "</div>"; //card 1 close

	script_output += "<div id='card2' class='card'>";
	script_output += "<h3>Stats</h3>";
	script_output += "<span>Sessions: <span id='ref_multiply_tot_sessions'>"+tot_multiply_sessions+"</span></span>";
	script_output += "<span>Plays: <span id='ref_multiply_tot_plays'></span></span>";
	script_output += "<span>Bets: <span id='ref_multiply_tot_bets'>"+tot_multiply_bets+"</span></span>";
	script_output += "</div>"; //card 2 close
	
	script_output += "<div id='card3' class='card'>";
	script_output += "<span>Max Consecutive Losess (Session): <span id='ref_multiply_max_consecutive_losts'></span></span>";
	script_output += "<span>Max Consecutive Losses (Always): <span id='ref_multiply_max_consecutive_losts'>"+max_consecutive_losts+"</span></span>";
	script_output += "</div>"; //card 3close

	script_output += "<div id='card4' class='card'>";
	script_output += "<canvas id='myChart'></canvas>";
	script_output += "</div>"; //card 3close

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
	    options: {}
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
