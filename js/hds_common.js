/**
 * Created by sebastian on 04.07.16.
 */

userIsLoggedIn = false;

$(document).ready(function () {

    $('.list-group.facet .list-group-item.toggle-more').click(function(event) {
        event.preventDefault();
        id = $(this).data("group");
        $('.' + id).removeClass('hidden');
        $('#more-' + id).addClass('hidden');
        return false;
    });

    $('.list-group.facet .list-group-item.toggle-less').click(function(event) {
        event.preventDefault();
        id = $(this).data("group");
        $('.' + id).addClass('hidden');
        $('#more-' + id).removeClass('hidden');
        return false;
    });

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
        if (document.body.clientWidth >= 768) {
            if ($(window).scrollTop() > (origOffsetY)) {
                $('#height-offset-workaround').height(origOffsetY*2).show();
                navbar.addClass('sticky');
                menu.hide();
                smalllogo.removeClass('hidden-sm').removeClass('hidden-md').removeClass('hidden-lg');
                largelogo.hide();
                $("#main-content").css({marginTop: $("header.header").height()+origOffsetY});
                //$('.main-content').addClass('menu-padding');
                //container.offset({left: origOffsetX});
            } else {
                //$('#height-offset-workaround').hide();
                navbar.removeClass('sticky');
                menu.show();
                smalllogo.addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
                largelogo.show();
                $("#main-content").css({marginTop: 0});
                //$('.main-content').removeClass('menu-padding');
            }
        }
    }

    document.onscroll = scroll;

    processWikipediaLinks();
    processRvkLinks();
    processOtherEditions();

    // support "jump menu" dropdown boxes
    $('select.jumpMenu').change(function() {

        $form = $(this).parent('form');

        if($form.length < 1) {
            $form = $(this).parentsUntil('form').parent();
        }
        $form.submit();
    });

    $('#select-search-handler li a').click(function(event) {
        var value = $(this).data('value');
        var label = $(this).data('label');
        $('#search-option-type').val(value);
        $('#selected-handler').text(label);
        return event;
    });


});

function processRvkLinks() {

    var baseUrl = "https://resolver.hebis.de/rvkffm/";
    $(".rvk_popover").click(function(e) {
        e.preventDefault();
        var $popup = $(this);
        $popup.popover('show');
        return false;
    });

    $(".rvk_popover").each(function(e) {
        var $popup = $(this);
        var id = $popup.data('id');
        var parts = id.split(' ');
        var url = baseUrl + parts[0] + '/' + parts[1];
        $.get(url, function (result) {
            result = eval(result + "RVK;");
            setRvkPopup($popup, id, result);
        }).fail(function (e) {
            setPopup($popup, gndId, {"title":"Error", "extract":"Something gone wrong!"});
            $popup.hide();
        });
    });

    function setRvkPopup($popup, gndId, data) {
        $popup.popover({
            html: true,
            trigger: 'manual',
            placement: 'auto',
            content: function () {
                var contentDiv = $(this).attr("data-popover-content");
                var content = '<p>' + data + '</p>';
                return $(contentDiv).children(".popover-body").html(content).html();
            },
            title: function () {
                var title = $(this).attr("data-popover-content");
                var $header = $(title).children(".popover-heading");
                $header.html("RVK" + '<a data-id="'+gndId+'" class="close" role="button">&times;</a>');
                return $header.html();
            }
        }).on('shown.bs.popover', function (eventShown) {
            var $pop = $('#' + $(eventShown.target).attr('aria-describedby'));
            $pop.find('a.close').click(function (e) {
                e.preventDefault();
                $pop.popover('hide');
            });
        });
    }
}

function processWikipediaLinks() {

    var baseUrl = 'https://resolver.hebis.de/wikimedia/gnd/intro/json/';

    $(".wiki-gnd-popover").click(function(e) {
        e.preventDefault();
        var $popup = $(this);
        $popup.popover('show');
        return false;
    });

    $(".wiki-gnd-popover").each(function(e) {
        var $popup = $(this);
        var gndId = $(this).data('id');
        var url = baseUrl + VuFind.userLang + '/' + gndId;

        $.get(url, function (result) {
            setPopup($popup, gndId, eval(result));
        }).fail(function (e) {
            setPopup($popup, gndId, {"title":"Error", "extract":"Something gone wrong!"});
            $popup.hide();
        });
    });

    function setPopup($popup, gndId, data) {
        $popup.popover({
            html: true,
            trigger: 'manual',
            placement: 'auto',
            content: function () {
                var contentDiv = $(this).attr("data-popover-content");
                var content = '<p>'+data.extract;
                if (data.title !== "Error") {
                    content += '&nbsp;<a href="'+data.location+'"><span class="hds-icon-link-ext"></span>more</a>';
                }
                content += '</p>';
                return $(contentDiv).children(".popover-body").html(content).html();
            },
            title: function () {
                var title = $(this).attr("data-popover-content");
                var $header = $(title).children(".popover-heading");
                $header.html(data.title + '<a data-id="'+gndId+'" class="close" role="button">&times;</a>');
                return $header.html();
            }
        }).on('shown.bs.popover', function (eventShown) {
            var $pop = $('#' + $(eventShown.target).attr('aria-describedby'));
            $pop.find('a.close').click(function (e) {
                e.preventDefault();
                $pop.popover('hide');
            });
        });
    }
}

function processOtherEditions() {
    $("#other-editions").each(function(e) {
        var $otherEditionsContainer = $(this);
        var xid = $(this).data('xid');
        var url = VuFind.path + "/xisbn/xid?type=xid&lookfor=" + xid;

        $.get(url, function (result) {
            $otherEditionsContainer.append(result);
        }).fail(function (e) {
            $(this).hide();
        });
    });
}




function toIso(n) {
    if (n <= 0) {
        n = 1;
    }
    n = n.toString();
    return n + '-01-01T00:00:00Z'
}