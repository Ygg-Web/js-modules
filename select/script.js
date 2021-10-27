const getTemplate = (data = [], placeholder) => {
    // const text = placeholder ? ? 'Текст по умолчанию'

    const items = data.map(item => {
        return `
        <li class = "select__item"> ${item.value} </li>
        `
    })
    return `
    <div class="select__input" data-type="input">
            <span>${placeholder ?? 'Текст по умолчанию'}</span>
            <i class="fa fa-chevron-down" data-type="arrow" aria-hidden="true"></i></div>
        <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}    
        </ul>
    </div>`
}

class Select {
    constructor(selector, options) {
        this.elem = document.querySelector(selector)
        this.options = options


        this.render()
        this.setup()
    }

    render() {
        const { placeholder, data } = this.options
        this.elem.classList.add('select')
        this.elem.innerHTML = getTemplate(data, placeholder)
    }
    setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.elem.addEventListener('click', this.clickHandler)
        this.arrow = this.elem.querySelector('[data-type="arrow"]')
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
        this.arrow.classList.remove('fa-chevron-down')
        this.arrow.classList.add('fa-chevron-up')
    }

    close() {
        this.elem.classList.remove('open')
        this.arrow.classList.add('fa-chevron-down')
        this.arrow.classList.remove('fa-chevron-up')
    }

    destroy() {
        this.elem.removeEventListener('click', this.clickHandler)
    }
}


const select = new Select('#select', {
    placeholder: 'Выбери пожалуйста элемент',
    data: [
        { id: '1', value: 'React' },
        { id: '2', value: 'Angular' },
        { id: '3', value: 'Vue' },
        { id: '4', value: 'React Native' },
        { id: '5', value: 'Next' },
        { id: '6', value: 'Nest' }

    ]
})

window.s = select