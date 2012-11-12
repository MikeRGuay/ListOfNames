/**
 * Created with JetBrains WebStorm.
 * User: mguay
 * Date: 11/12/12
 * Time: 12:50 PM
 * To change this template use File | Settings | File Templates.
 */
// The Application
    // ---------------
    // The overall **AppView** is the top-level piece of UI. This view contains the list of names views
window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "keypress #new-todo": "createOnEnter",
        "keyup #new-todo": "showTooltip",
        "click .todo-clear a": "clearCompleted"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
        if(window.localStorage.todos.length < 3){
            Todos.create({ text : 'Steve Jobs'});
            Todos.create({ text : 'Bill Gates'});
            Todos.create({ text : 'Mark Zuckerberg'});
            Todos.create({ text : 'Elon Musk'});
            Todos.create({ text : 'Larry Paige'});
            Todos.create({ text : 'Sergey Brin'});
            Todos.create({ text : 'Larry Ellison'});
        }

        this.$("#todo-list").sortable({
            update: function(event, ui) {
                $('div.todo',this).each(function(i){
                    var id = $(this).attr('data-id'),
                        todo = Todos.get(id);
                    todo.save({order: i + 1});
                });
            }
        });

        Todos.bind('add', this.addOne, this);
        Todos.bind('reset', this.addAll, this);
        Todos.bind('all', this.render, this);

        Todos.fetch();
    },


    render: function() {

    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
        var view = new TodoView({
            model: todo
        });
        this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        Todos.each(this.addOne);
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnEnter: function(e) {
        var text = this.input.val();
        if (!text || e.keyCode != 13) return;
        Todos.create({
            text: text
        });
        this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
        _.each(Todos.done(), function(todo) {
            todo.destroy();
        });
        return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
        var tooltip = this.$(".ui-tooltip-top");
        var val = this.input.val();
        tooltip.fadeOut();
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        if (val == '' || val == this.input.attr('placeholder')) return;
        var show = function() {
            tooltip.show().fadeIn();
        };
        this.tooltipTimeout = _.delay(show, 1000);
    }

});