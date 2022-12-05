import * as functions from './modules/functions.js';
import { gsap } from 'gsap'
import Swiper, { Navigation, Pagination, EffectCreative, EffectFade } from 'swiper';
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
// const brochureParallax = (e) => {
//     document.querySelectorAll('.brochure__img').forEach(move => {
//         let moving_value = move.getAttribute('data-value');
//         let x = (e.clientX * moving_value) / 250;
//         let y = (e.clientY * moving_value) / 250;
//         move.style.transform = `translateX(${x}px) translateY(${y}px)`
//     })
// }
// document.addEventListener('mousemove', brochureParallax)
// !parallax on mousemove brochure end 



// !header links start
const links = document.querySelectorAll('.header__li');
links.forEach(el => {
    el.addEventListener('click', () => {
        links.forEach(link => {
            link.classList.remove('active')
        })
        el.classList.add('active')
    })
})
// !header links end



// !disable header on scroll down start
let scrollBefore = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', (e) => {
    const scrolled = window.scrollY;
    if(scrollBefore > scrolled){
        if(header.classList.contains('hide')){
            header.classList.remove('hide')
        }
        scrollBefore = scrolled;
    }else{
        scrollBefore = scrolled;
        if(!header.classList.contains('hide')){
            header.classList.add('hide')
        }
    }
})
// !disable header on scroll down end




// !tabs start
const tabBtns = document.querySelectorAll('.floor__tab-item');
const tabContents = document.querySelectorAll('.floor__content');
tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-target');
        const el = document.querySelector(target)
        tabBtns.forEach(btn => {
            btn.classList.remove('active')
        })
        e.target.classList.add('active')
        tabContents.forEach(content => {
            content.classList.remove('active')
        })
        el.classList.add('active')
    })
})
// !tabs end


// !location start
const locationTabs = document.querySelectorAll('.location__tab-item');
const locationMaps = document.querySelectorAll('.location__map');
locationTabs.forEach(el => {
    el.addEventListener('click', () => {
        locationTabs.forEach(tab => {
            tab.classList.remove('active')
        })
        el.classList.add('active')
        locationMaps.forEach(map => {
            map.classList.remove('active')
        })
        const target = el.getAttribute('data-target');
        document.querySelector(target).classList.add('active')
    })
})
const mapTabs = document.querySelectorAll('.location__map-tab-item');
const mapMaps = document.querySelectorAll('.location__map-item');
mapTabs.forEach(el => {
    el.addEventListener('click', () => {
        mapTabs.forEach(tab => {
            tab.classList.remove('active')
        })
        el.classList.add('active')
        mapMaps.forEach(map => {
            map.classList.remove('active')
        })
        const target = el.getAttribute('data-target');
        document.querySelector(target).classList.add('active')
    })
})
// !location end


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

new Swiper('.ext__sw', {
    modules: [Pagination, Navigation, EffectCreative],
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ["-100%", 0, -110],
            opacity: 0,
        },
        next: {
            translate: ["200%", 0, 0],
        },
    },
    navigation: {
        nextEl: '.ext__next',
        prevEl: '.ext__prev',
    },
    pagination: {
        el: ".ext-p",
        clickable: true,
    },
})

new Swiper('.interior__swiper', {
    modules: [Pagination, Navigation, EffectCreative],
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ["-100%", 0, -110],
            opacity: 0,
        },
        next: {
            translate: ["200%", 0, 0],
        },
    },
    navigation: {
        nextEl: '.interior__next',
        prevEl: '.interior__prev',
    },
    pagination: {
        el: ".interior__pagination",
        clickable: true,
    },
})


new Swiper('.floor__swiper', {
    modules: [Navigation, EffectFade],
    slidesPerView: 1,
    slidesPerGroup: 1,
    createElements: true,
    preventClicks: true,
    preventClicksPropagation: true,
    noSwiping: true,
    noSwipingSelector: 'button',
    slideToClickedSlide: false,
    focusableElements: 'button',
    createElements: true,
    watchSlidesProgress: true,
    speed: 600,
    effect: "fade",
    navigation: {
        nextEl: '.floor__next',
        prevEl: '.floor__prev',
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

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".floor",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {header.classList.remove('white'); header.classList.add('black')},
            onLeaveBack: () => {header.classList.add('white'); header.classList.remove('black')}
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".floor",
            start: "top 60px",
            end: "bottom bottom",
            onEnter: () => {header.classList.remove('white'); header.classList.add('black')},
            onLeaveBack: () => {header.classList.add('white'); header.classList.remove('black')}
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".location",
            start: "527px top",
            end: "bottom bottom",
            onEnter: () => {header.classList.remove('black'); header.classList.add('white')},
            onLeaveBack: () => {header.classList.add('black'); header.classList.remove('white')}
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".exterior",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('exteriorLink').classList.add('active')
            },
            onLeaveBack: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('aboutLink').classList.add('active')
            }
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".location",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('locationLink').classList.add('active')
            },
            onLeaveBack: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('interiorLink').classList.add('active')
            }
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".community",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('communityLink').classList.add('active')
            },
            onLeaveBack: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('locationLink').classList.add('active')
            }
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".developer",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('developerLink').classList.add('active')
            },
            onLeaveBack: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('communityLink').classList.add('active')
            }
        }
    })
})

gsap.utils.toArray(".header").forEach(header => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".interior",
            start: "top 60px",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('interiorLink').classList.add('active')
            },
            onLeaveBack: () => {
                document.querySelectorAll('.header__li').forEach(li => {
                    li.classList.remove('active')
                })
                document.getElementById('exteriorLink').classList.add('active')
            }
        }
    })
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
        .from(section.querySelector(".features__title"), { 
            x: -100,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
        .from(section.querySelector(".location__title"), { 
            y: 100,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
    const tl60 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "top 10%", 
            scrub: 2, 
            markers: false,
        }, 
        defaults: {ease: "none"} 
    });
    tl60
        .add('start')
        .from(section.querySelector(".exterior__swiper"), { 
            y: 100,
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
        .from(section.querySelector(".exterior__prev"), { 
            x: -100,
            opacity: 0,
            ease: "expo.ease",
            delay: .3,
        }, 'start')
        .from(section.querySelector(".exterior__next"), { 
            x: 100,
            opacity: 0,
            ease: "expo.ease",
            delay: .3,
        }, 'start')
    const tlGallery = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: "bottom 0%", 
            scrub: 4, 
            markers: false,
        }, 
        defaults: {ease: "none"} 
    });
    tlGallery
        .add('start')
        .from(section.querySelector(".community__row_left"), {
            x: 800,
        }, 'start')
        .from(section.querySelector(".community__row_right"), {
            x: -800,
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

gsap.utils.toArray(".features__body").forEach(el => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 50%",
            end: "bottom 40%", 
            scrub: 2, 
            markers: false,
        }, 
        defaults: {ease: "none"} 
    })
    tl.add('start')
        .from(el.querySelector(".features__swiper"), {
            opacity: 0
        }, 'start')
        .from(el.querySelector(".features__next"), { 
            x: -1200,
            opacity: 1,
            ease: "expo.ease",
        }, 'start')
        .from(el.querySelector(".features__overlay"), { 
            x: -1200,
            opacity: 1,
            ease: "expo.ease",
        }, 'start')
        .from(el.querySelector(".features__prev"), {
            opacity: 0,
            ease: "expo.ease",
        }, 'start')
    tl.add('mid')
        .fromTo(el.querySelector(".features__overlay"), {
            x: 0,
            ease: "expo.ease",
        }, {
            x: 1200,
            ease: "expo.ease",
        }, 'mid')
})

gsap.utils.toArray(".details").forEach(el => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%", 
            scrub: 2, 
            markers: false,
        }, 
        defaults: {ease: "none"} 
    })
    tl.add('start')
        .from(el.querySelector(".details__img"), .1, {
            opacity: 0,
            x: 200,
            ease: "expo.ease",
        }, 'start')
        .from(el.querySelector(".details__content"), .1, {
            opacity: 0,
            x: -80,
            delay: .1,
            ease: "expo.ease",
        }, 'start')
})

gsap.utils.toArray(".community__header").forEach(el => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%", 
            scrub: 2, 
            markers: false,
        }, 
        defaults: {ease: "none"} 
    })
    tl.add('start')
        .from(document.querySelector(".community__header"), {
            opacity: 0,
            y: 80,
            ease: "expo.ease",
        }, 'start')
})
// !gsap animations end 

