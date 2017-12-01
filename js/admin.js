/*document.addEventListener("keyup", function (e) {
});*/

$(document).ready(function() {

    var develeopementMode = true;

    /*if(develeopementMode){
        $("#new-post :input").attr('value', 'Irgendwas');
    }*/

    var userLang = $('html').attr('lang');

    $('.admin-page-visibility').click(function () {
        var _this = this;
        var url = $(this).attr('href');
        $.getJSON(url)
            .done(function (output) {
                if (output.status === 'OK')
                    $(_this).toggleClass('hds-icon-eye green').toggleClass('hds-icon-eye-off red');
            });
    });

    $('.admin-delete-button').on('click', function () {
        var url = $(this).attr('href');
        var uid = $(this).attr('id');
        var fadeItem = $(this).parent();

        /* customize the header in modal confirmation question */
        $('#admin-del-header').remove();
        $('#admin-delete-question').after("<p id='admin-del-header'><i>\"<strong>" + $(this).data('href') + "</strong>\"</i></p>");
        $('#admin-delete-confirmation').modal();

        $('#delete-confirmation-button').on('click', function () {
            $.getJSON(url)
                .done(function (JSONoutput) {
                    if (JSONoutput.data === 1) {
                        $(fadeItem).fadeOut('fast');
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

    /*$("#new-post").submit(function (event) {

        var inputs = $(this).serializeArray();
        var author = inputs[10].value;
        // var $contents = $('.wysiwig-text');
        var i = -1;
        inputs.splice(5,1,inputs[5].text());

        if (author == "") {
            $('#sp-author').addClass('has-error');
            event.preventDefault();
        }

        if ($('#summernote').summernote('isEmpty')) {
            alert('contents is empty');
        }

        else $('#sp-author').removeClass('has-error');

        if (inputs.every(!hasNoEmptyValue))
            $('#sp-save').popover();
        else {
            $('#sp-save').popover();
            event.preventDefault();
        }

    });

    function hasNoEmptyValue(input) {
        return input.value.length > 0;
    }*/


});