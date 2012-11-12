// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {

    // Create our global collection of **Todos**.
    window.Todos = new TodoList;

    window.Router = new NameRouter();
    Backbone.history.start();

    window.Router.navigate('contents', {trigger:true});

});