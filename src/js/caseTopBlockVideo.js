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

    if (link && video) {
        link.addEventListener('click', event => {
            event.preventDefault();
            video.setAttribute('autoplay', true);
            video.setAttribute('playsinline', true);
            video.addEventListener('play', function() {
                this.classList.add('playing');
                link.classList.add('hidden')
            });
            video.load();
        });
    }
}
