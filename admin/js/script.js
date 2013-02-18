//author= blackmwana
$(document).ready(function() {
    var LoginView = Backbone.View.extend({
        el: 'body',
        events: {
            "click #login-btn": "validate",
            //"click #problems-btn":"problem",
            "keypress #pass #username": "onEnter"
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
            if (e.keyCode == 13) {
                if ($('#pass').val().replace(/\W/g, '') === '') $('#pass').focus();
                else if ($('#username').val().replace(/\W/g, '') === '') $('#username').focus();
                else this.validate();
            }

        },
        validate: function() {

            var u = $('#username').html().replace(/\W/g, '');
            var p = $('#pass').html().replace(/\W/g, '');
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

        }
    });

    var AppView = Backbone.View.extend({
        el: 'body',
        events: {

        },
        initialize: function() {

        },
        render: function() {
            return this;
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
majokosiApp= new AppRouter();
console.log("app launched")
Backbone.history.start();
console.log("backbone history start")
});