/** @odoo-module **/
/* Copyright 2018 ACSONE SA/NV
License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*/

import SurveyFormWidget from '@survey/js/survey_form';

SurveyFormWidget.include({
    events: Object.assign({}, SurveyFormWidget.prototype.events, {
        "click .rate > label": "_onClickFiveStarLabel",
    }),
    _onClickFiveStarLabel: function (event) {
        if (this.readonly) {
            return;
        }
        var target = event.target;
        var label_items = $(target).parent().find("label");
        var value = label_items.length - $(target).index();
        label_items.removeClass("checked fa-star").addClass("fa-star-o");
        label_items
            .slice($(target).index())
            .addClass("checked fa-star")
            .removeClass("fa-star-o");
        var $input = $(target).parent().find("input");
        $input.val(value);
        // We will trigger the change in order to make it compatible with conditional.
        // If it is not installed, it has no effects
        $input.trigger("change");
    },
    _prepareSubmitValues: function (formData, params) {
        this._super.apply(this, arguments);
        this.$("[data-question-type]").each(function () {
            switch ($(this).data("questionType")) {
                case "star_rate":
                    params[this.name] = this.value;
                    break;
            }
        });
    },
});
