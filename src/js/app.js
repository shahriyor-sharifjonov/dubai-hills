import * as functions from './modules/functions.js';
import { gsap } from 'gsap'
import Swiper, { Navigation, Pagination, EffectCreative } from 'swiper';
import SmoothScroll from 'smoothscroll-for-websites'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

functions.isWebp();
gsap.registerPlugin(ScrollTrigger);



// !onload scroll to top start
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
// !onload scroll to top end



// !preloader start
let preloaderText = document.querySelector('.loader__text');
let percentage = 0
const updateProgress = () => {
    const a = () => {
        if(percentage <= 20){
            preloaderText.innerHTML = 'يا'
        }
        if(percentage > 20 && percentage <= 40){
            preloaderText.innerHTML = 'Hello';
        }
        if(percentage > 40 && percentage <= 60){
            preloaderText.innerHTML = '여기요';
        }
        if(percentage > 60 && percentage <= 80){
            preloaderText.innerHTML = 'Hé';
        }
        if(percentage > 80 && percentage <= 100){
            preloaderText.innerHTML = 'Привет';
            setTimeout(() => {
                document.getElementsByTagName('html')[0].setAttribute('loaded', true)
            }, 300)
        }
    }
    const q = () => {
        a()
        setTimeout(() => {
            if(percentage <= 100) {
                percentage++
                outLoader()
                q()
            }
        }, 10);
    }
    q()
}
updateProgress()
const outLoader = () => {
    if(percentage === 100){
        gsap.to('.loader__text', .5, {
            yPercent: -150,
            opacity: 0,
            ease: "expo.easeInOut"
        })
        gsap.to('.loader', 1, {
            // yPercent: -100,
            opacity: 0,
            display: "none",
            delay: 0.8,
            ease: "expo.easeInOut"
        })
    }
}
// !preloader end



// !smooth scroll start
SmoothScroll({
	animationTime: 1200,
	stepSize: 80,
	keyboardSupport: true,
	arrowScroll: 100, 
	touchpadSupport: true 
})
// !smooth scroll end



// !custom cursor start
// const mouse = document.querySelector('.cursor');
// function moveMouse(e) {
//     if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
//         mouse.style.opacity = 0
//     } else {
//         mouse.style.opacity = 1
//         mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`
//     }
// }
// document.addEventListener('mousemove', moveMouse);
// document.addEventListener('mouseover', moveMouse);
// !custom cursor end



// !number animation start
let charIndex = 0
const typeit = document.querySelector('.typeit');
const cursorSpan = document.querySelector('.type-cursor');
const text = typeit.getAttribute('data-text');
const showTime = 5000
const hideTime = 2000
const typeSpeen = 200
const erazeSpeed = 100
const type = () => {
    if (charIndex < text.length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        cursorSpan.classList.remove("blink");
        typeit.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, typeSpeen)
    } else {
        document.querySelector('.about__label').style.transform = "translateX(0)"
        document.querySelector('.about__label').style.opacity = 1
        cursorSpan.classList.remove("typing");
        cursorSpan.classList.add("blink");
        setTimeout(erase, showTime);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
        typeit.textContent = text.substring(0, charIndex-1)
        charIndex--
        setTimeout(erase, erazeSpeed)
    } else {
        cursorSpan.classList.add("typing")
        setTimeout(type, hideTime)
    }
}
// !number animation end



// !parallax on mousemove brochure start 
const brochureParallax = (e) => {
    document.querySelectorAll('.brochure__img').forEach(move => {
        let moving_value = move.getAttribute('data-value');
        let x = (e.clientX * moving_value) / 250;
        let y = (e.clientY * moving_value) / 250;
        move.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}
document.addEventListener('mousemove', brochureParallax)
// !parallax on mousemove brochure end 



// !sliders start 
new Swiper('.features__swiper', {
    modules: [Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 80,
    initialSlide: 1,
    centeredSlides: true,
    loop: true,
    speed: 500,
    navigation: {
        nextEl: '.features__next',
        prevEl: '.features__prev',
    },
    pagination: {
    el: ".features__pagination",
    clickable: true,
    },
})

const exteriorSwiper = new Swiper('.exterior__swiper', {
    modules: [Pagination, Navigation, EffectCreative],
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 0,
    centeredSlides: false,
    loop: true,
    speed: 800,
    autoplay: 2000,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
            opacity: 0,
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
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
            end: "bottom 150px",
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

gsap.utils.toArray(".section__body").forEach(section => {
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
        .from(section.querySelector(".exterior__title"), { 
            y: 100,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
})

gsap.utils.toArray(".about__bot").forEach(el => {
    const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 30%", 
                scrub: 2, 
                markers: false,
                onEnter: () => {
                    setTimeout(() => {
                        charIndex === 0 ? type() : ''
                    }, 1000);
                },
            }, 
            defaults: {ease: "none"} 
        });
})
// !gsap animations end 

