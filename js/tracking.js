function trackEvent(action, category, label) {
    label = label || '';
    gtag('event', action, {'event_category':category, 'event_label':label});
}

function trackPageView(id, title) {
    gtag('config', id, {'page_title': title});
}

function setUTM_URL(_URL) {
    var href = _URL;
    (function ($) {
        $.ref_string = (function (href) {

            referrer = href.split("?")[1];
            if (sessionStorage.getItem("utm_source") && sessionStorage.getItem("utm_medium")) referrer = referrer.replace(/utm_/g, 'second_');
            if (sessionStorage.getItem("utm_source")) referrer += '&utm_source=' + sessionStorage.getItem("utm_source");
            if (sessionStorage.getItem("utm_medium")) referrer += '&utm_medium=' + sessionStorage.getItem("utm_medium");
            if (sessionStorage.getItem("utm_campaign")) referrer += '&utm_campaign=' + sessionStorage.getItem("utm_campaign");
            if (sessionStorage.getItem("utm_content")) referrer += '&utm_content=' + sessionStorage.getItem("utm_content");
            if (sessionStorage.getItem("utm_term")) referrer += '&utm_term=' + sessionStorage.getItem("utm_term");
            referrer = href.split("?")[0] + '?' + referrer;

            return referrer;

        })(href)
    })(jQuery);
    // $("element selector").attr('href', $.ref_string);
    // console.log('$.ref_string:', $.ref_string);
    window.open($.ref_string);
}