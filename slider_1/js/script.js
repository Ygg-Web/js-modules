const prev = document.querySelector('.btn-prev'),
    next = document.querySelector('.btn-next'),
    sliders = document.querySelectorAll('.section-slide'),
    dots = document.querySelectorAll('.dot');

let index = 0;

const activeSlide = n => {
    sliders.forEach(slide => {
        slide.classList.remove('active');
    })
    sliders[n].classList.add('active');
}

const activeDot = n => {
    dots.forEach(dot => {
        dot.classList.remove('active');
    })
    dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeDot(ind);
}

const nextSlide = () => {
    if (index == sliders.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
        rollSlider();
    } else {
        index++;
        prepareCurrentSlide(index);
        rollSlider();
    }
}

const prevSlide = () => {
    if (index == 0) {
        index = sliders.length -1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


dots.forEach((dot, indexDot) => {
dot.addEventListener('click', ()=> {
        index = indexDot;
        prepareCurrentSlide(index);
    });  
})

setInterval(nextSlide, 5000);

