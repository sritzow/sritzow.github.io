$(document).ready(getposts);
function getposts(){
	console.log("loading");
	$.get("entries.json", function( data ) {
		
		var posts = [];
		$.each(data, function(key, value) {
			console.log(key + ' -- ' + value);
			//posts.push("<div id='key' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + data[key] + "</p>")
			
		});
	});
}