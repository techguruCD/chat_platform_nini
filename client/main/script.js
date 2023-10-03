var friendCont = $('#friend-container').find('.friend-grid');
friendCont.find('.friend').each(function(i){
	// top 8
	// work in progress
	var top8 = [
		{
			name: 'Tom',
			link: 'https://twitter.com/myspacetom',
			avi: 'https://pbs.twimg.com/profile_images/1237550450/mstom.jpg'
		},{
			name: 'SBF',
			// link: 'https://twitter.com/HBOB',
			link: 'https://x.com/sbf_ftx',
			avi: 'https://media.discordapp.net/attachments/1147171068134572154/1151148606628307035/JCK-Sam-Bankman-Fried.png?width=675&height=675'
		},{
			name: 'Richard ♡',
			// link: 'https://twitter.com/me0wmixgg',
			link: 'https://x.com/richardheartwin',
			avi: 'https://cdn.discordapp.com/attachments/1147171068134572154/1151148913638785094/Screenshot-4503-compressed.png'
		},{
			name: 'Fall Out Boy',
			// link: 'https://twitter.com/falloutboy',
			link: 'https://x.com/falloutboy',
			avi: 'https://25.media.tumblr.com/1a4575a2e698556074ab557e61b4cc41/tumblr_myy5ptzX2l1rew3aco1_500.png'
		},{
			name: 'Ronaldinho',
			link: 'http://#',
			avi: './image (2).png'
		},{
			name: 'Vitalik',
			link: 'https://x.com/vitalikbuterin',
			avi: 'https://cdn.discordapp.com/attachments/1147171068134572154/1151149299485376616/1200px-VitalikButerinProfile-1024x878.png'
		},{
			name: 'Gigachad',
			// link: 'https://twitter.com/Skrillex',
			link: 'https://twitter.com/MikeOHearn',
			avi: 'https://cdn.discordapp.com/attachments/1147171068134572154/1151149450786521228/proof-that-gigachad-is-fake-v0-jfxxgjw1l4ja1.png'
		},{
			name: 'Pajeet',
			link: 'https://x.com/pajeet',
			avi: 'https://media.discordapp.net/attachments/1147171068134572154/1151146463074734141/n17f9apmtdk11.png?width=675&height=675'
		}
	];
	// this should be where are the photos and names are appended
	var tempPhoto = 'http://www.fillcollins.place/32';
	var tempUser = 'Friend '
	$(this).find('.name').attr('href', top8[i].link).text(top8[i].name);
	$(this).find('.photo').attr('src', top8[i].avi);
});
var addComment = $('#triggerComment');
// dates and stuff
var d = new Date();
var month = d.getMonth();
var day = d.getUTCDate().toString();
var year = d.getUTCFullYear().toString();
var dob = '1990-06-28';
var str = dob.split('-');    
var firstdate = new Date(str[0],str[1],str[2]);
var dayDiff = Math.ceil(d.getTime() - firstdate.getTime()) / (1000 * 60 * 60 * 24 * 365);
var age = parseInt(dayDiff);

var monthsFull = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
for (i = 0; i < monthsFull.length; i++) {
	if( month == [i]) {
		month = monthsFull[i];
	}
}
var today = month + ' ' + day + ', ' + year;

$('.user-info .identity .details ul').find('li').find('.date').text(today);
$('.user-info .identity .details ul').find('li').find('.age').text(age);

$('.friend-grid .friend').find('.photo').on('click', function(){
	$(this).parent().find('a')[0].click();
});
var commentCount = $('.comment-stream').find('.comment').length;
$('.comments-to-display').find('b:last-child').text(commentCount);
addComment.on('click', comment);
function comment() {
	var commentParent = $('.comment-stream');
	var postDate = today;
	var name = '';
	var img = '#';
	var comment = '';
	var template = '<div class="comment is--posting">\
						<div class="dp-group">\
							<a href="#" class="prof-name">'+ name +'</a>\
							<input id="imgUp" name="images" type="file" />\
							<p contenteditable>Name'+ name +'</p>\
							<span class="user-status"></span>\
						</div>\
						<div class="comment-cont">\
							<div class="post-info">\
								<span class="date">'+ postDate +'</span>\
								<div class="c-actions">\
									<ul class="inline-list">\
										<li><a id="commentSave" href="#">Save Comment</a></li>\
									</ul>\
								</div>\
							</div>\
							<div class="message-body" contenteditable>Lorem Ipsum'+ comment +'</div>\
						</div>\
					</div>';
	event.preventDefault();
	commentParent.prepend(template);
	
	//$('#commentSave')
	
	$('#imgUp').change(imgUpload);
	// $('.is--posting .dp-group').find('p').on('keyup', function(){
	// 	// var copy = $(this).text();
	// 	name = copy;
	// });
	var copy = $('.is--posting .dp-group').find('p');
	var oldText = copy.text();
	copy.blur(function() {
		if (oldText != $(this).text()){
			name = $(this).text();
			$('.is--posting').find('.prof-name').text(name);
		}
	});
}

// $('.btn').click(function(){
// 	if ($(this).attr('intent') == 'reply') {
// 		popup('https://twitter.com/intent/tweet?via=ltrademark', 550, 300);
// 	} else if ($(this).attr('intent') == 'add') {
// 		popup('https://twitter.com/intent/follow?screen_name=ltrademark', 550, 620);
// 	}
// });

$('.chat-link').click(function() {
	popup('/chat', 800, 800);
})


function imgUpload(e) {
    var inputFiles = this.files;
    if(inputFiles == undefined || inputFiles.length == 0) return;
    var inputFile = inputFiles[0];

    var reader = new FileReader();
    reader.onload = function(event) {
			var image = event.target.result;
			// console.log($(this).parent());
			$('.is--posting .prof-name').after('<img src="'+ image +'" alt="profile photo" />');
			$('#imgUp').remove();
    };
    reader.onerror = function(event) {
			console.log(event.target.error.code);
    };
    reader.readAsDataURL(inputFile);
}