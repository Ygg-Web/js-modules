const getTemplate = () => {
    return `
    <div class="select__input" data-type="input">
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
        this.setup()
    }

    render() {
        this.elem.classList.add('select')
        this.elem.innerHTML = getTemplate()
    }
    setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.elem.addEventListener('click', this.clickHandler)
    }

    clickHandler(event) {
        const { type } = event.target.dataset
        if (type === 'input') {
            this.toggle()
        }
    }
    get isOpen() {
        return this.elem.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.elem.classList.add('open')
    }

    close() {
        this.elem.classList.remove('open')
    }

    destroy() {
        this.elem.removeEventListener('click', this.clickHandler)
    }
}


const select = new Select('#select', {

})

window.s = select