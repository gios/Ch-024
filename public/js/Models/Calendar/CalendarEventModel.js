define('CalendarEventModel', ['jquery', 'underscore', 'backbone', 'SubjectModel'], function($, _, Backbone, SubjectModel) {
    var CalendarEventModel = Backbone.Model.extend({

        urlRoot: '/events',

        defaults: function() {
            return {
                _id: '',
                subject: SubjectModel,
                title: '',
                start: null,
                end: null,
                editable: true,
                color: '',
                textColor: 'red',
                classroom: '',
                amountOfStudents: 0,
                currentCount: 0,
                cid: 0
            }
        },

        deleteEvent: function() {
            this.destroy();
        },

        getId: function() {
            return this.get('_id');
        },

        setSubject: function(value) {
            this.set('subject', value);
        },

        getSubject: function() {
            return this.get('subject');
        },

        setTitle: function(value) {
            this.set('title', value);
        },

        getTitle: function() {
            return this.get('title');
        },

        setStart: function(value) {
            this.set('start', value);
        },

        getStart: function() {
            return this.get('start');
        },

        setEnd: function(value) {
            this.set('end', value);
        },

        getEnd: function() {
            return this.get('end');
        },

        setEditable: function(value) {
            this.set('editable', value);
        },

        getEditable: function() {
            return this.get('editable');
        },

        setColor: function(value) {
            this.set('color', value);
        },

        getColor: function() {
            return this.get('color');
        },

        setTextColor: function(value) {
            this.set('textColor', value);
        },

        getTextColor: function() {
            return this.get('textColor');
        },

        setClassroom: function(value) {
            this.set('classroom', value);
        },

        getClassroom: function() {
            return this.get('classroom');
        },

        setAmountOfStudents: function(value) {
            this.set('amountOfStudents', value);
        },

        getAmountOfStudents: function() {
            return this.get('amountOfStudents');
        },

        getCid: function() {
            return this.get('cid');
        },

        setCid: function(value) {
            return this.set('cid', value);
        },

        validate: function(attrs) {
            var errors = [];
            if (attrs.classroom <= 1) {
                errors.push({
                    field: 'classForExam',
                    message: 'The number of classroom is required and must be number!'
                });
            }
            if (isNaN(+(attrs.amountOfStudents))) {
                errors.push({
                    field: 'amountOfStud',
                    message: 'The amount of students is required and must be number!!'
                });
            }
            
            return errors.length ? errors : false;
        }

    });

    return CalendarEventModel;
});
