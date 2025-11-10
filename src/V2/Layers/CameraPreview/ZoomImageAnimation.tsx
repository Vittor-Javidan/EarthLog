import React, { memo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export const ZoomableImage = memo((props: {
  pictureUri: string;
  maxScale: number;
  minScale: number;
}) => {

  // const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  // const isPinching = useRef(new Animated.Value(0)).current;
  const [isPinching, setIsPinching] = useState<boolean>()

  const savedScale = useRef(1);
  const savedTranslate = useRef({ x: 0, y: 0 });

  // clamp function to avoid panning outside screen
  // const clampTranslate = (x: number, y: number) => {
  //   const maxTranslateX = (savedScale.current - 1) * screenWidth / 2;
  //   const maxTranslateY = (savedScale.current - 1) * screenHeight / 2;
  //   return {
  //     x: Math.min(maxTranslateX, Math.max(-maxTranslateX, x)),
  //     y: Math.min(maxTranslateY, Math.max(-maxTranslateY, y)),
  //   };
  // };

  const pinchGesture = Gesture.Pinch()
  .onUpdate((event) => {
    setIsPinching(true)
    if (event.numberOfPointers === 2) {
      let newScale = savedScale.current * event.scale;
      newScale = Math.max(props.minScale, Math.min(props.maxScale, newScale));
      scale.setValue(newScale);
    }
  })
  .onEnd((event) => {
    let finalScale = savedScale.current * event.scale;
    finalScale = Math.max(props.minScale, Math.min(props.maxScale, finalScale));
    savedScale.current = finalScale;
    savedTranslate.current = { x: savedTranslate.current.x, y: savedTranslate.current.y}

    Animated.spring(scale, {
      toValue: finalScale,
      useNativeDriver: true,
      friction: 4,
    }).start(() => {});

    setTimeout(() => {
      setIsPinching(false);
    }, 50);

  });

  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    if (!isPinching && event.numberOfPointers === 1) {
      let newX = savedTranslate.current.x + event.translationX / savedScale.current;
      let newY = savedTranslate.current.y + event.translationY / savedScale.current;
      translateX.setValue(newX);
      translateY.setValue(newY);
    }
  })
  .onEnd((event) => {
    if (!isPinching && event.numberOfPointers === 1) {
      let newX = savedTranslate.current.x + event.translationX / savedScale.current;
      let newY = savedTranslate.current.y + event.translationY / savedScale.current;
      savedTranslate.current = { x: newX, y: newY}

      Animated.spring(translateX, {
        toValue: savedTranslate.current.x,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateY, {
        toValue: savedTranslate.current.y,
        useNativeDriver: true,
      }).start();
    }
  });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={{
          flex: 1,
        }}
      >
        <Animated.Image
          source={{ uri: props.pictureUri }}
          style={{
            flex: 1,
            resizeMode: 'contain',
            transform: [
              { scale },
              { translateX },
              { translateY },
            ],
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
});
