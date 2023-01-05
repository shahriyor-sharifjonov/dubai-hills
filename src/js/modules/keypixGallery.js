import Swiper, { Navigation, Pagination } from 'swiper';

export class keypixGallery {
    init() {
        let popupOpen = false;
        const slides = document.querySelectorAll('[data-kg]');
        const popup = document.createElement('div');
        popup.classList.add('kg');
        popup.innerHTML = `
<div class="kg__overlay kg-close"></div>
<div class="kg__body">
    <div class="kg__img">
        <div class="kg__swiper swiper">
            <div class="kg__wrapper swiper-wrapper">

            </div>
        </div>
    </div>
</div>
<div class="kg__pagination">
</div>
<div class="kg__navigation">
    <button class="kg__prev kg__navigation-button">
        <svg width="27" height="65" viewBox="0 0 27 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 1L1.75438 28.0245C0.736748 29.1588 0.669918 30.8566 1.59524 32.0673L26 64" stroke-width="1"></path>
        </svg>
    </button> 
    <button class="kg__next kg__navigation-button">
        <svg width="26" height="65" viewBox="0 0 26 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L24.2335 26.8964C25.8382 28.685 25.9436 31.3623 24.4844 33.2715L1 64" stroke-width="1"></path>
        </svg>
    </button>
</div>
        `
        document.body.append(popup);
        let activePopup = '';
        let group = '';
        let teammates = [];
        let teammatesList = [];
        let uniqueTeammates = [];
        slides.forEach(slide => {
            slide.classList.add('kg__item');
            slide.addEventListener('click', () => {
                teammates = [];
                teammatesList = [];
                uniqueTeammates = [];
                activePopup = slide;
                popupOpen = !popupOpen;
                group = slide.getAttribute('data-kg-group');
                teammatesList = document.querySelectorAll(`[data-kg-group="${group}"]`)
                teammatesList.forEach(el => {
                    if(el.getAttribute('data-kg-visible') !== 'false'){
                        teammates.push(el);
                    }
                })
                const sources = new Set(teammates.map(x => x.getAttribute('src')));
                teammates.forEach(el => {
                    if(sources.has(el.getAttribute('src'))){
                        uniqueTeammates.push(el);
                        sources.delete(el.getAttribute('src'));
                    }
                })
                document.body.style.overflowY = "hidden";
                popup.classList.add('active');
                const img = document.querySelector('.kg__img-src');
                const src = slide.getAttribute('src');
                const pagination = document.querySelector('.kg__pagination');
                const elWrapper = document.querySelector('.kg__wrapper');
                elWrapper.innerHTML = '';
                for(let i = 0; i < uniqueTeammates.length; i++) {
                    const elSrc = uniqueTeammates[i].getAttribute('src');
                    const elSlide = document.createElement('div');
                    elSlide.classList.add('swiper-slide');
                    elSlide.classList.add('kg__slide');
                    elWrapper.append(elSlide);
                    elSlide.innerHTML = `
<div class="kg-close"></div>
<img src="${elSrc}" alt="" draggable="false" />
                    `
                }
                for(let i = 0; i < uniqueTeammates.length; i++) {
                    if(uniqueTeammates[i].getAttribute('src') === slide.getAttribute('src')) {
                        new Swiper('.kg__swiper', {
                            modules: [Pagination, Navigation],
                            slidesPerView: 1,
                            spaceBetween: 0,
                            initialSlide: i,
                            grabCursor: true,
                            centeredSlides: true,
                            speed: 500,
                            navigation: {
                                nextEl: '.kg__next',
                                prevEl: '.kg__prev',
                            },
                            pagination: {
                                el: ".kg__pagination",
                                clickable: true,
                            },
                        })
                    }
                }
            })
        })
        document.addEventListener('click', (e) => {
            const el = e.target;
            if(el.classList.contains('kg-close')) {
                popup.classList.remove('active');
                document.body.style.overflowY = "auto";
                popupOpen = false;
            }
        })
    }
}