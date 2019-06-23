/*!
 * Draggabilly v2.2.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([
      'get-size/get-size',
      'unidragger/unidragger',
    ],
    (getSize, Unidragger) => factory(window, getSize, Unidragger));
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size'),
      require('unidragger'),
    );
  } else {
    // browser global
    window.Draggabilly = factory(
      window,
      window.getSize,
      window.Unidragger,
    );
  }
}(window, (window, getSize, Unidragger) => {
  // -------------------------- helpers & variables -------------------------- //

  // extend objects
  function extend(a, b) {
    for (const prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  // helps separate our temporary drag transform from other transforms on an element
  function removeTranslateTransform(transform) {
    const cleanTransform = transform.replace(/translate(3d)?\(.*?\)/, '');
    return cleanTransform.trim();
  }

  function noop() {}

  const { jQuery } = window;

  // --------------------------  -------------------------- //

  function Draggabilly(element, options) {
    // querySelector if string
    this.element = typeof element === 'string'
      ? document.querySelector(element) : element;

    if (jQuery) {
      this.$element = jQuery(this.element);
    }

    // options
    this.options = extend({}, this.constructor.defaults);
    this.option(options);

    this._create();
  }

  // inherit Unidragger methods
  const proto = Draggabilly.prototype = Object.create(Unidragger.prototype);

  Draggabilly.defaults = {
  };

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function (opts) {
    extend(this.options, opts);
  };

  // css position values that don't need to be set
  const positionValues = {
    relative: true,
    absolute: true,
    fixed: true,
  };

  proto._create = function () {
    // properties
    this.position = {};
    this._getPosition();

    this.startPoint = { x: 0, y: 0 };
    this.dragPoint = { x: 0, y: 0 };

    this.startPosition = extend({}, this.position);

    // set relative positioning
    const style = getComputedStyle(this.element);
    if (!positionValues[style.position]) {
      this.element.style.position = 'relative';
    }

    // events, bridge jQuery events from vanilla
    this.on('pointerMove', this.onPointerMove);
    this.on('pointerUp', this.onPointerUp);

    this.enable();
    this.setHandles();
  };

  /**
   * set this.handles and bind start events to 'em
   */
  proto.setHandles = function () {
    this.handles = this.options.handle
      ? this.element.querySelectorAll(this.options.handle) : [this.element];

    this.bindHandles();
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function (type, event, args) {
    const emitArgs = [event].concat(args);
    this.emitEvent(type, emitArgs);
    this.dispatchJQueryEvent(type, event, args);
  };

  proto.dispatchJQueryEvent = function (type, event, args) {
    const { jQuery } = window;
    // trigger jQuery event
    if (!jQuery || !this.$element) {
      return;
    }
    // create jQuery event
    const $event = jQuery.Event(event);
    $event.type = type;
    this.$element.trigger($event, args);
  };

  // -------------------------- position -------------------------- //

  // get x/y position from style
  proto._getPosition = function () {
    const style = getComputedStyle(this.element);
    const x = this._getPositionCoord(style.left, 'width');
    const y = this._getPositionCoord(style.top, 'height');
    // clean up 'auto' or other non-integer values
    this.position.x = isNaN(x) ? 0 : x;
    this.position.y = isNaN(y) ? 0 : y;

    this._addTransformPosition(style);
  };

  proto._getPositionCoord = function (styleSide, measure) {
    if (styleSide.indexOf('%') != -1) {
      // convert percent into pixel for Safari, #75
      const parentSize = getSize(this.element.parentNode);
      // prevent not-in-DOM element throwing bug, #131
      return !parentSize ? 0
        : (parseFloat(styleSide) / 100) * parentSize[measure];
    }
    return parseInt(styleSide, 10);
  };

  // add transform: translate( x, y ) to position
  proto._addTransformPosition = function (style) {
    const { transform } = style;
    // bail out if value is 'none'
    if (transform.indexOf('matrix') !== 0) {
      return;
    }
    // split matrix(1, 0, 0, 1, x, y)
    const matrixValues = transform.split(',');
    // translate X value is in 12th or 4th position
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
    const translateX = parseInt(matrixValues[xIndex], 10);
    // translate Y value is in 13th or 5th position
    const translateY = parseInt(matrixValues[xIndex + 1], 10);
    this.position.x += translateX;
    this.position.y += translateY;
  };

  // -------------------------- events -------------------------- //

  proto.onPointerDown = function (event, pointer) {
    this.element.classList.add('is-pointer-down');
    this.dispatchJQueryEvent('pointerDown', event, [pointer]);
  };

  proto.pointerDown = function (event, pointer) {
    const isOkay = this.okayPointerDown(event);
    if (!isOkay || !this.isEnabled) {
      this._pointerReset();
      return;
    }
    // track start event position
    // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
    this.pointerDownPointer = {
      pageX: pointer.pageX,
      pageY: pointer.pageY,
    };

    event.preventDefault();
    this.pointerDownBlur();
    // bind move and end events
    this._bindPostStartEvents(event);
    this.element.classList.add('is-pointer-down');
    this.dispatchEvent('pointerDown', [event, pointer]);
  };

  /**
   * drag start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.dragStart = function (event, pointer) {
    if (!this.isEnabled) {
      return;
    }
    this._getPosition();
    this.measureContainment();
    // position _when_ drag began
    this.startPosition.x = this.position.x;
    this.startPosition.y = this.position.y;
    // reset left/top style
    this.setLeftTop();

    this.dragPoint.x = 0;
    this.dragPoint.y = 0;

    this.element.classList.add('is-dragging');
    this.dispatchEvent('dragStart', event, [pointer]);
    // start animation
    this.animate();
  };

  proto.measureContainment = function () {
    const container = this.getContainer();
    if (!container) {
      return;
    }

    const elemSize = getSize(this.element);
    const containerSize = getSize(container);
    const elemRect = this.element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
    const borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

    const position = this.relativeStartPosition = {
      x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
      y: elemRect.top - (containerRect.top + containerSize.borderTopWidth),
    };

    this.containSize = {
      width: (containerSize.width - borderSizeX) - position.x - elemSize.width,
      height: (containerSize.height - borderSizeY) - position.y - elemSize.height,
    };
  };

  proto.getContainer = function () {
    const { containment } = this.options;
    if (!containment) {
      return;
    }
    const isElement = containment instanceof HTMLElement;
    // use as element
    if (isElement) {
      return containment;
    }
    // querySelector if string
    if (typeof containment === 'string') {
      return document.querySelector(containment);
    }
    // fallback to parent element
    return this.element.parentNode;
  };

  // ----- move event ----- //

  proto.onPointerMove = function (event, pointer, moveVector) {
    this.dispatchJQueryEvent('pointerMove', event, [pointer, moveVector]);
  };

  /**
   * drag move
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.dragMove = function (event, pointer, moveVector) {
    if (!this.isEnabled) {
      return;
    }
    let dragX = moveVector.x;
    let dragY = moveVector.y;

    const { grid } = this.options;
    const gridX = grid && grid[0];
    const gridY = grid && grid[1];

    dragX = applyGrid(dragX, gridX);
    dragY = applyGrid(dragY, gridY);

    dragX = this.containDrag('x', dragX, gridX);
    dragY = this.containDrag('y', dragY, gridY);

    // constrain to axis
    dragX = this.options.axis == 'y' ? 0 : dragX;
    dragY = this.options.axis == 'x' ? 0 : dragY;

    this.position.x = this.startPosition.x + dragX;
    this.position.y = this.startPosition.y + dragY;
    // set dragPoint properties
    this.dragPoint.x = dragX;
    this.dragPoint.y = dragY;

    this.dispatchEvent('dragMove', event, [pointer, moveVector]);
  };

  function applyGrid(value, grid, method) {
    method = method || 'round';
    return grid ? Math[method](value / grid) * grid : value;
  }

  proto.containDrag = function (axis, drag, grid) {
    if (!this.options.containment) {
      return drag;
    }
    const measure = axis == 'x' ? 'width' : 'height';

    const rel = this.relativeStartPosition[axis];
    const min = applyGrid(-rel, grid, 'ceil');
    let max = this.containSize[measure];
    max = applyGrid(max, grid, 'floor');
    return Math.max(min, Math.min(max, drag));
  };

  // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.onPointerUp = function (event, pointer) {
    this.element.classList.remove('is-pointer-down');
    this.dispatchJQueryEvent('pointerUp', event, [pointer]);
  };

  /**
   * drag end
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.dragEnd = function (event, pointer) {
    if (!this.isEnabled) {
      return;
    }
    // use top left position when complete
    this.element.style.transform = removeTranslateTransform(this.element.style.transform);
    this.setLeftTop();
    this.element.classList.remove('is-dragging');
    this.dispatchEvent('dragEnd', event, [pointer]);
  };

  // -------------------------- animation -------------------------- //

  proto.animate = function () {
    // only render and animate if dragging
    if (!this.isDragging) {
      return;
    }

    this.positionDrag();

    const _this = this;
    requestAnimationFrame(() => {
      _this.animate();
    });
  };

  // left/top positioning
  proto.setLeftTop = function () {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  };

  proto.positionDrag = function () {
    const transform = removeTranslateTransform(this.element.style.transform);
    const translate = `translate3d( ${this.dragPoint.x}px, ${this.dragPoint.y}px, 0)${transform ? ' ' : ''}`;
    this.element.style.transform = translate + transform;
  };

  // ----- staticClick ----- //

  proto.staticClick = function (event, pointer) {
    this.dispatchEvent('staticClick', event, [pointer]);
  };

  // ----- methods ----- //

  /**
   * @param {Number} x
   * @param {Number} y
   */
  proto.setPosition = function (x, y) {
    this.position.x = x;
    this.position.y = y;
    this.setLeftTop();
  };

  proto.enable = function () {
    this.isEnabled = true;
  };

  proto.disable = function () {
    this.isEnabled = false;
    if (this.isDragging) {
      this.dragEnd();
    }
  };

  proto.destroy = function () {
    this.disable();
    // reset styles
    this.element.style.transform = removeTranslateTransform(this.element.style.transform);
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.position = '';
    // unbind handles
    this.unbindHandles();
    // remove jQuery data
    if (this.$element) {
      this.$element.removeData('draggabilly');
    }
  };

  // ----- jQuery bridget ----- //

  // required for jQuery bridget
  proto._init = noop;

  if (jQuery && jQuery.bridget) {
    jQuery.bridget('draggabilly', Draggabilly);
  }

  // -----  ----- //

  return Draggabilly;
}));
