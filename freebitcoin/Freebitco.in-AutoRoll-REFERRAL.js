var script_version = 0.1;

(function() {
    'use strict';

    panel_referral_init();

})();

function panel_referral_init(){
	var script_output_css, script_output;

	script_output_css =  "<style>";
	script_output_css += ".script_referral {font-size: 12px; background: #cccccc; border: 2px groove #09ff00; margin-bottom: 1em;}"
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += "</style>";

	script_output = script_output_css;
	script_output += "<div class='center free_play_bonus_box_large script_referral' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>Just for referrals</h2>";
	script_output += MULTIPLY;
	script_output += "</div>";

	$('#script_output').after(script_output);
}
