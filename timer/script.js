let timeOfAction = ' Jan 1 2022 00:00:00';

const getTimeRemaining = (endtime) => {
    let period = new Date(endtime) - new Date(),
        days = Math.floor(period / 1000 / 60 / 60 / 24),
        hours = Math.floor(period / 1000 / 60 / 60) % 24,
        minutes = Math.floor(period / 1000 / 60) % 60,
        seconds = Math.floor(period / 1000) % 60;

    return {
        'period': period,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

const getZero = (num) => {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

const setTimer = (selector, endtime) => {
    const timer = document.querySelector(selector),
        days = document.querySelector('#d'),
        hours = document.querySelector('#h'),
        minutes = document.querySelector('#m'),
        seconds = document.querySelector('#s'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const time = getTimeRemaining(endtime);

        days.innerText = getZero(time.days);
        hours.innerText = getZero(time.hours);
        minutes.innerText = getZero(time.minutes);
        seconds.innerText = getZero(time.seconds);

        if (time.period < 0) {
            timer.innerText = 'Время вышло';
            clearInterval(timeInterval);
        }
    }
}

setTimer('#timer', timeOfAction);