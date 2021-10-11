let date = new Date(' Jan 1 2022 00:00:00');

const counts = () => {
    let now = new Date();
    gap = date - now;

    let days = Math.floor(gap / 1000 / 60 / 60 / 24),
        hours = Math.floor(gap / 1000 / 60 / 60) % 24,
        minutes = Math.floor(gap / 1000 / 60) % 60,
        seconds = Math.floor(gap / 1000) % 60;

    if (gap < 0) {

        document.querySelector('#group').innerText = 'Время вышло';

    } else {
        document.getElementById('d').innerText = getZero(days);
        document.getElementById('h').innerText = getZero(hours);
        document.getElementById('m').innerText = getZero(minutes);
        document.getElementById('s').innerText = getZero(seconds);
    }
}

const getZero = (num) => {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

counts();

setInterval(counts, 1000);