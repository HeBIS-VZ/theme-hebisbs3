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
    });

    $('.a[data-toggle="tab"]').on('click', function () {
        var selectedLang = $(this).attr('lang');
    });

    $('.bc-message').keyup(function () {
        $(this).parent().parent().parent().parent().find('.bc-alert').html($(this).val());
    });

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $('#admin-lang-tab-' + userLang).tab('show');
    /* $("#new-post").submit(function (event) {

        var inputs = $(this).serializeArray();
        var author = inputs[8].value;
        var $contents = $('.wysiwig-text');
        var i = -1;
        $contents.each(function () {

            inputs.splice(i += 4, 1,
                {
                    name: "sp-content[]",
                    value: $($(this).summernote('code')).text()
                }
            );
        });

        if (author == "") {
            $('#sp-author').addClass('has-error ');
            event.preventDefault();
        }
        else $('#sp-author').removeClass('has-error');

        if (inputs.every(hasNoEmptyValue))
            $('#sp-save').popover('destroy');
        else {
            $('#sp-save').popover('show');
            event.preventDefault();
        }

    });

    function hasNoEmptyValue(input) {
        return input.value.length > 0;
    }*/


});