const getTemplate = () => {
    return `
    <div class="select__input">
    <span>Hello</span>
    <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
    <div class="select__dropdown">
    <ul class="select__list">
        <li class="select__item">123</li>
        <li class="select__item">123 </li>
        <li class="select__item">123 </li>
        <li class="select__item">123 </li>
        <li class="select__item">123 </li>
        <li class="select__item">123 </li>

    </ul>
</div>`
}

class Select {
    constructor(selector, options) {
        this.elem = document.querySelector(selector)

        this.render()
    }

    render() {
        this.elem.classList.add('select')
        this.elem.innerHTML = getTemplate()
    }

    open() {
        this.elem.classList.add('open')
    }

    close() {
        this.elem.classList.remove('open')
    }
}


const select = new Select('#select', {

})

window.s = select