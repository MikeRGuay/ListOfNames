/**
 * Created with JetBrains WebStorm.
 * User: mguay
 * Date: 11/12/12
 * Time: 12:52 PM
 * To change this template use File | Settings | File Templates.
 */
    // The Application Router
    // ----------------------
    //
window.NameRouter = Backbone.Router.extend({
    routes: {
        'contents' : 'contents'
    },
    contents: function () {
        $('body').html(new AppView().render);
    }
});
