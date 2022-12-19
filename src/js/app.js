import * as functions from './modules/functions.js'
import imagesLoaded from 'imagesloaded'
import { gsap } from 'gsap'
import Swiper, { Navigation, Pagination, EffectCreative, EffectFade, Thumbs, FreeMode } from 'swiper';
import SmoothScroll from 'smoothscroll-for-websites'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

functions.isWebp();
gsap.registerPlugin(ScrollTrigger);

let oneFourHeight = window.innerHeight / 5

window.addEventListener('resize', () => {
    oneFourHeight = window.innerHeight / 5
})

// !onload scroll to top start
const scroll = () => {
    document.scrollingElement.scrollTo(0, 0);
    document.body.style.overflowY = "hidden"
    window.onbeforeunload = function () {
        document.scrollingElement.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }
}
scroll()
// !onload scroll to top end



// !preloader start
const preloader = () => {
    let preloaderText = document.querySelector('.loader__text')
    let percentage = 0
    
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
    const outLoader = () => {
        if(percentage === 100){
            document.scrollingElement.scrollTo(0, 0);
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
            document.body.style.overflowY = "visible"
        }
    }
}
preloader()
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



// !ripple animation start
if(document.querySelectorAll('[anim="ripple"]')){
    document.querySelectorAll('[anim="ripple"]').forEach(el => {
        el.addEventListener("click", function (e) {
            e = e.touches ? e.touches[0] : e;
            var r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            el.style.cssText = "--s: 0; --o: 1;";
            el.offsetTop;
            el.style.cssText = "--t: 1; --o: 0; --d: ".concat(d, "; --x:").concat(e.clientX - r.left, "; --y:").concat(e.clientY - r.top, ";");
        });
    })
}
// !ripple animation end



// !showmore start
if(document.querySelector('.showmore')){
    const buttons = document.querySelectorAll('.showmore');
    buttons.forEach(button => {
        let more = false
        button.addEventListener('click', () => {
            more = !more
            const target = button.getAttribute('data-target')
            const el = document.querySelector(target);
            el.classList.toggle('more')
            if(more){
                button.innerHTML = 'Hide'
            }else{
                button.innerHTML = 'View More'
            }
        })
    })
}
// !showmore end



// !showtel start
if(document.querySelector('.shownumber')){
    const buttons = document.querySelectorAll('.shownumber');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-tel');
            const tel = number.replace(/\s/g, '');
            const target = button.getAttribute('data-target');
            const el = document.querySelector(target);
            el.innerHTML = number
            el.setAttribute('href', `tel:${tel}`)
            if(button.classList.contains('remove')){
                button.remove()
            }
        })
    })
}
// !showtel end



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
if(document.querySelectorAll('.header__li')){
    const links = document.querySelectorAll('.header__li');
    links.forEach(el => {
        el.addEventListener('click', () => {
            links.forEach(link => {
                link.classList.remove('active')
            })
            el.classList.add('active')
        })
    })
}
// !header links end



// !disable header on scroll down start 
if(document.querySelector('.header')){
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
}
// !disable header on scroll down end 



// !validations start
const validations = () => {
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    if(document.querySelectorAll('.form-validate')){
        const forms = document.querySelectorAll('.form-validate');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            const button = form.querySelectorAll('button[type="submit"]');
            let filledInputs = []
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    filledInputs = []
                    if (input.name === 'email'){
                        if(validateEmail(input.value)){
                            input.parentElement.classList.remove('form__item-input_error')
                            input.parentElement.classList.add('form__item-input_correct')
                        } else {
                            input.parentElement.classList.add('form__item-input_error')
                            input.parentElement.classList.remove('form__item-input_correct')
                        }
                    }
                    inputs.forEach(input => {
                        if (input.value.length !== 0) {
                            filledInputs.push(input)
                        }
                    })
                    if(filledInputs.length === inputs.length && !form.querySelector('.form__item-input_error')) {
                        button.forEach(button => {
                            button.removeAttribute('disabled')
                        })
                    } else {
                        button.forEach(button => {
                            button.setAttribute('disabled', 'disabled')
                        })
                    }
                })
            })
        })
    }
}
validations()
// !validations end



// !tabs start
const tabs = () => {
    if(document.querySelectorAll('.floor__tab-item')){
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
    }
}
tabs()
// !tabs end



// !location start
const location = () => {
    if(document.querySelectorAll('.gotoblock')){
        const locationTabs = document.querySelectorAll('.gotoblock');
        const locationMaps = document.querySelectorAll('.location__map');
        locationTabs.forEach(el => {
            el.addEventListener('click', () => {
                locationTabs.forEach(el => {
                    el.classList.remove('active')
                })
                el.classList.add('active')
                locationMaps.forEach(map => {
                    map.classList.remove('active')
                })
                const target = el.getAttribute('data-target');
                const element = document.querySelector(target)
                locationTabs.forEach(el => {
                    if(el.getAttribute('data-target') === target){
                        el.classList.add('active')
                    }
                })
                element.classList.add('active')
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
    }
}
location()
// !location end



// !sliders start 
const sliders = () => {
    new Swiper('.features__swiper', {
        modules: [Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 80,
        initialSlide: 1,
        grabCursor: true,
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
        breakpoints: {
            768: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            992: {
              slidesPerView: 3,
            },
        },
    })
    
    new Swiper('.ext__sw', {
        modules: [Pagination, Navigation, EffectCreative],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        grabCursor: true,
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
        grabCursor: true,
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
        autoHeight: true,
        preventClicksPropagation: true,
        noSwiping: true,
        grabCursor: true,
        noSwipingSelector: 'button',
        slideToClickedSlide: false,
        focusableElements: 'button',
        watchSlidesProgress: true,
        speed: 600,
        effect: "fade",
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.floor__next',
            prevEl: '.floor__prev',
        },
    })

    const galleryThumbs = new Swiper('.exterior__cbot', {
        spaceBetween: 12,
        slidesPerView: "auto",
        // loop: true,
        // freeMode: true,
        // loopedSlides: 5,
        slideToClickedSlide: true,
    });
    const galleryTop = new Swiper('.exterior__ctop', {
        modules: [Thumbs],
        spaceBetween: 12,
        // loop: true,
        grabCursor: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        thumbs: {
            swiper: galleryThumbs,
        },
    });
    const galleryThumbs2 = new Swiper('.interior__cbot', {
        spaceBetween: 12,
        slidesPerView: "auto",
        // loop: true,
        // freeMode: true,
        // loopedSlides: 5,
        slideToClickedSlide: true,
    });
    const galleryTop2 = new Swiper('.interior__ctop', {
        modules: [Thumbs],
        spaceBetween: 12,
        // loop: true,
        grabCursor: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        thumbs: {
            swiper: galleryThumbs2,
        },
    });
    const communityThumbs = new Swiper('.community__gallery', {
        spaceBetween: 12,
        slidesPerView: "auto",
        // loop: true,
        // freeMode: true,
        // loopedSlides: 5,
        slideToClickedSlide: true,
    });
    const communityTop = new Swiper('.community__swiper', {
        modules: [Thumbs],
        spaceBetween: 12,
        // loop: true,
        grabCursor: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        thumbs: {
            swiper: communityThumbs,
        },
    });
}
sliders()
// !sliders end 



// !gsap animations start
const animations = () => {
    ScrollTrigger.matchMedia({
        "all": function() {
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
		},
        "(min-width: 576px)": function() {
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
            })
        },
        "(max-width: 576px)": function() {
            gsap.utils.toArray(".intro").forEach(el => {
                const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: "top top",
                            end: "bottom 30%",
                            scrub: true,
                            markers: false,
                        }, 
                        defaults: {ease: "none"} 
                    });
                tl.add('start')
                .to('.intro__img', {
                    scale: 0.5,
                    y: oneFourHeight,
                }, 'start')  
                .to('.intro__body', {
                    y: -200
                }, 'start')
            })
        }
    })
}
animations()
// !gsap animations end 

