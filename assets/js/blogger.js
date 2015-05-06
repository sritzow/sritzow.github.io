$(document).ready(getposts);

var posts = [];

function pager(page) {
	var text = "";
	for (i = (page - 1 * 5); i < (page - 1 * 5) + 5; i++) {
		text += posts[i];
	}	
	$('#blog').html(text);
}

function getposts(){
	console.log("loading");
	$.get("entries.json", function( data ) {
		var data = data['entries'];
		$.each(data, function(key, value) {
			var date = value['date'];
			var title = value['title'];
			var text = value['text'];
			posts.push("<div id='key' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + date + "</p></small><h5>" + title + "</h5><p>" + text + "</p><hr/></div>");
		});
		
		pager(1);
	});
}