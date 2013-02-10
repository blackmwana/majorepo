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
    //models and collections---------------------------------------------------------------
    // models just rep the strcture at the backend but collections allow array-like manipulation
    var TopDogs = StackMob.Model.extend({
        schemaName:"td"  
    });  
    
    var User = StackMob.Model.extend({
        schemaName:"user"
    });
    var Cat = StackMob.Model.extend({// fetch all data to this variable
       schemaName:"cat"
    });
    var Joke = StackMob.Model.extend({
       schemaName:"joke" 
    });
    var Cats = StackMob.Collection.extend({
        model:Cat
    });
    var LoadingView= Backbone.View.extend({
        
        el:'body',
        
        initialize: function(){
            this.render();
        },
        render:function(){
            var el = this.$el;
            el.empty();
        }
        
    });
    var AppView=Backbone.View.extend({
        
    });
        var manifest;
		var preloader;
		var toalLoaded = 0;
	function Preloader() {
	
		manifest = [ //preload all the loadable asssets
        //fonts
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