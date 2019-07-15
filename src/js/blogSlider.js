import Swiper from 'swiper/dist/js/swiper.js';
import { throttle } from 'lodash';

export default function() {
    const blogSliderElement = document.querySelector('.js-blog-slider');
    if (blogSliderElement) {


        const heading = document.querySelector('.js-blog-slider-heading');
        const paginator = document.querySelector('.js-blog-slider-paginator');
        const paginatorNextButton = paginator.querySelector('.js-paginator-next');
        const paginatorPrevButton = paginator.querySelector('.js-paginator-prev');
        let hidden = false;
        let orderReversed = false;
        let movingHeading = false;
        const blogSlider = new Swiper(blogSliderElement, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            navigation: {
                nextEl: paginatorNextButton,
                prevEl: paginatorPrevButton
            },
            breakpoints: {
                360: {
                    spaceBetween: 20
                }
            },
            on: {
                beforeResize() {
                    if (window.innerWidth <= 768) {
                        blogSlider.slides.css('width', '');
                    }
                }
            }
        });

        blogSliderElement.addEventListener('mouseenter', function() {
            paginator.classList.add('shown');
        });
        blogSliderElement.addEventListener('mouseleave', function() {
            paginator.classList.remove('shown');
        });
        paginator.addEventListener('mouseenter', function() {
            paginator.classList.add('shown');
        });
        paginator.addEventListener('mouseleave', function() {
            paginator.classList.remove('shown');
        });

        const headingTouchMoveHandler = function(event) {
            const offset = blogSlider.translate;
            if (offset < 0 && !hidden) {
                heading.style.transform = `TranslateY(${offset}px)`;
                heading.style.opacity = Math.abs((1 / offset) * 4);
                heading.style.transition = '';
            }
        };

        const headingTouchMoveThrottled = throttle(headingTouchMoveHandler, 10);

        const headingTouchEndHandler = function(event) {
            heading.style.transform = `translateY(0px)`;
            heading.style.opacity = '1';
            heading.style.transition = 'all .2s';
        };

        const headingSlideChangeHandler = function(event) {
            if (!blogSlider.isBeginning) {
                heading.style.opacity = '0';
                heading.style.transform = '';
                heading.style.transition = '';
                hidden = true;
            } else if (blogSlider.isBeginning) {
                heading.style.opacity = '1';
                heading.style.transform = '';
                heading.style.transition = 'all .2s';
                hidden = false;
            }
        };

        function addHeadingHandlers() {
            heading.style.cssText = '';
            blogSlider.on('touchMove', headingTouchMoveThrottled);
            blogSlider.on('touchEnd', headingTouchEndHandler);
            blogSlider.on('slideChange', headingSlideChangeHandler);
        }

        function removeHeadingHandlers() {
            heading.style.cssText = '';
            blogSlider.off('touchMove', headingTouchMoveThrottled);
            blogSlider.off('touchEnd', headingTouchEndHandler);
            blogSlider.off('slideChange', headingSlideChangeHandler);
        }

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            if (!mq.matches && !movingHeading) {
                addHeadingHandlers();
                movingHeading = true;
            } else if (movingHeading) {
                removeHeadingHandlers();
            }
        }
    }
}
