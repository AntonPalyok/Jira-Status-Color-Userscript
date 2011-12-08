// ==UserScript==
// @name           JIRA Status Color Userscript
// @namespace      https://github.com/AntonPalyok
// @include        */secure/IssueNavigator*
// @include        */secure/QuickSearch*
// @include        */browse/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// you can improve perfomance a bit by using full domain name in URL part of @include section
// for example: // @include        http://your.jira.url/secure/IssueNavigator*

// wrap script into closure for cross-browser compatibility (opera, ie)
(function(window, undefined) {

	// normalize "window" object
	var w;
	if (typeof unsafeWindow != undefined) {
		w = unsafeWindow
	} else {
		w = window;  
	}

	// don't run script in frames
	// without this condition script will be run few times on page with frames
	if (w.self != w.top){
		return;
	}


	// Start logic of program

	var colorRed = "#fcbdbd";
	var colorGreen = "#d2f5b0";
	var colorBlue = "#c2dfff";
	var colorYellow = "#fff494";
	var colorGrey = "#cccccc";
	var colorRedBright = "#ff4550";
	
	var colorText = "#000000";
	
	var issueRows = $("#issuetable .issuerow");
	for (var i = 0; i < issueRows.length; i++) {
		var colorRow = "";
		var row = issueRows.eq(i);
		
		var statusCell = row.find(".status");		
		if (statusCell.length > 0) {
			var statusText = $.trim(statusCell.text());			
			
			if (statusText == "Open") {
				colorRow = colorRed;
			}
			else if (statusText == "In Progress") {
				colorRow = colorBlue;
			}
			else if (statusText == "On Staging") {
				colorRow = colorYellow;
			}
			else if (statusText == "Resolved") {
				colorRow = colorGreen;
			}
			else if (statusText == "Closed") {
				colorRow = colorGrey;
			}
			else if (statusText == "Reopened") {
				colorRow = colorRed;
			}
			else if (statusText == "Locally Done") {
				colorRow = colorYellow;
			}
			else if (statusText == "Verified") {
				colorRow = colorYellow;
			}		
		}
		
		/*
		// Uncomment this if you want to highlight Unassigned issues
		var assigneeCell = row.find(".assignee");		
		if (assigneeCell.length > 0) {
			var assigneeText = $.trim(assigneeCell.text());
			
			if (assigneeText == "Unassigned") {
				colorRow = colorRedBright;
			}
		}
		*/
		
		if (colorRow != "")
		{
			row.css("background-color", colorRow);
			row.find("a").css("color", colorText);
		}
		
	}	

})(window);