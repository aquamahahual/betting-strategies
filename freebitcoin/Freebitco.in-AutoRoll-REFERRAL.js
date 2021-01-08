var script_version = 0.1;

(function() {
    'use strict';

    panel_referral_init();

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
	script_output_css += ".card {height: 12em; width: 20em; font-size: 1em; color: white;border-radius: 1em ;padding: 1em; display: flex;flex-direction:column; align-items: flex-start;background-size: cover;background-position: center;box-shadow: 0 0 5em -1em black;transition: all var(--transition-time); position: relative; overflow: hidden; border: 10px solid #ccc; text-decoration: none; }"
	script_output_css += ".script_referral {font-size: 12px; background: #cccccc; border: 2px groove #09ff00; margin-bottom: 1em;}";
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += ".card .true {color:darkgreen; }";
	script_output_css += ".card .false {color:darkred; }";
	script_output_css += "</style>";

	script_output =  "<div class='center free_play_bonus_box_large script_referral' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>Just for referrals</h2>";
	script_output += "<div class='cards-wrapper'>";
	script_output += "<div id='card1' class='card'>";
	script_output += "<span>Multiply: <span id='ref_multiply_status' class='bold'></span></span>";
	script_output += "<span>Sessions: <span id='ref_multiply_tot_sessions'>"+tot_multiply_sessions+"</span></span>";
	script_output += "<span>Plays: <span id='ref_multiply_tot_plays'></span></span>";
	script_output += "<span>Bets: <span id='ref_multiply_tot_bets'>"+tot_multiply_bets+"</span></span>";
	script_output += "</div>"; //card 1 close
	script_output += "<div id='card2' class='card'>";
	script_output += "<span>Max Consecutive Losts Session: <span id='ref_multiply_max_consecutive_losts'>"++"</span></span>";
	script_output += "<span>Max Consecutive Losts Always: <span id='ref_multiply_max_consecutive_losts'>"+max_consecutive_losts+"</span></span>";
	script_output += "</div>"; //card 2 close
	script_output += "</div>"; //card wrapper close
	script_output += "</div>"; //main div close 

	$('head').append(script_output_css);
	$('#script_output').after(script_output);

	if (Boolean(G_MULTIPLY)) {
		$('#ref_multiply_status').addClass('true').text('enabled');
	} else {
		$('#ref_multiply_status').addClass('false').text('disabled');
	}
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
