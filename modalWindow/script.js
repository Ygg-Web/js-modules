const lib = {};

function _createModal(options) {
    modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__inner">
    <div class="modal__window">
        <div class="modal__header">
            <span class="modal__title">Title Modal JS</span>
            <span class="modal__close">&times;</span>
        </div>
        <div class="modal__body"></div>
        <div class="modal__footer">
            <div class="btns">
                <button>Ok</button>
                <button>Cansel</button>
            </div>
        </div>
    </div>
    </div>
`)
    document.body.append(modal);
    return modal;
}

lib.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false

    return {
        open() {
            !closing && $modal.classList.add('open')
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
}

const myModal = lib.modal();