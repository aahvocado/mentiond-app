import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';

export function HorizontalSlideGestureComponent(props) {
  const {
    className,
    ...otherProps
  } = props;

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  // 1. we define the drag gesture logic using the useGesture hook
  const bind = useGesture(({ down, delta }) => {
    set({ xy: down ? delta : [0, 0] })
  })

  return (
    <animated.div
      className={className}
      // 2. we bind the result of the hook to our component
      {...bind()}
      style={{
        userSelect: 'none',
        transform: xy.interpolate((x, y) => `translate3D(${x}px, 0, 0)`),
      }}
      {...otherProps}
    />
  )
}
