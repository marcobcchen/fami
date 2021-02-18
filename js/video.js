var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1, player2;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
        height: '100%',
        width: videoW,
        videoId: '0_M0hehMVkw',
        playerVars:{
            rel: 0
        },
        events: {
            'onReady': onPlayerReady1,
            'onStateChange': onPlayerStateChange1
        }
    });

    player2 = new YT.Player('player2', {
        height: '100%',
        width: videoW,
        videoId: '9sPSh6V9ztw',
        playerVars:{
            rel: 0
        },
        events: {
            'onReady': onPlayerReady2,
            'onStateChange': onPlayerStateChange2
        }
    });
}

function onPlayerReady1(event) {
    // event.target.playVideo();

    TweenMax.set($('.features-1 #player1'), {autoAlpha:0});
}

function onPlayerReady2(event) {
    // event.target.playVideo();

    TweenMax.set($('.features-3 #player2'), {autoAlpha:0});
}

function onPlayerStateChange1(event) {
    // console.log(event.data);
    // if(event.data == 0){
    //     TweenMax.to($('.tvc-con #player'), 0.5, {autoAlpha:0});
    //     TweenMax.to($('.tvc-con .center-con'), 0.5, {autoAlpha:1});
    //     isPlay = false;
    // }
}

function onPlayerStateChange2(event) {
    // console.log(event.data);
    // if(event.data == 0){
    //     TweenMax.to($('.tvc-con #player'), 0.5, {autoAlpha:0});
    //     TweenMax.to($('.tvc-con .center-con'), 0.5, {autoAlpha:1});
    //     isPlay = false;
    // }
}

function playVideo1(id) {
    // player.cueVideoById(id);
    player1.playVideo();
}

function stopVideo1() {
    player1.stopVideo();
}

function pauseVideo1() {
    player1.pauseVideo();
}

function playVideo2(id) {
    // player.cueVideoById(id);
    player2.playVideo();
}

function stopVideo2() {
    player2.stopVideo();
}

function pauseVideo2() {
    player2.pauseVideo();
}