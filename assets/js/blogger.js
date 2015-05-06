$(document).ready(getposts);

var posts = [];

function pager(page) {
	var text = "";
	
	var under = '<p class = "lead" style = "text-align:center">';
	for (i = (page - 1) * 5; i < (page - 1) * 5 + 5; i++) {
		if (posts.length > i) {
			console.log(i + ' - ' + posts[i]);
			text += posts[i];
		}
	}	
	
	for (i = 0; i < Math.ceil(posts.length / 5); i++) {
		if (i + 1 == page) {
			under += ' <span onclick = "pager(' + (i + 1) + ')" style = "cursor: pointer; text-decoration:underline;">' + (i + 1) + '</span>'
		} else {
			under += ' <span style = "cursor: pointer;" onclick = "pager(' + (i + 1) + ')">' + (i + 1) + '</span>';
		}
	}
	
	under += '</p>';
	
	text += under;
	$('#blog').html(text);
	$('#blog')[0].scrollIntoView(true);
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