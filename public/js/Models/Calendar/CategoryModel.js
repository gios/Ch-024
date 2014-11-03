define('CategoryModel', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var CategoryModel = Backbone.Model.extend({

        urlRoot: '/category',
        idAttribute: "_id",

        defaults: function() {
            return {
                _id: '',
                cid: this.cid,
                title: '',
                authorId: '',
                approved: false
            }
        },

        deleteCategory: function() {
            this.destroy();
        },

        setTitle: function(value) {
            this.set('title', value);
        },

        getTitle: function() {
            return this.get('title');
        },

        setAuthorId: function(value) {
            this.set('authorId', value);
        },

        getAuthorId: function() {
            return this.get('authorId');
        },

        getId: function() {
            return this.get('_id');
        },
        //this cid for bind TabNav and TabNavPane
        getCid: function() {
            return this.get('cid');
        },

        validate: function(attrs) {
            var errors = [];
            if (attrs.title <= 1) {
                errors.push({
                    field: 'categoryTitle',
                    message: 'Title must be longer then 1 sign!'
                });
            }
            return errors.length ? errors : false;
        }

    });

    return CategoryModel;

});
