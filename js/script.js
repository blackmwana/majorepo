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
});