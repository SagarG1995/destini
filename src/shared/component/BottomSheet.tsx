import React, { FC, memo, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, BackHandler, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import { SCREEN_HEIGHT } from '../constants/dimensions';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-worklets';
import { colors } from '../constants/colors';

interface BottomSheetInterface {
  children: React.ReactNode;
  duration?: number;
  isOpen: boolean;
  toggleModal?: () => void;
  sheetStyle?: StyleProp<ViewStyle>
}

const BottomSheet: FC<BottomSheetInterface> = ({
  isOpen,
  children,
  duration = 500,
  toggleModal,
  sheetStyle
}) => {

  const height = useSharedValue(SCREEN_HEIGHT);
  const isOpenShared = useSharedValue(false);
  const dragY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        dragY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (dragY.value > 100) {
        if (toggleModal) {
          // dragY.value = withTiming(0);
          runOnJS(toggleModal)();
        }
      } else {
        dragY.value = withTiming(0);
      }
    })
    .enabled(isOpen)
    .simultaneousWithExternalGesture()

  const progress = useDerivedValue(() =>
    withTiming(isOpenShared.value ? 0 : 1, { duration })
  );

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * height.value + dragY.value }]
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpenShared.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 }))
  }));

  useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        toggleModal?.(); // call the toggle to close modal
        return true; // prevent default back action
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isOpen, toggleModal]);


  useEffect(() => {
    isOpenShared.value = isOpen;
    if (isOpen) {
      dragY.value = 0;
    }
  }, [isOpen]);

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <TouchableOpacity style={styles.flex} onPress={toggleModal} />

      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.sheet, sheetStyle, animatedSheetStyle]}
      >
        <GestureDetector gesture={gesture}>
          <View style={styles.dragHandleContainer} >
            <View style={styles.dragHandle} />
          </View>
        </GestureDetector>
        {/* <View style={{ flex: 1 }}> */}
        {children}
        {/* </View> */}

      </Animated.View>
    </Animated.View>
  );
};

export default memo(BottomSheet);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparentBlack1,
    zIndex: 1
  },
  flex: {
    flex: 1
  },
  dragHandleContainer: {
    paddingVertical: 15
  },
  dragHandle: {
    height: 5,
    width: 80,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  sheet: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    maxHeight: SCREEN_HEIGHT * 0.8,
    minHeight: SCREEN_HEIGHT * 0.5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 2,
    backgroundColor: colors.black,
    paddingBottom: 10
  }
})
