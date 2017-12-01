/*document.addEventListener("keyup", function (e) {
});*/

$(document).ready(function() {
    /* Static Pages: Toggle the visibility symbol */

    var userLang = $('html').attr('lang');

    $('.sp-page-visibility').click(function () {
        var _this = this;
        var url = $(this).attr('href');
        $.getJSON(url)
            .done(function (output) {
                if (output.data === true) {
                    $(_this).find('span').addClass('hds-icon-eye green');
                    $(_this).find('span').removeClass('hds-icon-eye-off red');
                } else if (output.data === false) {
                    $(_this).find('span').addClass('hds-icon-eye-off red');
                    $(_this).find('span').removeClass('hds-icon-eye green');
                }

            });
    });

    $('.admin-delete-button').on('click', function () {
        var url = $(this).attr('href');

        /* customize the header in modal confirmation question */
        $('#admin-del-header').remove();
        $('#admin-delete-question').after("<p id='admin-del-header'><i>\"<strong>" + $(this).data('href') + "</strong>\"</i></p>");
        $('#admin-delete-confirmation').modal();

        $('#delete-confirmation-button').on('click', function () {
            $.getJSON(url)
                .done(function (JSONoutput) {
                    if (JSONoutput.data === 1) {
                        $(this).parent().fadeOut();
                    }
                    else alert(JSONoutput.status);
                });
        })
    });


    /* ~~~~~~~~~~~~~~~~~~~~Broadcasts~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $('.bc-types input[type=radio]').on('change', function () {

        $('.bc-alert').removeClass(function (index, className) {
            var match = className.match(/alert-([a-z]+)/g);
            return match.shift();
        }).addClass('alert-' + this.value);
        $('.bc-types input[type=radio]').removeClass("active");
        $('.bc-types input[type=radio]').attr('checked',false);
        $(this).addClass("active");
        $(this).attr("checked", "checked");
        //console.log($(this).children('input'));
    });

    $('.a[data-toggle="tab"]').on('click', function () {
        var selectedLang = $(this).attr('lang');
    });

    var lambdaSyncInput = function() {
        var lang = $(this).data('lang');
        $('#bc-alert-' + lang).html($('#bc-message-' + lang).val());
    };

    $('.bc-message').keyup(lambdaSyncInput);
    $('.bc-alert').each(lambdaSyncInput);
    $('.bc-alert').each(function(i, item) {
        $(this).removeClass(function (index, className) {
            var match = className.match(/alert-([a-z]+)/g);
            return match.shift();
        });
        $(this).addClass("alert-" + $('input[name=bc-type]:checked').val());
    });
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $('#admin-lang-tab-' + userLang).tab('show');

});