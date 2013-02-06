//author= blackmwana
$(document).ready(function() {
    var to = StackMob.Model.extend({
        schemaName: 'testobject'
    });
    var myto = new to();
    myto.fetch({
        success: function(model) {
            console.debug(model.toJSON());
        },
        error: function(model, response) {
            console.debug(response);
        }
    });
        var manifest;
		var preloader;
		var toalLoaded = 0;
	function Preloader() {
	
		manifest = [ //preload all the loadable asssets
		{src: "images/chrome.png",id: "chrome-icon"}
					];
		preloader = new createjs.PreloadJS();
		preloader.onProgress = handleProgress;
		preloader.onComplete = handleComplete;
		preloader.onFileLoad = handleFileLoad;
		preloader.loadManifest(manifest);


		function handleProgress(event) {
			//use event.loaded to get the percentage of the loading
		}

		function handleComplete(event) {
			//triggered when all loading is complete
			//goHome();
		}

		function handleFileLoad(event) {
			//triggered when an individual file completes loading
			switch(event.type) {
				case createjs.PreloadJS.IMAGE:
					handleLoadComplete();
					break;
				case createjs.PreloadJS.SOUND:
					handleLoadComplete();
					break;
			}
		}

		function handleLoadComplete(event) {

			totalLoaded++;

			if(manifest.length == totalLoaded) {
				//addTitleView();
				//goHome
			}
		}
	}
});