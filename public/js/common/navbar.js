(($) => 
{
    // fades the navbar with user scroll
    $(document).ready(function(){                    
        $(window).scroll(function(){                          
            if ($(this).scrollTop() < 225) {
                $('.navbar').fadeIn(500);
            }
        });
        $(window).scroll(function(){                          
            if ($(this).scrollTop() > 250) {
                $('.navbar').fadeOut(500);
            }
        });
    });
})(jQuery);