define('SubjectsView', [
    'jquery',
    'underscore',
    'backbone',
    'tinycolor',
    'pickacolor',
    'SubjectModel',
    'CategoryModel',
    'SubjectView',
    'text!createSubjectModalWindowTemplate',
    'text!optionForSelect'
], function(
    $,
    _,
    Backbone,
    tinycolor,
    pickacolor,
    SubjectModel,
    CategoryModel,
    SubjectView,
    createSubjectModalWindowTemplate,
    optionForSelect) {

    window.tinycolor = tinycolor;

    var SubjectsView = Backbone.View.extend({

        selectors: {
            addSubjectButton: '.create',
            cancelButton: '.cancelBtn',
            createSubjectButton: '.saveBtn',
            subjectTitleInput: '.subjectTitle',
            colorPickerInput: '.pick-a-color',
            categoryTitleInput: '.categoryTitle',
            subjectContainer: '.tab-content #'
        },

        template: _.template(createSubjectModalWindowTemplate),
        templateOptionForSelectCategory: _.template(optionForSelect),

        initialize: function(options) {
            $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
            this.collectionSubject = options.collectionSubject;
            this.collectionCategory = options.collectionCategory;
            this.collectionSubject.on('add', $.proxy(this._renderSubject, this));
            this.collectionSubject.fetch();
        },

        _attachEvents: function() {
            this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubject, this));
            this.$el.on('keydown', $.proxy(this._keydownEnterEvent, this));
            this.$(this.selectors.cancelButton).on('click', $.proxy(this._cancelModalWindow, this));
            this.model.on("invalid", $.proxy(this._defineValidationError, this));
        },

        _keydownEnterEvent: function(event) {
            if (event.keyCode == 13) {
                $.proxy(this._addNewSubject(), this)
            };
        },

        _defineValidationError: function(model, errors) {
            this.$('.errors').html('');
            _.each(errors, function(error) {
                this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _addNewSubject: function() {
            var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
            var categoryId = this.$(this.selectors.categoryTitleInput).val();
            var categoryModel = this.collectionCategory.findModelById(categoryId);

            this.model.setTitle(subjectTitle);
            this.model.setColor("#" + this.$('#backgroundColor').val());
            this.model.setTextColor("#" + this.$('#textColor').val());
            this.model.setCategoryId(categoryModel.getId());
            this.model.setAuthorId(Calendar.Controller.session.getUserId());

            if (this.model.save(null, {
                    type: 'POST'
                })) {
                this._cancelModalWindow();
            }
        },

        _renderSubject: function(model) {
            $(this.selectors.subjectContainer +
                this.collectionCategory.findWhere({
                    _id: model.getCategoryId()
                }).get('cid')).append(
                new SubjectView({
                    model: model
                }).render().el);
            this._cancelModalWindow();
        },

        _clearFieldsInModal: function() {
            $(this.selectors.subjectTitleInput).val('');
            $(this.selectors.categoryTitleInput).html('');
        },

        _fillCategoryList: function() {
            this._clearFieldsInModal();

            this.collectionCategory.each(function(model) {
                this.$(this.selectors.categoryTitleInput).append(this.templateOptionForSelectCategory(model.toJSON()));
            }, this);
        },
        _cancelModalWindow: function() {
            this.remove();
            $('.modal-backdrop').hide();
        },

        render: function() {
            this.$el = $(this.template());
            this.$(this.selectors.colorPickerInput).pickAColor();
            this.$el.modal('show');
            this._fillCategoryList();
            this._attachEvents();
            return this;
        }

    });

    return SubjectsView;

});
