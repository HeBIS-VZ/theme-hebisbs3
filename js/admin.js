$(document).ready(function() {
    /* Static Pages: Toggle the visibility symbol */
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

    /* instantiate Summernote Editor */
    $('.wysiwig-text').summernote({
        height: 200
    });

    $('.bc-toggle').bootstrapToggle();

    $('#lang-tabs a[href|="#German"]').tab('show');

    /* select current lang tab */
    $('.sp-form-de').addClass('in active');


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


    /* –––––––––––– End of Static Pages ––––––––––––– */
});