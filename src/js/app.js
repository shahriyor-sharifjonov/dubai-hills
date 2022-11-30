import imagesLoaded from 'imagesloaded';
import * as functions from './modules/functions.js';
import { gsap } from 'gsap'
import Swiper, { Navigation, Pagination } from 'swiper';
import SmoothScroll from 'smoothscroll-for-websites'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

functions.isWebp();
gsap.registerPlugin(ScrollTrigger);

// !onload scroll to top start
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
// !onload scroll to top end



// !smooth scroll start
SmoothScroll({
	animationTime: 1200,
	stepSize: 80,
	keyboardSupport: true,
	arrowScroll: 100, 
	touchpadSupport: true 
})
// !smooth scroll end



// !preloader start
const images = gsap.utils.toArray("img");
const loader = document.querySelector(".loader__progress");
const updateProgress = (instance) => {
    loader.setAttribute('style', `width: ${Math.round(
		(instance.progressedCount * 100) / images.length)}%`);
}

setTimeout(() => 
    imagesLoaded(images)
        .on("progress", updateProgress)
        // .on("always", showDemo)
    , 1000
)
// !peloader end



// !parallax on mousemove start 
const brochureParallax = (e) => {
    document.querySelectorAll('.brochure__img').forEach(move => {
        let moving_value = move.getAttribute('data-value');
        let x = (e.clientX * moving_value) / 250;
        let y = (e.clientY * moving_value) / 250;
        move.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}
document.addEventListener('mousemove', brochureParallax)
// !parallax on mousemove end 
 


// !sliders start 
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
new Swiper('.exterior__swiper', {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 0,
    centeredSlides: false,
    loop: true,
    navigation: {
        nextEl: '.exterior__next',
        prevEl: '.exterior__prev',
    },
    pagination: {
      el: ".exterior__pagination",
      clickable: true,
    },
})
// !sliders end 



// !gsap animations start
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
        .add('start')
        .from(section.querySelector(".section__title"), { 
            x: -200,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
        .from(section.querySelector(".about__top"), { 
            y: 100,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
})
// !gsap animations end 