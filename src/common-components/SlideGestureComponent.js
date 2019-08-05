import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import clamp from 'utilities/clamp';

export default function SlideGestureComponent(props) {
  const {
    /** @type {String} */
    className,
    /** @type {Boolean} */
    enabled = true,
    /** @type {Array} minimum distance allowed to slide [left, up] */
    min = [-1000, -1000],
    /** @type {Array} maximum distance allowed to slide [right, down] */
    max = [1000, 1000],
    /** @type {Function} */
    onSlideXMin = () => {},
    /** @type {Function} */
    onSlideXMax = () => {},
    /** @type {Function} */
    onSlideYMin = () => {},
    /** @type {Function} */
    onSlideYMax = () => {},
    /** @type {Object} */
    style,
    ...otherProps
  } = props;

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  // 1. we define the drag gesture logic using the useDrag hook
  const bind = useDrag(({ cancel, down, delta, last }) => {
    // callback when hitting horizontal min
    if (last && delta[0] <= min[0]) {
      onSlideXMin({delta, cancel});
    };

    // callback when hitting horizontal max
    if (last && delta[0] >= max[0]) {
      onSlideXMax({delta, cancel});
    }

    // callback when hitting vertical min
    if (last && delta[1] <= min[1]) {
      onSlideYMin({delta, cancel});
    };

    // callback when hitting vertical max
    if (last && delta[1] >= max[1]) {
      onSlideYMax({delta, cancel});
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
        transform: xy.interpolate((x, y) => `translate3D(${x}px, ${y}px, 0)`),
      }}
      {...otherProps}
    />
  )
}
