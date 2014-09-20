define('SubjectsView', ['jquery', 'underscore', 'backbone', 'tinycolor', 'pickacolor', 'SubjectModel', 'SubjectView'],
    function($, _, Backbone, tinycolor, pickacolor, SubjectModel, SubjectView) {
    window.tinycolor = tinycolor;

    var SubjectsView = Backbone.View.extend({

        selectors: {
            addSubjectButton: '.create',
            cancelButton: '.cancelBtn',
            createSubjectButton: '.saveBtn',
            subjectTitleInput: '.subjectTitle',
            subjectBackground: '.subjectBackground',
            colorPickerInput: '.pick-a-color',
            subjectContainer: '.tab-content .active'
        },

        template: _.template($('#createSubjectModalWindowTemplate').html()),

        initialize: function(options) {
            this.collection = options.collection;
            $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
        },

        /* PRIVATE METHODS */

        _attachEvents: function() {
            this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubjectInCollection, this));
        },


        /**
         * Add new subject in collection
         */
        _addNewSubjectInCollection: function() {
            var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
            var subjectModel = new SubjectModel;

            if (subjectTitle) {
                subjectModel.setTitleAttribute(subjectTitle);
                subjectModel.setColorAttribute("#" + this.$(this.selectors.colorPickerInput).val());
                $(this.selectors.subjectContainer).append(new SubjectView({
                    model: subjectModel
                }).render().el);
                this.collection.add(subjectModel);
            }
        },

        /* PUBLIC METHODS */

        render: function() {
            this.$el = $(this.template());
            this.$el.modal('show');
            this.$(this.selectors.colorPickerInput).pickAColor();
            this._attachEvents();
            return this;
        }
    });

    return SubjectsView;
});
