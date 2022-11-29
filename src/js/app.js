import imagesLoaded from 'imagesloaded';
import * as functions from './modules/functions.js';
import { gsap } from 'gsap'
import Swiper, { Navigation, Pagination } from 'swiper';
import SmoothScroll from 'smoothscroll-for-websites'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

functions.isWebp();
gsap.registerPlugin(ScrollTrigger);

const swiper = new Swiper();

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// SmoothScroll
SmoothScroll({
	animationTime: 1200,
	stepSize: 80,
	keyboardSupport: true,
	arrowScroll: 100, 
	touchpadSupport: true 
})

const images = gsap.utils.toArray("img");
const loader = document.querySelector(".loader__progress");
const updateProgress = (instance) =>
	(loader.setAttribute('style', `width: ${Math.round(
		(instance.progressedCount * 100) / images.length
		)}%`));

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
                    start: "top 70%",
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
                ease: "expo.ease",
            })
    })
}

const brochureParallax = (e) => {
    document.querySelectorAll('.brochure__img').forEach(move => {
        let moving_value = move.getAttribute('data-value');
        let x = (e.clientX * moving_value) / 250;
        let y = (e.clientY * moving_value) / 250;
        move.style.transform = `translateX(${x}px) translateY(${y}px)`
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

document.addEventListener('mousemove', brochureParallax)

setTimeout(() => 
    imagesLoaded(images)
        .on("progress", updateProgress)
        // .on("always", showDemo)
    , 1000
)