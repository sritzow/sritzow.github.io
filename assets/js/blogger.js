$(document).ready(getposts);

var posts = [];

$('#search-second').bind('input', function() {
	var search = $('#search-second').val();
	
	if (search != null && search.length > 0) {
		var newPosts = getSearchPosts();
		$('#information').hide();
		pagePosts(newPosts, 1, true);
	} else {
		$('#information').show();
		pagePosts(posts, 1, true);
	}
});

function getSearchPosts() {
	var search = $('#search-second').val();
	
	if (search != null && search.length > 0) {
		var newPosts = [];
		for (var post in posts) {
			if (posts[post]['text'].toLowerCase().indexOf(search.toLowerCase()) != -1) {
				newPosts.push(posts[post]);
			}
		}
		return newPosts;
	}
	return posts;
}

function pagePosts(searchPosts, page, scroll) {
	var text = "";
	for (i = (page - 1) * 5; i < (page - 1) * 5 + 5; i++) {
		if (searchPosts != null) {
			if (searchPosts.length > i)
				text += "<div id='post" + i + "' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + searchPosts[i]['date'] + "</p></small><h5>" + searchPosts[i]['title'] + "</h5><p>" + searchPosts[i]['text'] + "</p><hr/></div>";
		}
	}
	
	var under = '<p class = "lead" style = "text-align:center">';
	for (i = 0; i < Math.ceil(searchPosts.length / 5); i++) {
		if (i == 0 && page != 1) {
			under += ' <span style = "cursor: pointer;" onclick = "pagePosts(getSearchPosts(), ' + (page - 1) + ', true)">Previous</span>';
		}
		
		if (i + 1 == page) {
			under += ' <span onclick = "pager(' + (i + 1) + ', true)" style = "cursor: pointer; text-decoration:underline;">' + (i + 1) + '</span>'
		} else {
			under += ' <span style = "cursor: pointer;" onclick = "pagePosts(getSearchPosts(), ' + (i + 1) + ', true)">' + (i + 1) + '</span>';
		}
		
		if (i == Math.ceil(posts.length / 5) - 1 && page != Math.ceil(posts.length / 5)) {
			under += ' <span style = "cursor: pointer;" onclick = "pagePosts(getSearchPosts(), ' + (page + 1) + ', true)">Next</span>';
		}
	}
	under += '</p>';
	text += under;
	$('#blog').fadeOut('slow', function() {
		$('#blog').html(text).hide().fadeIn('slow');
	});
	if (scroll)
		$('#blogheader')[0].scrollIntoView(true);
}

function pager(page, scroll) {
	var text = "";
	
	var under = '<p class = "lead" style = "text-align:center">';
	for (i = (page - 1) * 5; i < (page - 1) * 5 + 5; i++) {
		if (posts.length > i) {
			console.log(i + ' - ' + posts[i]);
			text += posts[i];
		}
	}	
	
	for (i = 0; i < Math.ceil(posts.length / 5); i++) {
		if (i == 0 && page != 1) {
			under += ' <span style = "cursor: pointer;" onclick = "pagePosts(posts, ' + (page - 1) + ', true)">Previous</span>';
		}
		
		if (i + 1 == page) {
			under += ' <span onclick = "pager(' + (i + 1) + ', true)" style = "cursor: pointer; text-decoration:underline;">' + (i + 1) + '</span>'
		} else {
			under += ' <span style = "cursor: pointer;" onclick = "pagePosts(posts, ' + (i + 1) + ', true)">' + (i + 1) + '</span>';
		}
		
		if (i == Math.ceil(posts.length / 5) - 1 && page != Math.ceil(posts.length / 5)) {
			under += ' <span style = "cursor: pointer;" onclick = "pager(' + (page + 1) + ', true)">Next</span>';
		}
	}
	
	under += '</p>';
	
	text += under;
	$('#blog').fadeOut('slow', function() {
		$('#blog').html(text).hide().fadeIn('slow');
	});
	if (scroll)
		$('#blogheader')[0].scrollIntoView(true);
}

function getposts(){
	console.log("loading");
	$.get("entries.json", function( data ) {
		var data = data['entries'].reverse();
		$.each(data, function(key, value) {
			var date = value['date'];
			var title = value['title'];
			var text = value['text'];
			//posts.push("<div id='post" + key + "' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + date + "</p></small><h5>" + title + "</h5><p>" + text + "</p><hr/></div>");
			posts.push(value);
		});
		//pager(1, false);
		pagePosts(posts, 1, false);
	});
}