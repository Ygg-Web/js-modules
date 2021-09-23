let position = 0;
const slidesToShow = 4, //сколько элем показывать
    slidesToScroll = 2, // сколько элементов проскролить
    container = document.querySelector('.slider-box'),
    line = document.querySelector('.slider-line'),
    items = document.querySelectorAll('.slider-item'),
    btnNext = document.querySelector('.btn-next'),
    btnPrev = document.querySelector('.btn-prev'),
    itemsCount = items.length,
    itemWidth = container.clientWidth / slidesToShow,
    movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
});
btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;

    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
});

const setPosition = () => {
    line.style.transform = `translateX(${position}px)`;

};

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth
}
checkBtns();