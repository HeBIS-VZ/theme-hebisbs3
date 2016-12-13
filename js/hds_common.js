/**
 * Created by sebastian on 04.07.16.
 */

userIsLoggedIn = false;

$(document).ready(function() {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    /** language switch */
    $('.lang-switch').click(function(event){
        event.preventDefault();
        var code = $(this).data("langcode");
        $("#mylang").val(code);
        var $form = $('#langForm');
        $form.submit();
    });

    
});