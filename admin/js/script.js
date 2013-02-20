//author= blackmwana
$(document).ready(function() {
    //http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
    Backbone.View.prototype.close = function() {
        console.log(this.toJSON);
        if(this.el ==='body'){ 
            $('body').empty();
        console.debug('emptying body');
        }
        else {this.remove();//el.remove
        console.debug(this.el+': removing view  el');
        }
        this.unbind();
        if(this.onClose) {
            this.onClose();
        }
    }
    //////////////////
    var LoginView = Backbone.View.extend({
        el: 'body',
        events: {
            "click #login-btn": "validate",
            //"click #problems-btn":"problem",
            "keypress #username": "onEnter",
            "keypress #pass": "onEnter"
        },
        initialize: function() {
            this.template = _.template($('#item-login').html());
          //  this.render();//rendering in this.brm 
        },
        render: function() {
            var el = this.$el;
            el.empty();
            el.append(this.template());
            return this;
        },
        onEnter: function(e) {
            console.debug(e.keyCode);
            if (e.keyCode == 13) {
                if ($('#username').val().replace(/\W/g, '') === '') $('#sername').focus();
                else if ($('#pass').val().replace(/\W/g, '') === '') $('#pass').focus();
                else this.validate();
            }

        },
        validate: function() {
            var u = $('#username').val().replace(/\W/g, '');
            var p = $('#pass').val().replace(/\W/g, '');
            console.log('user: ' + u + " password: " + p);
            if (p === '' || u === '') this.loginError();
            else this.admin_login(u, p);
        },
        //logging in---------------------------------------------------------------
        admin_login: function(user_name, user_pass) {
            var user = new StackMob.User({
                username: user_name,
                password: user_pass
            });
            user.login(false, {
                success: function(model) {
                    // redirect user to a new page
                    console.debug(model.toJSON +' navigating to main view');
                    majokosiAdminApp.navigate('/home',true);
                },
                error: function(model, response) {
                    console.debug(response);
                }
            });
        },
        loginError: function() {
            console.debug('login error function called');
        }
    });

    var MainView = Backbone.View.extend({
        el: 'body',
        events: {
            "click #menu-btn":"showSidebar",
            "click #home-btn":"goHome",
            "click.user-login":"showUserDialogue"
        },
        initialize: function() {
            this.template=_.template($('#item-main').html());
            //this.render();//rendering in this.brm 

        },
        render: function() {
            var el= this.$el;
            el.empty();
            el.append(this.template());
            //removing this next part to implement region managers
            //this.homeView = new HomeView();
        //    $('.view-container').append(this.homeView.render().el);
            this.goHome();
            return this;
        },
        showSidebar:function(){
            console.debug('show sidebar');
        },
        goHome: function(){
            console.debug('going home, showing homeview');
            this.homeView = new HomeView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.homeView);
        },
        showUserDialogue:function(){
            
        }
    });
     var HomeView = Backbone.View.extend({
        /*el: '',*/
        id:"home-content",
        className:"page-region-content tiles", 
        events: {

        },
        initialize: function() {
            this.template=_.template($('#item-home').html());
        },
        render: function() {
            var el=this.$el;
            $('.page-region-content').remove();
            el.append(this.template());
         
            return this;
        }
    });
     var CatsView = Backbone.View.extend({
        el: '',
        events: {

        },
        initialize: function() {

        },
        render: function() {
            return this;
        }
    });
    var JokesView = Backbone.View.extend({
        el: '',
        events: {

        },
        initialize: function() {

        },
        render: function() {
            return this;
        }
    });
    var StatsView = Backbone.View.extend({
        el: '',
        events: {

        },
        initialize: function() {

        },
        render: function() {
            return this;
        }
    });
    var SidebarView= Backbone.View.extend({
        el:'',
        events:{
            
        },
        initialize:function(){
            
        },
        render:function(){
            
        }
    });
    function PageRegionManager() {

        this.showView = function(view) {
            if(this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            //this.currentView.render();
            $(".view-container").html(this.currentView.render().el);
        }

    }
    function BodyRegionManager(){//for body top level views
        this.showView = function(view) {
            if(this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            //this.currentView.render();
            //$("body").html(this.currentView.render().el);
            this.currentView.render();
        }
    }
    var AppRouter = Backbone.Router.extend({
        routes:{
            '':'login',
            'home':'main'
        },
        initialize:function(){
            this.prm = new PageRegionManager();
            this.brm = new BodyRegionManager();
        },
        login:function(){
            console.log("login route");
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    ar.navigate('/home',true)
                },
                no:function(){
                    console.log("no user logged in");
                   ar.brm.showView(new LoginView());
                }/*,
                error:function(){
                    console.log("error");
                }*/
            });
        },
        main:function(){
            //check if user is logged on if user object is not there fetch it
            console.debug('main function :routing to main view');
            this.brm.showView(new MainView());// user model to be passed into the constructor
        }
    });
majokosiAdminApp = new AppRouter();
console.log("app launched")
Backbone.history.start();
console.log("backbone history start")
});