
var ww, wh;
var headerH;
var hamburgerC;
var navW;
var $nav, $hamburger, $hamburgerLine;
var isNavOpen = false;
var isXs = false;
var isSize = '';
var speed = 0.3;
var introID = 1;
var introOpen = false;
var statementOpen = false;
var bidOpen = false;
var stepOpen = false;
var extraOpen = false;
var st;

$(function(){
	// $.html5Loader({
    //     filesToLoad: 'js/resource.json',
    //     onBeforeLoad: function () {
    //         //console.log('on BeforeLoad');
    //     },
    //     onComplete: function () {
    //         //console.log('on complete');
    //         // $(".loading").fadeOut();
    //         // init();
    //     },
    //     onElementLoaded: function ( obj, elm) {
    //         //console.log(elm);
            
    //     },
    //     onUpdate: function ( percentage ) {
    //         //console.log(loadingAlpha);
    //     }
    // });

    init();

	function init(){
        $nav = $("nav");
        $hamburger = $(".hamburger");
        $hamburgerLine = $hamburger.find(".line");

        $(window).on('scroll', onScroll);
        onScroll();

        $(window).on('resize', onResize);
        onResize();

        $hamburger.on("click", toMenu);

        $('.statement .btn-rule').on('click', function (){
            TweenMax.to($('.event-rule'), 0.6, {autoAlpha: 1});
            return false;
        });

        $('.event-rule .btn-close').on('click', function (){
            TweenMax.to($('.event-rule'), 0.6, {autoAlpha: 0});
            return false;
        });

        TweenMax.set($('.intro .title-con'), {alpha: 0, y: 50});
        TweenMax.set($('.intro .xs-features'), {alpha: 0, y: 50});
        TweenMax.set($('.intro .md-features'), {alpha: 0, y: 50});
        TweenMax.set($('.statement .title-con'), {alpha: 0, y: 50});
        TweenMax.set($('.statement .sub-title'), {alpha: 0, y: 50});
        TweenMax.set($('.statement .info-con'), {alpha: 0, y: 50});
        TweenMax.set($('.statement .bid'), {alpha: 0, y: -50});
        TweenMax.set($('.step .title'), {alpha: 0, y: 50});
        TweenMax.set($('.step .step-by-step'), {alpha: 0, y: 50});
        TweenMax.set($('.extra .content-con'), {alpha: 0, y: 50});
        TweenMax.set($('.extra .richart'), {alpha: 0, y: 50});
    }

    function onScroll(){
        st = $(window).scrollTop();
        var scope = wh * 0.4;

        var introTop = $(".intro").offset().top - scope;
        var statementTop = $(".statement").offset().top - scope;
        var bidTop = $(".statement .bid").offset().top - scope;
        var stepTop = $(".step").offset().top - scope;
        var extraTop = $(".extra").offset().top - scope;

        headerBG();

        if(st > introTop && !introOpen){
            introOpen = true;
            TweenMax.to($('.intro .title-con'), .6, {alpha: 1, y: 0, ease: Power3.easeOut});
            TweenMax.to($('.intro .xs-features'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
            TweenMax.to($('.intro .md-features'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
        }
        if(st > statementTop && !statementOpen){
            statementOpen = true;
            TweenMax.to($('.statement .title-con'), .6, {alpha: 1, y: 0, ease: Power3.easeOut});
            TweenMax.to($('.statement .sub-title'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
            TweenMax.to($('.statement .info-con'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
        }
        if(st > bidTop && !bidOpen){
            bidOpen = true;
            TweenMax.to($('.statement .bid'), .6, {alpha: 1, y: 0, ease: Power3.easeOut});
        }
        if(st > stepTop && !stepOpen){
            stepOpen = true;
            TweenMax.to($('.step .title'), .6, {alpha: 1, y: 0, ease: Power3.easeOut});
            TweenMax.to($('.step .step-by-step'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
        }
        if(st > extraTop && !extraOpen){
            extraOpen = true;
            TweenMax.to($('.extra .content-con'), .6, {alpha: 1, y: 0, ease: Power3.easeOut});
            TweenMax.to($('.extra .richart'), .6, {alpha: 1, y: 0, delay: 0.5, ease: Power3.easeOut});
        }
    }

    function onResize() {
        ww = $(window).innerWidth();
        wh = $(window).innerHeight();
        size = '';
        if (ww < 768) {
            isXs = true;
            size = 'xs';
            if (isNavOpen) {
                TweenMax.set($nav, {autoAlpha: 1});
                $hamburgerLine.addClass("active");
                isNavOpen = true;
            } else {
                TweenMax.set($nav, {autoAlpha: 0});
                $hamburgerLine.removeClass("active");
                isNavOpen = false;
            }
        } else {
            isXs = false;
            size = 'md';
            TweenMax.set($nav, {autoAlpha: 1});
            $hamburgerLine.removeClass("active");
            isNavOpen = false;
        }

        toStep(size);
        headerBG();
    }

    function headerBG(){
        if(ww < 768){
            TweenMax.to($('header'), 0.3, {backgroundColor: '#008cd6'});
        }else{
            if(st > 100){
                TweenMax.to($('header'), 0.3, {backgroundColor: 'white'});
            }else{
                TweenMax.to($('header'), 0.3, {backgroundColor: 'transparent'});
            }
        }
    }

    function toStep(size){
        if(isSize == size) return;
        isSize = size;

        toReset();
        resetIntroXS();
        resetIntroMD();
        TweenMax.killAll();

        if(isXs) {
            TweenMax.set($('.step_1_1'), {alpha: 1});

            m_slide1();
            onIntroXS_1();
            onStatement_A();
        }else{
            TweenMax.set($('.step_1_1'), {alpha: 1});
            TweenMax.set($('.step_2_1'), {alpha: 1});
            TweenMax.set($('.step_3_1'), {alpha: 1});
            TweenMax.set($('.hightlight_1_1'), {scale: 0.3});
            TweenMax.set($('.hightlight_1_2'), {scale: 0.3});
            TweenMax.set($('.hightlight_1_3'), {scale: 0.3});

            slide1();
            onIntroMD_1();
            onStatement_A();
        }
    }

    function slide1(){
        TweenMax.to($('.frame_1'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_1_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 1});
        TweenMax.to($('.hightlight_1_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.step_1_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 4});
        TweenMax.to($('.hightlight_1_2'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 5});
        TweenMax.to($('.hightlight_1_2'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 7});
        TweenMax.to($('.step_1_2'), speed, {alpha: 0, ease: Power2.easeOut, delay: 8});
        TweenMax.to($('.step_1_3'), speed, {alpha: 1, ease: Power2.easeOut, delay: 8});
        TweenMax.to($('.hightlight_1_3'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 9});
        TweenMax.to($('.hightlight_1_3'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 11});
        TweenMax.to($('.frame_1'), speed, {alpha: 0, ease: Power2.easeOut, delay: 12, onComplete: slide2});
    }

    function slide2(){
        TweenMax.to($('.frame_2'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_2_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 1});
        TweenMax.to($('.hightlight_2_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.step_2_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 4});
        TweenMax.to($('.hightlight_2_2'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 5});
        TweenMax.to($('.hightlight_2_2'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 7});
        TweenMax.to($('.frame_2'), speed, {alpha: 0, ease: Power2.easeOut, delay: 8, onComplete: slide3});
    }

    function slide3(){
        TweenMax.to($('.frame_3'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_3_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 1});
        TweenMax.to($('.hightlight_3_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.step_3_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 4});
        TweenMax.to($('.frame_3'), speed, {alpha: 0, ease: Power2.easeOut, delay: 5, onComplete: toRestart});
    }

    function toRestart(){
        toReset();
        TweenMax.to($('.step_1_1'), 0.3, {alpha: 1});
        TweenMax.to($('.step_2_1'), 0.3, {alpha: 1});
        TweenMax.to($('.step_3_1'), 0.3, {alpha: 1});
        TweenMax.to($('.hightlight_1_1'), 0.3, {scale: 0.3});
        TweenMax.to($('.hightlight_1_2'), 0.3, {scale: 0.3});
        TweenMax.to($('.hightlight_1_3'), 0.3, {scale: 0.3, onComplete: slide1});
    }

    function m_slide1(){
        TweenMax.to($('.step_1_1'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_1_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_1_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 2});
        TweenMax.to($('.step_1_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.hightlight_1_2'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 5});
        TweenMax.to($('.hightlight_1_2'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 7});
        TweenMax.to($('.step_1_2'), speed, {alpha: 0, ease: Power2.easeOut, delay: 8});
        TweenMax.to($('.step_1_3'), speed, {alpha: 1, ease: Power2.easeOut, delay: 8});
        TweenMax.to($('.hightlight_1_3'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 9});
        TweenMax.to($('.hightlight_1_3'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 11, onComplete: m_slide2});
    }

    function m_slide2(){
        TweenMax.to($('.step_1_1'), speed, {alpha: 0, ease: Power2.easeOut});
        TweenMax.to($('.step_1_2'), speed, {alpha: 0, ease: Power2.easeOut});
        TweenMax.to($('.step_1_3'), speed, {alpha: 0, ease: Power2.easeOut});
        TweenMax.to($('.step_2_1'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_2_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 1});
        TweenMax.to($('.hightlight_2_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.step_2_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 4});
        TweenMax.to($('.hightlight_2_2'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 5});
        TweenMax.to($('.hightlight_2_2'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 7, onComplete: m_slide3});
    }

    function m_slide3(){
        TweenMax.to($('.step_2_1'), speed, {alpha: 0, ease: Power2.easeOut});
        TweenMax.to($('.step_2_2'), speed, {alpha: 0, ease: Power2.easeOut});
        TweenMax.to($('.step_3_1'), speed, {alpha: 1, ease: Power2.easeOut});
        TweenMax.to($('.hightlight_3_1'), speed, {alpha: 1, scale: 1, ease: Power2.easeOut, delay: 1});
        TweenMax.to($('.hightlight_3_1'), speed, {alpha: 0, scale: .6, ease: Power2.easeOut, delay: 3});
        TweenMax.to($('.step_3_2'), speed, {alpha: 1, ease: Power2.easeOut, delay: 4});
        TweenMax.to($('.step_3_1'), speed, {alpha: 0, ease: Power2.easeOut, delay: 7});
        TweenMax.to($('.step_3_2'), speed, {alpha: 0, ease: Power2.easeOut, delay: 7, onComplete: m_slide1});
    }

    function toReset(){
        var el = [
            'frame_1', 'frame_2', 'frame_3', 
            'step_1_1', 'step_1_2', 'step_1_3',
            'step_2_1', 'step_2_2',
            'step_3_1', 'step_3_2',
            'hightlight_1_1', 'hightlight_1_2', 'hightlight_1_3',
            'hightlight_2_1', 'hightlight_2_2',
            'hightlight_3_1', 'hightlight_3_2',
        ];

        for(var i=0; i<el.length; i++){
            TweenMax.set($('.' + el[i]), {alpha: 0});
        }
    }

    function onIntroXS_1(){
        introID = 1;
        introDot();
        TweenMax.set($('.xs-features .features-1'), {left: "0%", ease: Power3.easeOut});
        TweenMax.set($('.xs-features .features-2'), {left: "105%", ease: Power3.easeOut});
        TweenMax.to($('.xs-features .features-1'), 1, {left: "-105%", ease: Power3.easeOut, delay: 2});
        TweenMax.to($('.xs-features .features-2'), 1, {left: "0%", ease: Power3.easeOut, delay: 2, onComplete: onIntroXS_2});
    }

    function onIntroXS_2(){
        introID = 2;
        introDot();
        TweenMax.set($('.xs-features .features-2'), {left: "0%", ease: Power3.easeOut});
        TweenMax.set($('.xs-features .features-3'), {left: "105%", ease: Power3.easeOut});
        TweenMax.to($('.xs-features .features-2'), 1, {left: "-105%", ease: Power3.easeOut, delay: 2});
        TweenMax.to($('.xs-features .features-3'), 1, {left: "0%", ease: Power3.easeOut, delay: 2, onComplete: onIntroXS_3});
    }

    function onIntroXS_3(){
        introID = 3;
        introDot();
        TweenMax.set($('.xs-features .features-3'), {left: "0%", ease: Power3.easeOut});
        TweenMax.set($('.xs-features .features-1'), {left: "105%", ease: Power3.easeOut});
        TweenMax.to($('.xs-features .features-3'), 1, {left: "-105%", ease: Power3.easeOut, delay: 2});
        TweenMax.to($('.xs-features .features-1'), 1, {left: "0%", ease: Power3.easeOut, delay: 2, onComplete: onIntroXS_1});
    }

    function resetIntroXS(){
        introID = 1;
        introDot();
        TweenMax.set($('.xs-features .features-1'), {left: "105%"});
        TweenMax.set($('.xs-features .features-2'), {left: "105%"});
        TweenMax.set($('.xs-features .features-3'), {left: "105%"});
    }

    function onIntroMD_1(){
        console.log('md');
        introID = 1;
        TweenMax.to($('.md-features .features-3 .txt'), 1, {marginTop: "2%", ease: Power3.easeOut, delay: 2, onStart: introDot});
        TweenMax.to($('.md-features .features-1 .txt'), 1, {marginTop: "8%", ease: Power3.easeOut, delay: 2, onComplete: onIntroMD_2});
    }

    function onIntroMD_2(){
        introID = 2;
        TweenMax.to($('.md-features .features-1 .txt'), 1, {marginTop: "2%", ease: Power3.easeOut, delay: 2, onStart: introDot});
        TweenMax.to($('.md-features .features-2 .txt'), 1, {marginTop: "8%", ease: Power3.easeOut, delay: 2, onComplete: onIntroMD_3});
    }

    function onIntroMD_3(){
        introID = 3 ;
        TweenMax.to($('.md-features .features-2 .txt'), 1, {marginTop: "2%", ease: Power3.easeOut, delay: 2, onStart: introDot});
        TweenMax.to($('.md-features .features-3 .txt'), 1, {marginTop: "8%", ease: Power3.easeOut, delay: 2, onComplete: onIntroMD_1});
    }

    function resetIntroMD(){
        introID = 1;
        introDot();
        TweenMax.set($('.md-features .features-1 .txt'), {marginTop: "2%"});
        TweenMax.set($('.md-features .features-2 .txt'), {marginTop: "2%"});
        TweenMax.set($('.md-features .features-3 .txt'), {marginTop: "2%"});
    }

    function introDot(){
        $('.intro .dot').removeClass('active');
        $('.intro .dot:nth-child('+introID+')').addClass('active');
    }

    function onStatement_A(){
        TweenMax.set($('.statement .info-2'), {left: "100%", ease: Power3.easeOut});
        TweenMax.to($('.statement .info-1'), 1, {left: "-100%", ease: Power3.easeOut, delay: 2});
        TweenMax.to($('.statement .info-2'), 1, {left: "0%", ease: Power3.easeOut, delay: 2, onComplete: onStatement_B});
        $('.statement .dot').removeClass('active');
        $('.statement .dot:nth-child(1)').addClass('active');

        // clock motion
        TweenMax.set($('.kv .clock-pointer'), {rotation: 0, ease: Power3.easeOut});
        TweenMax.to($('.kv .clock-pointer'), 1, {rotation: 360, ease: Power3.easeOut});
    }

    function onStatement_B(){
        TweenMax.set($('.statement .info-1'), {left: "100%", ease: Power3.easeOut});
        TweenMax.to($('.statement .info-2'), 1, {left: "-100%", ease: Power3.easeOut, delay: 2});
        TweenMax.to($('.statement .info-1'), 1, {left: "0%", ease: Power3.easeOut, delay: 2, onComplete: onStatement_A});
        $('.statement .dot').removeClass('active');
        $('.statement .dot:nth-child(2)').addClass('active');
    }

    function toMenu(){
        if(!isNavOpen){
            // 選單打開
            $hamburgerLine.addClass("active");
            TweenMax.to($nav, 0.4, {autoAlpha:1});
            isNavOpen = true;
        }else{
            // 選單關閉
            $hamburgerLine.removeClass("active");
            TweenMax.to($nav, 0.4, {autoAlpha:0});
            isNavOpen = false;
        }
    }
    
}); 

function scrollToSection(id){
    var top = $("." + id).offset().top - 100;
    TweenMax.to($(window), 1, {scrollTo:top, ease:Power2.easeOut, delay:0.4});

    if(isNavOpen){
        $hamburgerLine.removeClass("active");
        TweenMax.to($nav, 0.4, {autoAlpha:0});
        isNavOpen = false;
    }
    // return false;
}