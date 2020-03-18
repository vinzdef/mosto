import { Lethargy } from 'lethargy';
import emitter from '../base/emitter';
import Component from './component';
import { handleEvent } from '../base/utils';

class ScrollJack extends Component {

    constructor(selector, opts) {
        super(selector, opts);

        this.$scrollContainer = document.querySelector(selector);
        this.dragStart = null;
        this.isModalOpen = false;
        this.isStopped = true;
        this.isAnimating = false;
        this.handleMouse = null;
        this.handleKeydown = null;
        this.handleTouchstart = null;
        this.handleTouchmove = null;
        this.handleTouchend = null;
        this.scroll = 0;
        this.position = 0;
        this.limits = null;

        this.lethargy = new Lethargy();
        this.init();
    }

    init() {
        // this.start();
        this.isStopped = false;
        this.limits = {
            min: 0,
            max: 20,
        };

        this.handleMouse = handleEvent('mousewheel', {
            onElement: this.$scrollContainer,
            withCallback: (e) => {
                e.preventDefault();
                e.stopPropagation();

                let direction;
                if (this.lethargy.check(e) !== false) {
                    if (this.lethargy.check(e) === 1) {
                        direction = 'up';
                    } else {
                        direction = 'down';
                    }
                    this.scrollPage(direction);
                }
            },
        });

        this.handleKeydown = handleEvent('keydown', {
            onElement: document,
            withCallback: (e) => {
                const direction = ScrollJack.getKeyDirection(e);
                this.scrollPage(direction);
            },
        });
    }

    scrollPage(direction) {
        if (this.isModalOpen || this.isStopped) {
            return false;
        }

        emitter.emit(`scrolljack:scroll:${direction}`);

        if (direction === 'up') {
            emitter.emit('scroll', -1, this.target);
        } else if (direction === 'down') {
            emitter.emit('scroll', 1, this.target);
        } else {
            console.log('silence is golden.');
        }
    }

    // new function to implement --- referred from this https://www.hpmagicwords.com.br/
    // move(move) {
    //     this.position += move;
    //     this.position = (this.position < this.limits.min) ? this.limits.min : this.position;
    //     this.position = (this.position > this.limits.max) ? this.limits.max : this.position;
    //
    //     TweenLite.killTweensOf(this);
    //     TweenLite.to(this, .5, {
    //         scroll: this.position,
    //         onUpdate: () => {
    //             this.percent = 100 * this.position / this.limits.max;
    //         },
    //     });
    //
    // }

    touchStartHandler(e) {
        if (this.dragStart !== null) {
            return;
        }
        const evt = this._normalizeEvent(e);
        // where in the viewport was touched
        this.dragStart = evt.clientY;
    }

    touchMoveHandler(e) {
        if (this.dragStart === null) {
            return;
        }

        const evt = this._normalizeEvent(e);

        if (typeof this.deltaScroll === 'undefined') {
            this.deltaScroll = 0;
        }

        if (typeof this.percentage === 'undefined') {
            this.percentage = 0;
        }

        this.deltaScroll = this.dragStart - evt.clientY;
        this.percentage = this.deltaScroll / screen.height;
    }

    getTouchDirection() {
        const dragThreshold = 0.15;

        this.dragStart = null;
        if (this.percentage === 0 || this.percentage === undefined || this.percentage === null) {
            this.deltaScroll = 0;
            this.percentage = 0;
            return false;
        } else if (this.percentage >= dragThreshold) {
            this.deltaScroll = 0;
            this.percentage = 0;
            return 'down';
        } else if (Math.abs(this.percentage) >= dragThreshold) {
            this.deltaScroll = 0;
            this.percentage = 0;
            return 'up';
        }

        return 'down';
    }

    static _normalizeEvent(e) {
        let evt = null;
        if (e.touches) {
            evt = e.touches[0];
        }
        return evt;
    }

    static getKeyDirection(e) {
        let direction = '';
        if (e.which === 38 || e.which === 33) {
            direction = 'up';
        } else if (e.which === 40 || e.which === 34) {
            direction = 'down';
        }
        return direction;
    }

    start() {
        this.isStopped = false;

        document.addEventListener('DOMMouseScroll', this.preventEvent);
        document.addEventListener('mousewheel', this.preventEvent);
        document.addEventListener('keydown', this.preventEvent);
    }

    stop() {
        this.isStopped = true;
        this.handleMouse.destroy();
        this.handleMouse.destroy();
        this.handleKeydown.destroy();
        this.noscroll = false;
    }

}

export default ScrollJack;
