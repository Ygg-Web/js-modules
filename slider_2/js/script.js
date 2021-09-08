const prev = document.querySelector('.btn-prev'),
    next = document.querySelector('.btn-next'),
    sliders = document.querySelectorAll('.section-slide'),
    sliderLine = document.querySelector('.slider__line'),
    dots = document.querySelectorAll('.dot');

let index = 0;
let width;

const init = () => {
    width = document.querySelector('.slider__inner').offsetWidth;
    sliderLine.style.width = width*sliders.length + 'px';
    sliders.forEach(slider => {
        slider.style.width = width + 'px';
        slider.style.height = 'auto';
    })
    // rollSlider();
}

window.addEventListener('resize', init);
init();

const rollSlider = () => {
    sliderLine.style.transform = 'translate(-'+index*width+'px)';
}

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
    rollSlider();
}

const nextSlide = () => {
    if (index == sliders.length - 1) {
        index = 0;
    } else {
        index++;
    }
    prepareCurrentSlide(index);
}

const prevSlide = () => {
    if (index == 0) {
        index = sliders.length -1;
    } else {
        index--;
    }
    prepareCurrentSlide(index);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

dots.forEach((dot, indexDot) => {
dot.addEventListener('click', ()=> {
        index = indexDot;
        rollSlider();
        prepareCurrentSlide(index);
    });  
})

// setInterval(nextSlide, 5000);

