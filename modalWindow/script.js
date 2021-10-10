const lib = {}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__inner" data-close="true">
    <div class="modal__window" style="width:${options.width || DEFAULT_WIDTH}">
        <div class="modal__header">
            <span class="modal__title">${options.title || 'Title Modal JS'}</span>
            ${options.closable ? '<span class="modal__close" data-close="true">&times;</span>' : ''}
        </div>
        <div class="modal__body" data-content>${options.content || ''}</div>
        <div class="modal__footer">
            <div class="btns">
                <button>Ok</button>
                <button>Cansel</button>
            </div>
        </div>
    </div>
    </div>
`)
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
    width: '400px',
});


// параметры options
// title:String передавать в модал титул
// closable: Boolean если тру крестик показывается если фолс - нет крестика
// content String какой-то контент попадает в боди
// width String ширина модалки
// destroy () void удалять из дом дерева модал и удалять все слушатели
// при нажатии на крестик окно закрывается
// и на подложку тоже
// -----------------

// публичный метод setContent(html-string) void вызывая данный метод динамически меняется содержимое модал окна