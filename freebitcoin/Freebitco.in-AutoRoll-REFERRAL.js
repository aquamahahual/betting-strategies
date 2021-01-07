var script_version = 0.1;

(function() {
    'use strict';

    panel_referral_init();

})();

function panel_referral_init(){
	var script_output_css, script_output;

	script_output_css =  "<style>";
	script_output_css += ".cards-wrapper { display: grid; justify-content: center; align-items: center; grid-template-columns: 1fr 1fr; grid-gap: 2rem; padding: 4rem; margin: 0 auto; width: max-content; }";
	script_output_css += ".card {height: 25em; width: 20em; font-size: 1em; color: white;border-radius: 1em ;padding: 1em; display: flex;align-items: flex-end;background-size: cover;background-position: center;box-shadow: 0 0 5em -1em black;transition: all var(--transition-time); position: relative; overflow: hidden; border: 10px solid #ccc; text-decoration: none; }"
	script_output_css += ".script_referral {font-size: 12px; background: #cccccc; border: 2px groove #09ff00; margin-bottom: 1em;}";
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += "</style>";

	script_output =  "<div class='center free_play_bonus_box_large script_referral' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>Just for referrals</h2>";
	script_output += "<div class='cards-wrapper'>";
	script_output += "<div class='card'>window.G_MULTIPLY</div>";
	script_output += "</div>"; //card wrapper close
	script_output += "</div>"; //main div close 

	$('head').append(script_output_css);
	$('#script_output').after(script_output);
}
