
var app = {
	settings: {
		url:'https://www.reddit.com/r/videos.json',
		videos: []
	},

	init: function(){
		var url = app.settings.url;

		console.log(url);



		$.ajax({
			type: "get",
			url: "./video.html",
			success: function(msg){
				app.settings.video_template = msg;
				console.log(app.settings.video_template);
			}
		});

		app.getData(url, function(data){
			console.log('data', data);
			app.processVideos(data);
		});

	},

	processVideos : function(data){
		console.log(data.children);

		for (var i = data.children.length - 1; i >= 0; i--) {
			if(data.children[i].data.domain == ('youtube.com' || 'youtu.be' || 'm.youtube.com')){
				if(data.children[i].data.url.replace('https://www.youtube.com/watch?v=', '').length == 11){
					app.settings.videos.push({'video' : data.children[i].data.url.replace('https://www.youtube.com/watch?v=', '')});
				}
			}
		}

		app.processData(app.settings.videos);
	},

	getData : function(url, callback){
		$.getJSON(url, function(json, textStatus) {
			/*optional stuff to do after success */
			if(textStatus === 'success'){
				callback(json.data);
			} else {
				console.log('error =', textStatus );
			}
		});
	},

	processData : function(data){
		console.log(data.length, data);

		var video_template = _.template(app.settings.video_template);

		// iterate over this and inject into template
		_.each(data, function(data){
			$('.main').append(video_template(data));
		});

		$('.video').fitVids();
	}
};



window.onload = function(){
	if('querySelector' in document && 'addEventListener' in window) {
		// bootstrap the javascript application
		console.log('HTML Partials');
		app.init();
	}
};
