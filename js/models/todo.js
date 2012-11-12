/**
 * Created with JetBrains WebStorm.
 * User: mguay
 * Date: 11/12/12
 * Time: 12:49 PM
 * To change this template use File | Settings | File Templates.
 */
// Todo Model
    // ----------
    // Our basic **Todo** model has `text`, `order`, and `done` attributes.
window.Todo = Backbone.Model.extend({

    // Default attributes for a todo item.
    defaults: function() {
        return {
            done: false,
            order: Todos.nextOrder()
        };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
        this.save({
            done: !this.get("done")
        });
    }

});