
import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '../constants/dimensions';
import Modal from 'react-native-modal';
import { colors } from '../constants/colors';

interface BottomSheetInterface {
  children: React.ReactNode;
  toggleModal?: () => void;
  isOpen?: boolean
}

const CustomBottomSheet: FC<BottomSheetInterface> = ({
  children,
  toggleModal,
  isOpen = false
}) => {


  return (
    <Modal
      useNativeDriver={true}
      animationIn='slideInUp'
      animationOut='fadeOut'
      hasBackdrop={true}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      style={styles.modal}
      isVisible={isOpen}
    >
      <View style={styles.content}>
        {
          children
        }
      </View>
    </Modal>
  );
};

export default memo(CustomBottomSheet);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.transparentBlack1,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end'
  },
  content: {
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.black,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 10,
    overflow: 'hidden'
  },
})
