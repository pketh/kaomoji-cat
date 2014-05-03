$(function() {

    console.log('( ﾟ▽ﾟ)/');

    var input = 'js/kaomoji-cat.json'
    var emoteObj,
        quoteTemplate,
        quoteRendered,
        kaomojisTemplate,
        kaomojisRendered,
        listLength;

    render(0);

    function render(emoteIndex) {
        $.getJSON(input, function(json){
            emoteObj = json.kaomojicat[emoteIndex];

            quoteTemplate = $('#quote').html();
            quoteRendered = Mustache.render(quoteTemplate, {'kaomojis': emoteObj});
            $('.top').detach();
            $('header').append(quoteRendered);

            kaomojisTemplate = $('#main').html();
            kaomojisRendered = Mustache.render(kaomojisTemplate, {'kaomojis': emoteObj});
            $('main section').detach();
            $('main').append(kaomojisRendered);

            // subpages start from the top
            if (emoteIndex !== 0 ) {
                $(document).scrollTop(0);
            }

            // index page list
            if (emoteIndex === 0) {
                listLength = emoteObj.kaomojis.length;
                for (var i = 1; i <= listLength; i ++ ) {
                    $('li:nth-child(' + i + ')').wrap('<a href="' + i + '"></a>');
                }
            }
            pushState();
            backButton();
        })
    }

    function pushState() {
        $('.index a').on('click', function(event) {
            event.preventDefault();
            var emote = $(this).attr('href');
            history.pushState(null, null, emote);
            render(emote);
        })
    }

    function backButton() {
        $('.cat, nav, .fish').on('click', function() {
            history.pushState(null, null, '/');
            render(0);
        });
        if ( window.navigator.standalone !== true ) {
            $('nav').remove();
        }
    }

    // browser back
    window.addEventListener('popstate', function(e) {
        render(0);
    });


});
