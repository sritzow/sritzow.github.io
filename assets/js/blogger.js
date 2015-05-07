$(document).ready(getposts);

var posts = [];

$('#search-second').bind('input', function() {
	var search = $('#search-second').val();
	
	if (search != null && search.length > 0) {
		var newPosts = getSearchPosts();
		$('#information').hide('slow');
		pagePosts(newPosts, 1, true);
	} else {
		$('#information').show('slow');
		pagePosts(posts, 1, true);
	}
});

$('#search2').bind('input', function() {
	$('#search-second').val($('#search-second').val() + $('#search2').val()).focus();
	$('#search2').val('');
});

function getSearchPosts() {
	var search = $('#search-second').val().toLowerCase().replaceAll(' ', '');
	if (search != null && search.length > 0) {
		var newPosts = [];
		for (var post in posts) {
			console.log(search);
			var postLower = posts[post]['text'].toLowerCase().replaceAll(' ', '');
			console.log(postLower);
			if (postLower.search(search) != -1) {
				newPosts.push(posts[post]);
			}
		}
		return newPosts;
	}
	return posts;
}

function preg_quote( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

function highlight( data, search )
{
    return data.replace( new RegExp( "(" + preg_quote( search ) + ")" , 'gi' ), "<span style = \"background-color: #FFFA66\">$1</span>" );
}

function pagePosts(searchPosts, page, scroll) {
	var text = "";
	for (i = (page - 1) * 5; i < (page - 1) * 5 + 5; i++) {
		if (searchPosts != null) {
			if (searchPosts.length > i) {
				var postText = searchPosts[i]['text'];
				if ($('#search-second').val() != null && $('#search-second').val() != '') {
					postText = highlight( postText, $('#search-second').val());
				}
				text += "<div id='post" + i + "' class='col-sm-12 blogpost'><small> <p class='muted' style='float:right;'>" + searchPosts[i]['date'] + "</p></small><h5>" + searchPosts[i]['title'] + "</h5><p>" + postText + "</p><hr/></div>";
			}
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
		
		if (i == Math.ceil(searchPosts.length / 5) - 1 && page != Math.ceil(searchPosts.length / 5)) {
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