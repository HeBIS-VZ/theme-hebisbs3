/**
 * Created by sebastian on 04.07.16.
 */

$(document).ready(function() {

    /** language switch */
    $('.lang-switch').click(function(event){
        event.preventDefault();
        var code = $(this).data("langcode");
        $("#mylang").val(code);
        var $form = $('#langForm');
        $form.submit();
    });

    
});