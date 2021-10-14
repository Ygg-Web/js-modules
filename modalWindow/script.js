const lib = {}

Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('nmodal__footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.append($btn)
    })

    return wrap
}


function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    modal = document.createElement('div')
    modal.classList.add('nmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="nmodal__inner" data-close="true">
    <div class="nmodal__window" style="width:${options.width || DEFAULT_WIDTH}">
        <div class="nmodal__header">
            <span class="nmodal__title">${options.title || 'Title Modal JS'}</span>
            ${options.closable ? '<span class="nmodal__close" data-close="true">&times;</span>' : ''}
        </div>
        <div class="nmodal__body" data-content>${options.content || ''}</div>
    </div>
    </div>
`)

    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.append(modal)
    return modal
}

lib.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return
            }!closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close();
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}

const myModal = lib.modal({
    title: 'Модальное окно JS',
    closable: true,
    content: `
    <p> Lorem, ipsum dolor sit amet </p> 
    <p> Lorem, ipsum dolor sit amet </p>`,
    width: '800px',
    footerButtons: [{
            text: 'Ok',
            type: 'primary', //стиль css
            handler() {
                console.log('Primary btn click')
            }
        },
        {
            text: 'Cancel',
            type: 'danger', //стиль css
            handler() {
                console.log('Danger btn click')
            }
        }
    ]
});
// ----------------------------------------------------------------------------------

const cards = [
    { id: 1, title: 'Audi', price: 3000, img: 'https://i.pinimg.com/originals/49/ef/c6/49efc635a5f90b9c0547c071be9d717f.jpg' },
    { id: 2, title: 'Volkswagen', price: 2000, img: 'https://rulikolesa.ru/wp-content/uploads/2017/02/maxresdefault-4.jpg' },
    { id: 3, title: 'MercedesBenz', price: 5000, img: 'https://a.d-cd.net/mdAAAgN4GeA-1920.jpg' }
]

const toHTML = card => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 500px;" src="${card.img}" alt="${cards.title}">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${card.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger">Удалить</a>
            </div>
        </div>
    </div>`


/* 
1. Показать цену в модалке (и это д б 1 модалка с картинкой на которую тыкнули)
2. Динамически на основе массива вывести список карточек
3. Модалка для удаления с 2мя кнопками согласени и отмена

-----------------
4. на основе lib.modal нужно сделать другой плагин lib.confirm
*/

function render() {
    const html = cards.map(toHTML).join('')
    document.querySelector('#cards').innerHTML = html
}

render()

const priceModal = lib.modal({
    title: 'Цена на Товар',
    closable: true,
    width: '500px',
    footerButtons: [{
        text: 'Закрыть',
        type: 'primary', //стиль css
        handler() {
            priceModal.close()
        }
    }]
});

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id

    const card = cards.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
        <p>Цена на ${card.title}: <strong>${card.price}$</strong></p>
        `)
        priceModal.open()

    }
})