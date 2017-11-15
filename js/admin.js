document.addEventListener("keyup", function (e) {
    e.target.id
});

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

    /* Toggle the visibility icon of static page */
    $('.sp-delete-button').on('click', function () {
        var url = $(this).attr('href');
        var $parentRow = $(this).parent().parent();

        /* customize the header in modal confirmation question */
        $('#sp-del-header').remove();
        $('#sp-delete-question').after("<p id='sp-del-header'><i>\"<strong>" + $parentRow.data('href') + "</strong>\"</i></p>");
        $('#sp-delete-confirmation').modal();

        $('#delete-confirmation-button').on('click', function () {
            $.getJSON(url)
                .done(function (JSONoutput) {
                    if (JSONoutput.data === 1) {
                        $parentRow.fadeOut();
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
        $(this).parent().parent().find('.bc-alert').html($(this).val());
    });

    $('#bc-lang-tab-' + userLang).tab('show');
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $('#sp-lang-tab-' + userLang).tab('show');

    /* select current lang tab */
    //$('.sp-form-' + userLang).addClass('active in');


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

    /* instantiate Summernote Editor */
    $('.wysiwig-text').summernote({
        height: 200
    });

});