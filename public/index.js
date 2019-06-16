// fades the navbar with user scroll
(($) => {          
    $(document).ready(function(){                    
        $(window).scroll(function(){                          
            if ($(this).scrollTop() < 100) {
                $('.navbar').fadeIn(500);
            }
        });
        $(window).scroll(function(){                          
            if ($(this).scrollTop() > 150) {
                $('.navbar').fadeOut(500);
            }
        });

        $(window).resize(() =>
        {
            $(window).resize(checkSize);
        });
    });

    function checkSize() {

    }
})(jQuery);