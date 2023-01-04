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
        <img src="" alt="" draggable="false" class="kg__img-src"/>
    </div>
</div>
<div class="kg__pagination">
        
</div>
        `
        document.body.append(popup);
        let activePopup = '';
        let next = false;
        let prev = false;
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
                console.log(sources);
                document.body.style.overflowY = "hidden";
                popup.classList.add('active');
                const img = document.querySelector('.kg__img-src');
                const src = slide.getAttribute('src');
                const pagination = document.querySelector('.kg__pagination');
                pagination.innerHTML = '';
                for(let i = 0; i < uniqueTeammates.length; i++) {
                    const paginationItem = document.createElement('div');
                    pagination.append(paginationItem);
                    paginationItem.classList.add('kg__pagination-item');
                    const pItems = document.querySelectorAll('.kg__pagination-item');
                    if(uniqueTeammates[i] === activePopup) {
                        for(let l = 0; l < pItems.length; l++){
                            pItems[i].classList.add('active');
                        }
                        if(uniqueTeammates[i+=1]){
                            next = true;
                        } else {
                            next = false;
                        }
                        if(uniqueTeammates[i-=1]){
                            prev = true;
                        } else {
                            prev = false;
                        }
                    }
                }
                img.setAttribute('src', src);
            })
        })
        document.addEventListener('click', (e) => {
            const el = e.target;
            if(el.classList.contains('kg-close')) {
                popup.classList.remove('active');
                document.body.style.overflowY = "auto";
                popupOpen = false;
            }
            if(el.classList.contains('kg__pagination-item')){
                document.querySelectorAll('.kg__pagination-item').forEach(el => {
                    el.classList.remove('active');
                })
                el.classList.add('active');
                const pItems = document.querySelectorAll('.kg__pagination-item');
                for(let i = 0; i < pItems.length; i++){
                    if(pItems[i].classList.contains('active')){
                        for(let l = 0; l < uniqueTeammates.length; l++){
                            activePopup = uniqueTeammates[i];
                            const img = document.querySelector('.kg__img-src');
                            const src = uniqueTeammates[i].getAttribute('src');
                            img.setAttribute('src', src);
                        }
                    }
                }
            }
        })
    }
}