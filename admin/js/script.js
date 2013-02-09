//author= blackmwana
$(document).ready(function() {
    var LoginView = Backbone.View.extend({
        el:'body',
        events:{
            
        },
        initialize: function(){
            this.template = _.template($('#login-temp').html());
            
        },
        render: function(){
            return this;
        }
    });
    
    var AppView = Backbone.View.extend({
        el:'body',
        events:{
            
        },
        initialize: function(){
            
        },
        render: function(){
            return this;
        }
    });
	 
});