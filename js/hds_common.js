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
    processOtherEditions();
});


function processWikipediaLinks() {

    var baseUrl = 'https://x.hebis.de/wikimedia/gnd/intro/json/';

    $(".wiki-gnd-popover").click(function(e) {
        e.preventDefault();
        var $popup = $(this);
        $popup.popover('show');
        return false;
    });

    $(".wiki-gnd-popover").each(function(e) {
        var $popup = $(this);
        var gndId = $(this).data('id');
        var url = baseUrl + lang + '/' + gndId;

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

function setupAutocomplete() {
    // Search autocomplete
    $('.autocomplete').each(function (i, op) {
        $(op).autocomplete({
            maxResults: 10,
            loadingString: VuFind.translate('loading') + '...',
            handler: function (input, cb) {
                var query = input.val();
                var searcher = extractClassParams(input);
                var hiddenFilters = [];
                $(input).closest('.searchForm').find('input[name="hiddenFilters[]"]').each(function () {
                    hiddenFilters.push($(this).val());
                });
                $.fn.autocomplete.ajax({
                    url: path + '/AJAX/JSON',
                    data: {
                        q: query,
                        method: 'getACSuggestions',
                        searcher: searcher['searcher'],
                        type: searcher['type'] ? searcher['type'] : $(input).closest('.searchForm').find('.searchForm_type').val(),
                        hiddenFilters: hiddenFilters
                    },
                    dataType: 'json',
                    success: function (json) {
                        if (json.data.length > 0) {
                            var datums = [];
                            for (var i = 0; i < json.data.length; i++) {
                                datums.push(json.data[i]);
                            }
                            cb(datums);
                        } else {
                            cb([]);
                        }
                    }
                });
            }
        });
    });
    // Update autocomplete on type change
    $('.searchForm_type').change(function() {
        var $lookfor = $(this).closest('.searchForm').find('.searchForm_lookfor[name]');
        $lookfor.autocomplete('clear cache');
        $lookfor.focus();
    });
}

function processOtherEditions() {
    $("#other-editions").each(function(e) {
        var $otherEditionsContainer = $(this);
        var xid = $(this).data('xid');
        var url = path + "/xisbn/xid?isbn="+xid;

        $.get(url, function (result) {
            $otherEditionsContainer.append(result);
        }).fail(function (e) {
            $(this).hide();
        });
    });
}