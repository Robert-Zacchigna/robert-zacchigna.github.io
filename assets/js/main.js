// Nav Bar Scroll Padding to Page Anchors
$(window).bind('load resize', function(event) {
  document.styleSheets[2].cssRules[0].style.setProperty("--nav-height", document.getElementById("nav-head").offsetHeight + 'px');
});

// Nav Bar Page Highlighting
$(function(){
    $('.nav a').each(function(){
        if ($(this).prop('href') == window.location.href) {
            $(this).parent('div').addClass('active');
        }
    });
});

// Year Dropdown Buttons
$(function(){
    $(".dropdown-btn").click(function() {
        $('.dropdown-btn').not(this).removeClass('active-btn');
        $(this).toggleClass('active-btn');

        var div_list = document.getElementsByClassName('sidebar-sticky')[0].getElementsByTagName('div');

        for (var i = 0; i < div_list.length; i++) {
            if (this.id === div_list[i].id) {
                $('.dropdown-year').not(div_list[i]).removeClass('active-year');
                $(div_list[i]).toggleClass('active-year');
            }
        }
    });
});
