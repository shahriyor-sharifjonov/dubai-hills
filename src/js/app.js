import * as functions from './modules/functions.js';
import Swiper, { Navigation, Pagination } from 'swiper';

functions.isWebp();

const swiper = new Swiper();

gsap.registerPlugin(ScrollTrigger);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const headerShow = () => {
    gsap.utils.toArray(".header").forEach(header => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.intro',
                start: "top bottom",
                scrub: 2, 
                markers: false,
                onEnter: () => {header.classList.remove('show');header.classList.remove('white');},
                onLeave: () => {header.classList.add('show');header.classList.add('white');},
                onEnterBack: () => {header.classList.remove('show');header.classList.remove('white');},
                onLeaveBack: () => {header.classList.add('show');header.classList.add('white');},
            }, 
            defaults: {ease: 'none'} 
        });
    })
}

const sectionTitles = () => {
    gsap.utils.toArray(".section").forEach(section => {
        const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "top 30%", 
                    scrub: 2, 
                    markers: false,
                }, 
                defaults: {ease: "none"} 
            });
        tl
            .from(section.querySelector(".section__title"), { 
                y: 100,
                opacity: 0,
                ease: Expo.ease,
            })
    })
}

new Swiper('.features__swiper', {
    modules: [Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 80,
    initialSlide: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.features__next',
        prevEl: '.features__prev',
    },
    pagination: {
      el: ".features__pagination",
      clickable: true,
    },
})

window.addEventListener('DOMContentLoaded', () => {
    headerShow();
    sectionTitles();
})