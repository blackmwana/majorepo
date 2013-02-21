//author= blackmwana
Backbone.View.prototype.close = function() {
        //http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
        console.log(this.localName);
        console.log(this);
        if (this.el.tagName.toLowerCase() === 'body') {
            $('body').empty();
            console.debug('emptying body');
        }
        else {
            this.remove(); //el.remove
            console.debug(this.el + ': removing view  el');
        }
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    }
    //////////////////
$(document).ready(function() {
    
    
    var curAdmin;
    var cats;
    var mainView;
    // if(!curAdmin)alert ('curadmin not set');
    var Cat = StackMob.Model.extend({
        schemaName:'cat'
    });
    var Cats = StackMob.Collection.extend({
        model:Cat
    });
   
    
    var LoginView = Backbone.View.extend({
        el: 'body',
        events: {
            "click #login-btn": "validate",
            "click #problems-btn":"problem",
            "keypress #username": "onEnter",
            "keypress #pass": "onEnter"
        },
        initialize: function() {
            this.template = _.template($('#item-login').html());
          //  this.render();//rendering in this.brm 
        },
        render: function() {
            var el = this.$el;
         //   el.empty();
            el.append(this.template());
            return this;
        },
        onEnter: function(e) {
            console.debug(e.keyCode);
            if (e.keyCode == 13) {
                if ($('#username').val().replace(/\W/g, '') === '') $('#username').focus();
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
                    console.debug(model);//assign this to user object
                    
                    console.debug(' navigating to main view');
                    majokosiAdminApp.navigate('/home',true);
                },
                error: function(model, response) {
                    console.debug(response);
                }
            });
            console.debug(user);
        },
        loginError: function() {
            console.debug('login error function called');
        },
        problem:function(){
            console.debug('having problems');//problemview on body
            majokosiAdminApp.navigate('/problem',true);
        }
    });

    var MainView = Backbone.View.extend({
        el: 'body',
        events: {
            "click #menu-btn":"showSidebar",
            "click #home-btn":"navHome",
            "click .user-login":"showUserDialogue"
        },
        initialize: function() {
            this.template=_.template($('#item-main').html());
            //this.render();//rendering in this.brm 

        },
        render: function() {
            var el= this.$el;
        //    el.empty();
            el.append(this.template());
            //removing this next part to implement region managers
            //this.homeView = new HomeView();
        //    $('.view-container').append(this.homeView.render().el);
          //  this.goHome();
            return this;
        },
        showSidebar:function(){
            console.debug('show sidebar');
        },
        navHome:function(){
            majokosiAdminApp.navigate('/home',true);
        },
        goHome: function(){
            console.debug('going home, showing homeview');
            this.homeView = new HomeView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.homeView);
        },
         goCats: function(){
            console.debug('going cats, showing catsview');
            this.catsView = new CatsView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.catsview);
        },
         goUsers: function(){
            console.debug('going users, showing usersview');
            this.usersView = new UsersView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.usersView);
        },
         goJokes: function(){
            console.debug('going jokes, showing jokesview');
            this.jokesView = new JokesView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.jokesView);
        },
         goStats: function(){
            console.debug('going stats, showing statsview');
            this.statsView = new StatsView();
           // majokosiAdminApp.navigate('/home',true);
           majokosiAdminApp.prm.showView(this.statsView);
        },
        showUserDialogue:function(){
            console.debug('user dialog');
        }
    });
    var HomeView = Backbone.View.extend({
        /*el: '',*/
        id:"home-content",
        className:"page-region-content tiles", 
        events: {
            'click #cats-pane': 'goToCats',
            'click #stats-pane': 'goToStats',
            'click #jokes-pane': 'goToJokes',
            'click #users-pane': 'goToUsers'
        },
        initialize: function() {
            this.template=_.template($('#item-home').html());
        },
        render: function() {
            var el=this.$el;
          //  $('.page-region-content').remove();
            el.append(this.template());
         
            return this;
        },
        goToUsers:function(){
            //navigate
             majokosiAdminApp.navigate('/users',true);
        },
        goToCats:function(){
             majokosiAdminApp.navigate('/categories',true);
        },
        goToJokes:function(){
             majokosiAdminApp.navigate('/jokes',true);
        },
        goToStats:function(){
             majokosiAdminApp.navigate('/statistics',true);
        }
    });
     var CatsView = Backbone.View.extend({
        //el: '',
        id:"cat-content",
        className:"page-region-content ",
        events: {

        },
        initialize: function() {
            this.template= _.template($('item-cats').html());
        },
        render: function() {
            var el=this.$el;
          //  $('.page-region-content').remove();
            el.append(this.template());
            return this;
        }
    });
    var UsersView = Backbone.View.extend({
        id:"user-content",
        className:"page-region-content ",
        events: {

        },
        initialize: function() {
            this.template= _.template($('item-users').html());
        },
        render: function() {
            var el=this.$el;
          //  $('.page-region-content').remove();
            el.append(this.template());
            return this;
        }
    });
    var JokesView = Backbone.View.extend({
                //el: '',
        id:"joke-content",
        className:"page-region-content ",
        events: {

        },
        initialize: function() {
            this.template= _.template($('item-jokes').html());
        },
        render: function() {
            var el=this.$el;
        //    $('.page-region-content').remove();
            el.append(this.template());
            return this;
        }
    });
    var StatsView = Backbone.View.extend({
            //el: '',
        id:"stat-content",
        className:"page-region-content ",
        events: {

        },
        initialize: function() {
            this.template= _.template($('item-stats').html());
        },
        render: function() {
            var el = this.$el;
           // $('.page-region-content').remove();
            el.append(this.template());
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
    var NavBarView = Backbone.View.extend({
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
    function BodyRegionManager() { //for body top level views
        this.showView = function(view) {
            if (this.currentView !== view) {
                if (this.currentView) {
                    this.currentView.close();
                }
                this.currentView = view;
                //this.currentView.render();
                //$("body").html(this.currentView.render().el);
                this.currentView.render();
            }
            else console.debug('cant close and open the same view');
    
        }
    }
    var AppRouter = Backbone.Router.extend({
        routes:{
            '':'login',
            'home':'main',
            'statistics':'toStats',
            'categories':'toCats',
            'users':'toUsers',
            'jokes':'toJokes',
            'problem':'toProblem'
        },
        initialize:function(){
            this.prm = new PageRegionManager();
            this.brm = new BodyRegionManager();
        },
        login:function(){
            console.log("login route");
            $('body').empty();
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
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    //ar.navigate('/home',true)
                    if(!mainView) mainView = new MainView();
                    ar.brm.showView(mainView);// user model to be passed into the constructor
                    mainView.goHome();
                    
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
        toStats:function(){
             
             console.debug('tostats function :routing to stats view');
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    //ar.navigate('/home',true)
                    if(!mainView) mainView = new MainView();
                    ar.brm.showView(mainView);// user model to be passed into the constructor
                   mainView.goStats();
                    
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
        toCats:function(){
             
              console.debug('tocats function :routing to catsview');
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    //ar.navigate('/home',true)
                    if(!mainView) mainView = new MainView();
                    ar.brm.showView(mainView);// user model to be passed into the constructor
                    mainView.goCats();
                    
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
        toJokes:function(){
            
              console.debug('tojokes function :routing to jokes view');
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    //ar.navigate('/home',true)
                    if(!mainView) mainView = new MainView();
                    ar.brm.showView(mainView);// user model to be passed into the constructor
                    mainView.goJokes();
                    
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
        toUsers:function(){
             
              console.debug('to users function :routing to users view');
            ar = this;
            StackMob.isLoggedIn({
                yes:function(username){
                    console.log(username+" :is logged in");
                    //get user and navigate to home
                  //  majokosiAdminApp.navigate('/home',true)
                    //ar.navigate('/home',true)
                    if(!mainView) mainView = new MainView();
                    ar.brm.showView(mainView);// user model to be passed into the constructor
                   mainView.goUsers();
                    
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
        toProblem:function(){
            console.debug('problem route fired');
        }
    });
majokosiAdminApp = new AppRouter();
console.log("app launched")
Backbone.history.start();
console.log("backbone history start")
});