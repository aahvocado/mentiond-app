import React, { PureComponent } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import clamp from 'utilities/clamp';
import combineClassNames from 'utilities/combineClassNames';

/**
 * specialized gesture renderer for CategoryViewItem
 * @param {Object} props
 */
function GestureHandlerComponent(props) {
  const {
    /** @type {String} */
    className,
    /** @type {Boolean} */
    enabled = true,
    /** @type {Array} default [x, y] translation */
    base = [0, 0],
    /** @type {Array} minimum distance allowed to slide [left, up] */
    min = [-1000, -1000],
    /** @type {Array} maximum distance allowed to slide [right, down] */
    max = [1000, 1000],
    /** @type {Function} */
    onSlideXMin = () => {},
    /** @type {Function} */
    onSlideXMax = () => {},
    /** @type {Object} */
    style,
    ...otherProps
  } = props;

  const HORIZONTAL_MINIMUM = 15;
  const VERTICAL_LIMIT = 150;

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  // 1. we define the drag gesture logic using the useDrag hook
  const bind = useDrag(({ cancel, down, delta, last }) => {
    // reset if user's pointer moves too far away vertically
    if (Math.abs(delta[1]) > VERTICAL_LIMIT) {
      set({ xy: [0, 0]});
      return;
    }

    // do not do anything if pointer has not moved very much,
    //  because the user could just be doing a vertical scroll
    if (Math.abs(delta[0]) < HORIZONTAL_MINIMUM) {
      set({ xy: [0, 0]});
      return;
    }

    // callback when hitting horizontal min
    if (last && delta[0] <= min[0]) {
      onSlideXMin({delta, cancel});
    };

    // callback when hitting horizontal max
    if (last && delta[0] >= max[0]) {
      onSlideXMax({delta, cancel});
    }

    // keep x value within bounds
    delta[0] = clamp(delta[0], min[0], max[0]);
    delta[1] = clamp(delta[1], min[1], max[1]);

    // done
    set({ xy: down ? delta : [0, 0] });
  }, {
    enabled: enabled,
  });

  return (
    <animated.div
      className={className}
      // 2. we bind the result of the hook to our component
      {...bind()}
      style={{
        ...style,
        userSelect: 'none',
        transform: xy.interpolate((x, y) => `translate3D(${base[0] + x}px, ${base[1] + y}px, 0)`),
      }}
      {...otherProps}
    />
  )
}
/**
 * Basic Mentionable List Item
 */
export default class CategoryViewItem extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    itemClassName: 'fontfamily-secondary borradius-2 width-full height-full',
    /** @type {Number} */
    mentions: 0,
    /** @type {String} */
    id: undefined,
    /** @type {Number} */
    index: -1,
    /** @type {Boolean} */
    isComplete: false,
    /** @type {Boolean} */
    isFocused: false,
    /** @type {Boolean} */
    isHidden: false,
    /** @type {String} */
    label: '',
    /** @type {Function} */
    onClickItem: () => {},
    /** @type {Function} */
    onDoubleClickItem: () => {},
    /** @type {Function} */
    onClickPlus: () => {},
    /** @type {Function} */
    onComplete: () => {},
    /** @type {Function} */
    onUnComplete: () => {},
    /** @type {Function} */
    onHide: () => {},
    /** @type {Function} */
    onUnHide: () => {},
  };
  /** @override */
  constructor(props) {
    super(props);

    this.onSlideRight = this.onSlideRight.bind(this);
    this.onSlideLeft = this.onSlideLeft.bind(this);
  }
  /** @override */
  render() {
    const {
      itemClassName,
      isComplete,
      isFocused,
      isHidden,
      mentions,
      label,
      style,
      onClickItem,
      onDoubleClickItem,
      onClickPlus,
    } = this.props;

    const shouldShowMinVersion = isComplete || isHidden;

    const leftLabel = isComplete ? 'Un-complete' : 'Complete';
    const rightLabel = isHidden ? 'Un-hide' : 'Hide';

    return (
      <animated.div
        className='position-absolute'
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          ...style,
        }}
      >
        <div className='position-relative width-full height-full'>
          <GestureHandlerComponent
            className='position-absolute'
            style={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 2,
            }}
            // enabled={!isHidden && !isComplete}
            min={[-110, 0]}
            max={[110, 0]}
            onSlideXMin={this.onSlideLeft}
            onSlideXMax={this.onSlideRight}
          >
            <CategoryViewItemBody
              className={itemClassName}
              isComplete={isComplete}
              isFocused={isFocused}
              isHidden={isHidden}
              label={label}
              mentions={mentions}
              onClickItem={onClickItem}
              onDoubleClickItem={onDoubleClickItem}
              onClickPlus={onClickPlus}

              shouldShowMinVersion={shouldShowMinVersion}
            />
          </GestureHandlerComponent>

          <div className={combineClassNames(itemClassName, 'flex-row aitems-center pad-2 boxsizing-border height-full color-white')}
            style={{
              background: 'linear-gradient(90deg, rgba(0,179,1,1) 0%, rgba(204,255,0,1) 25%, rgba(255,139,0,1) 75%, rgba(255,0,0,1) 100%)',
            }}
          >
            <div className='flex-auto talign-left'>{leftLabel}</div>
            <div className='flex-auto talign-right'>{rightLabel}</div>
          </div>
        </div>
      </animated.div>
    );
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideRight(gestureEvent) {
    const {
      isComplete,
      onComplete,
      onUnComplete,
    } = this.props;

    gestureEvent.cancel();
    if (isComplete) {
      onUnComplete(gestureEvent);
    } else {
      onComplete(gestureEvent);
    }
  }
  /**
   * @param {GestureEvent} gestureEvent
   */
  onSlideLeft(gestureEvent) {
    const {
      isHidden,
      onHide,
      onUnHide,
    } = this.props;

    gestureEvent.cancel();

    if (isHidden) {
      onUnHide(gestureEvent);
    } else {
      onHide(gestureEvent);
    }
  }
}
/**
 * body of a mentionable list item
 */
class CategoryViewItemBody extends PureComponent {
  /** @override */
  static defaultProps = {
    /** @type {String} */
    className: '',
    /** @type {Boolean} */
    isComplete: false,
    /** @type {Boolean} */
    isFocused: false,
    /** @type {Boolean} */
    isHidden: false,
    /** @type {String} */
    label: '',
    /** @type {Number} */
    mentions: 0,
    /** @type {Function} */
    onClickItem: () => {},
    /** @type {Function} */
    onDoubleClickItem: () => {},
    /** @type {Function} */
    onClickPlus: () => {},
    //
    /** @type {Boolean} */
    shouldShowMinVersion: false,
  };
  /** @override */
  render() {
    const {
      className,
      isComplete,
      isFocused,
      isHidden,
      label,
      mentions,
      onClickItem,
      onClickPlus,
      onDoubleClickItem,
      shouldShowMinVersion,
    } = this.props;

    const borderClassName = (() => {
      if (isComplete) {
        return 'bor-2-green';
      }

      if (isFocused) {
        return 'bor-2-tertiary';
      }

      return 'bor-2-transparent';
    })();

    const hiddenClassName = isHidden ? 'color-grayest bg-gray' : 'color-grayest bg-white';

    return (
      <div
        className={combineClassNames('boxsizing-border flex-row aitems-center overflow-hidden', className, borderClassName, hiddenClassName)}
      >
        {/* left container */}
        <div
          className={combineClassNames('flex-row-center height-full flex-auto boxsizing-border adjacent-mar-l-3', shouldShowMinVersion ? 'width-full' : '')}
          onClick={onClickItem}
          onDoubleClick={onDoubleClickItem}
        >
          <div className='pad-2 flex-auto text-ellipsis fsize-4 '>{label}</div>
          <div className='pad-2 flex-none fsize-3 '>{`${mentions} mentions`}</div>
        </div>

        {/* right container - actions */}
        { !shouldShowMinVersion &&
          <button
            className='flex-none cursor-pointer fsize-4 pad-2'
            disabled={isHidden || isComplete}
            onClick={onClickPlus}
          >
            +
          </button>
        }
      </div>

    );
  }
}
