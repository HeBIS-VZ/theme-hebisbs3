/**
 * Created by sebastian on 04.07.16.
 */

userIsLoggedIn = false;

$(document).ready(function () {
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    /** language switch */
    $('.lang-switch').click(function (event) {
        event.preventDefault();
        var code = $(this).data("langcode");
        $("#mylang").val(code);
        var $form = $('#langForm');
        $form.submit();
    });

    var navbar = $('.header');
    var menu = $('.menu-bar');
    var smalllogo = $('.input-group-addon');
    var largelogo = $('.navbar-header');
    var origOffsetY = $('.searchbox').offset().top;
    //var origOffsetX = container.left;
    function scroll() {
        if ($(window).scrollTop() > origOffsetY) {
            navbar.addClass('sticky');
            menu.hide();
            smalllogo.removeClass('hidden-sm').removeClass('hidden-md').removeClass('hidden-lg');
            largelogo.hide();
            //$('.main-content').addClass('menu-padding');
            //container.offset({left: origOffsetX});
        } else {
            navbar.removeClass('sticky');
            menu.show();
            smalllogo.addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
            largelogo.show();
            //$('.main-content').removeClass('menu-padding');
        }


    }

    document.onscroll = scroll;

    processWikipediaLinks();

    $('.wiki-gnd-popover').hover(function(){
        $(this).popover('toggle');
    });
});


function processWikipediaLinks() {

    var baseUrl = 'https://resolver.hebis.de/wikimedia/';

    $(".wiki-gnd-popover").each(function (e) {
        var $popup = $(this);
        var gndId = $(this).data('id');
        var url = baseUrl + gndId + '/intro/json/de/gnd';


        $.get(url, function (result) {
            var d = jQuery.parseJSON(result);
            $popup.popover({
                html: true,
                content: function () {
                    var content = $(this).attr("data-popover-content");
                    return $(content).children(".popover-body").html('<p>'+d.extract+'&nbsp;<a href="'+d.location+'"><span class="hds-icon-link-ext"></span></a></p>').html();
                },
                title: function () {
                    var title = $(this).attr("data-popover-content");
                    return $(title).children(".popover-heading").html(d.title).html();
                }
            });
            $popup.attr('href', d.location);

        }).fail(function (e) {
            $popup.popover({
                html: true,
                content: function () {
                    var content = $(this).attr("data-popover-content");
                    var x = $(content).children(".popover-body").html("<p>ERROR 404</p>").html();
                    return x;
                },
                title: function () {
                    var title = $(this).attr("data-popover-content");
                    var x = $(title).children(".popover-heading").html("ERROR").html();
                    return x;
                }
            })
        });
    });
}
