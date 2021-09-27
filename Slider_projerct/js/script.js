'use strict';

class SliderCarousel {
    constructor({ main, wrap, next, prev, position = 0 }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = this.wrap.children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.options = {
            position
        };
    }

    init() {
        // console.log(this.slides);
        this.addGloClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (let item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'sliderCarousel-style';
        style.textContent = `
        .glo-slider{
            overflow: hidden !important;
        }
        .glo-slider__wrap {
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }
        .glo-slider__item{
            flex: 0  0 25% !important;
            margin: auto 0 !important;
        }
        `
        document.head.append(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider);
        this.next.addEventListener('click', this.nextSlider);
    }

    prevSlider() {
        --this.options.position;
        console.log(this.options.position)
    }

    nextSlider() {
        ++this.options.position;
        console.log(this.options.position)
    }

    addArrow() {

    }
}