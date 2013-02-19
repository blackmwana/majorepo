//author= blackmwana
$(document).ready(function() {
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
            this.render();

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
                    console.debug(model);
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
            "click #menu-btn":"showMenu",
            "click #home-btn":"goHome",
            "click.user-login":"showUserDialogue"
        },
        initialize: function() {
            this.template=_.template($('item-main').html());
            this.render();

        },
        render: function() {
            var el= this.$el;
            el.empty();
            el.append(this.template());
            this.homeView = new HomeView();
            $('.view-container').append(this.homeView.render().el);
            return this;
        },
        showSidebar:function(){
            console.debug('show sidebar');
        },
        goHome: function(){
            console.debug('going home');
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
            this.template=_.template($('item-home').html());
        },
        render: function() {
            var el=this.$el;
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
    var AppRouter = Backbone.Router.extend({
        routes:{
            '':'login'
        },
        login:function(){
            console.log("login route");
            StackMob.isLoggedIn({
                yes:function(){
                    console.log(" a user is logged in");
                },
                no:function(){
                    console.log("no user logged in");
                    new LoginView();
                }/*,
                error:function(){
                    console.log("error");
                }*/
            });
        }
    });
majokosiAdminApp = new AppRouter();
console.log("app launched")
Backbone.history.start();
console.log("backbone history start")
});