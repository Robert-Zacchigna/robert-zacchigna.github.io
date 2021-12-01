// Nav Bar Scroll Padding to Page Anchors
$(window).bind('load resize', function(event) {
  document.styleSheets[2].cssRules[0].style.setProperty("--nav-height", document.getElementById("nav-head").offsetHeight + 'px');
});

// Nav Bar Page Highlighting
$(function(){
    $('.nav a').each(function(){
        var win_href = window.location.href;

        if ($(this).prop('href') == win_href) {
            $(this).parent('div').addClass('active');
        } else if ($(this).prop('href').includes('post-feed') && win_href.includes('post-feed')) {
            $(this).parent('div').addClass('active');
        } else {
            $(this).parent('div').removeClass('active');
        }
    });
});

// Year Dropdown Buttons
$(function(){
    $(".dropdown-btn").click(function() {
        $('.dropdown-btn').not(this).removeClass('active-btn');
        $(this).toggleClass('active-btn');

        var div_list = [].slice.call(document.getElementsByClassName('sidebar-sticky')[0].getElementsByTagName('div')).slice(1);
        var btn_list = [].slice.call(document.getElementsByClassName("dropdown-btn"));

        for (var i = 0; i < div_list.length; i++) {
            if (this.id === div_list[i].id && btn_list[i].id === this.id) {
                $('.dropdown-year').not(div_list[i]).removeClass('active-year');
                $(div_list[i]).toggleClass('active-year');

                class_list = [].slice.call(btn_list[i].classList)

                if (class_list.includes("active-btn")) {
                    btn_list[i].innerHTML = btn_list[i].id + " ▲";
                }
                else { btn_list[i].innerHTML = btn_list[i].id + " ▼"; }
            }
            else { btn_list[i].innerHTML = btn_list[i].id + " ▼"; }
        }
    });
});

// Display/Hide GitHub Activity Feed
$(function() {
    $("#github-feed-button").click(function() {
        $('#github-feed-button').not(this).removeClass('active-btn');
        $(this).toggleClass('active-btn');

        class_list = [].slice.call(document.getElementById('github-feed-button').classList);

        if (class_list.includes("active-btn")) {
            this.innerHTML = "Hide GitHub Activity Feed";
            document.getElementById('github-feed').style.cssText = "padding-bottom: 1em; display: block;"
        }
        else {
            this.innerHTML = "Display GitHub Activity Feed";
            document.getElementById('github-feed').style.cssText = "display: none;"
        }
    });
});
