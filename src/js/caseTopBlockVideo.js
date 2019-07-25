export default function() {
    const link = document.querySelector('.js-case-top-block-video-link');
    const video = document.querySelector('.js-top-block-video-container video');
    const topBlock = document.querySelector('.js-case-top-block');

    if (topBlock) {
        function setTopBlockMinHeight() {
            topBlock.style.minHeight = document.documentElement.clientHeight + 'px';
        }

        function removeTopBlockMinHeight() {
            topBlock.style.minHeight = '';
        }

        function checkWidthAndSetHeight() {
            if (window.matchMedia('(max-width: 768px)').matches) {
                setTopBlockMinHeight();
            } else {
                removeTopBlockMinHeight();
            }
        }

        checkWidthAndSetHeight();
    }


    let playing = false;

    function onPlay() {
        this.classList.add('playing');
        document.body.classList.add('case-video-playing');
    }

    if (link && video) {
        link.addEventListener('click', event => {
            event.preventDefault();
            if (!playing) {
                video.setAttribute('autoplay', true);
                video.setAttribute('playsinline', true);
                video.addEventListener('play', onPlay);
                // video.load();
                video.play();
                playing = true;
            } else {
                video.setAttribute('autoplay', false);
                video.setAttribute('playsinline', false);
                video.removeEventListener('play', onPlay);
                document.body.classList.remove('case-video-playing');
                video.pause();
                playing = false;
            }
        });
    }
}
