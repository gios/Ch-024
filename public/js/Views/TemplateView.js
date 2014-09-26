define('TemplateView', [
        'jquery',
        'underscore',
        'backbone',
        'text',
        'text!../js/Templates/navBarTemplate.html',
        'text!../js/Templates/footerTemplate.html',
        'text!../js/Templates/aboutTemplate.html',
        'text!../js/Templates/homeTemplate.html',
        'text!../js/Templates/helpTemplate.html',
        'text!../js/Templates/settingsTemplate.html'],

    function($,
            _,
            Backbone,
            text,
            navBarTemplate,
            footerTemplate,
            aboutTemplate,
            homeTemplate,
            helpTemplate,
            settingsTemplate) {

        var TemplateView = [];

        var NavBarTemplateView = Backbone.View.extend({

            template: _.template(navBarTemplate),

            selectors: {
                headerTeg: 'header'
            },

            render: function() {
                $(this.selectors.headerTeg).html(this.template());

                return this;
            }
        });

        var FooterTemplateView = Backbone.View.extend({

            template: _.template(footerTemplate),

            selectors: {
                footerTag: 'footer'
            },

            render: function() {
                $(this.selectors.footerTag).html(this.template());
                return this;
            }
        });



        for (var i = 6; i < arguments.length; i++) {
            TemplateView[i-6] = Backbone.View.extend({

                template: _.template(arguments[i]),

                selectors: {
                    mainTag: 'main'
                },

                render: function() {
                    $(this.selectors.mainTag).html(this.template());
                    return this;
                }
            });
        };



        // var AboutTemplateView = Backbone.View.extend({

        //     template: _.template(aboutTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        // var HelpTemplateView = Backbone.View.extend({

        //     template: _.template(helpTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        // var SettingsTemplateView = Backbone.View.extend({

        //     template: _.template(settingsTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        return {
            NavBarTemplateView: NavBarTemplateView,
            FooterTemplateView: FooterTemplateView,
            AboutTemplateView: TemplateView[0],
            HomeTemplateView: TemplateView[1],
            HelpTemplateView: TemplateView[2],
            SettingsTemplateView: TemplateView[3]
        };
    });
