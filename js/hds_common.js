/**
 * Created by sebastian on 04.07.16.
 */

userIsLoggedIn = false;

$(document).ready(function () {

    $('.list-group.facet .list-group-item.toggle-more').click(function(event) {
        event.preventDefault();
        var id = $(this).data("group");
        $('.' + id).removeClass('hidden');
        $('#more-' + id).addClass('hidden');
        return false;
    });

    $('.list-group.facet .list-group-item.toggle-less').click(function(event) {
        event.preventDefault();
        var id = $(this).data("group");
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
    var origOffsetY = $('.searchbox').offset().top;

    function scroll() {
        if (document.body.clientWidth >= 768) {
            if ($(window).scrollTop() > (origOffsetY)) {
                $('#height-offset-workaround').height(origOffsetY*2).show();
                navbar.addClass('sticky');
                menu.hide();
                $("#main-content").css({marginTop: $("header.header").height()+origOffsetY});
            } else {
                navbar.removeClass('sticky');
                menu.show();
                $("#main-content").css({marginTop: 0});
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
        //$('#select-search-handler li.active a span.hds-icon-check').remove();
        //$('#select-search-handler li.active a').prepend($('<span class="hds-icon-check-empty"></span>'));
        $('#select-search-handler li.active').removeClass('active');
        $(this).parent().addClass('active');
        //$(this).find('span.hds-icon-check-empty').remove();
        //$(this).prepend($('<span class="hds-icon-check"></span>'));
        return event;
    });
    var urls = {};
    $("#search-tabs > li > a").each(function(){
        var url = $(this).attr('href');
        var id  = $(this).data('id');
        urls[id] = url;
    });
    Object.keys(urls).forEach(function(key) {
        var url = "";
        if (typeof urls[key] != "undefined" && urls[key].match(/lookfor/i)) {
            if (key === "EDS") {
                url = urls[key].replace("Search", "ajax");
            } else {
                url = urls[key].replace("Results", "ajax");
            }
        }
        if (url !== "") {
            $.getJSON(url, function (data) {
                $("#" + key + " > a").append(" <small id=\"eds-count\">(" + data["data"] + ")</small>");
            });
        }
    });

    /* hack erweiterte Suche um letztem Suchfeld innerhalb einer Gruppe eine Klasse zuzuordnen.*/
    var $groups = $('#advSearchForm #group0');
    $groups.each(function() {
        $(this).children('.col-sm-8').first().children('.adv-search').first().addClass('first');
        console.log($(this).children('.col-sm-8'));
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