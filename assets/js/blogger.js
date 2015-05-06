$(document).ready(getposts);
function getposts(){
	console.log("loading");
	$.get("entries.json", function( data ) {
		var posts = [];
		var data = data['entries'];
		$.each(data, function(key, value) {
			console.log(key + ' -- ' + value);
			var date = value['date'];
			var title = value['title'];
			var post = value['text'];
			console.log(date + ' - ' + title + ' - ' + post);
			//posts.push("<div id='key' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + data[key] + "</p>")
		});
	});
}