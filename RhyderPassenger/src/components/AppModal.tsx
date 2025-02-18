import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import AppButton, {ButtonType} from './AppButton';
import AppText from './AppText';

// Enum for modal types
export enum ModalType {
  PRIMARY = 'primary',
}

interface AppModalProps {
  visible: boolean;
  onCancelPress: () => void;
  onOkPress?: () => void;
  cancelButtonTitle: string;
  okButtonTitle?: string;
  modalType?: ModalType;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onCancelPress,
  onOkPress,
  cancelButtonTitle,
  okButtonTitle,
  modalType,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <BlurView
        style={styles.absolute}
        blurType={'light'}
        blurAmount={1}
        reducedTransparencyFallbackColor="red"/>
        <View style={styles.modalContainerStyle}>
          <View style={styles.innerViewStyle}>
            <Image
              source={{uri: 'https://imageglass.org/img/ribbon.webp'}}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <AppText size={20} bold color="#0cbaf3" style={styles.textStyle}>
              {'Congratulations 🎉'}
            </AppText>
            {modalType === ModalType.PRIMARY ? (
              <View style={styles.primaryButtonViewStyle}>
                <AppButton
                  buttonTitle={cancelButtonTitle}
                  onPress={onCancelPress}
                  buttonType={ButtonType.PRIMARY}
                  buttonTitleStyle={{color: '#ffffff'}}
                  buttonStyle={{marginVertical: 5, width: '45%'}}
                />
                {onOkPress && okButtonTitle && (
                  <AppButton
                    buttonTitle={okButtonTitle}
                    buttonType={ButtonType.PRIMARY}
                    onPress={onOkPress}
                    buttonStyle={{marginVertical: 5, width: '45%'}}
                    buttonTitleStyle={{color: '#ffffff'}}
                  />
                )}
              </View>
            ) : (
              <AppButton
                buttonTitle={cancelButtonTitle}
                buttonType={ButtonType.PRIMARY}
                onPress={onCancelPress}
                buttonStyle={{marginVertical: 5, width: '45%'}}
                buttonTitleStyle={{color: '#ffffff'}}
              />
            )}
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  innerViewStyle: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%',
    height: 200,
  },
  buttonStyle: {
    margin: 10,
  },
  primaryButtonViewStyle: {
    flexDirection: 'row',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default AppModal;
