import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import AppButton, {ButtonType} from './AppButton';
import AppText from './AppText';
import AppImage from './AppImage';
import useTheme from '../hooks/useTheme';

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
  imageURL?: string;
  title: string;
  subTitle?: string;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onCancelPress,
  onOkPress,
  cancelButtonTitle,
  okButtonTitle,
  modalType,
  imageURL,
  title,
  subTitle,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    modalContainerStyle: {
      flex: 1,
      backgroundColor: theme.colors.modal_background_color,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.spacing_10,
    },
    innerViewStyle: {
      width: '100%',
      backgroundColor: theme.colors.white,
      borderRadius: theme.radius.borderRadius_10,
      alignItems: 'center',
    },
    imageStyle: {
      width: '100%',
      height: 200,
    },
    buttonStyle: {
      margin: theme.margin.margin_10,
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

  return (
    <Modal visible={visible} transparent animationType="slide">
      <BlurView
        style={styles.absolute}
        blurType={'light'}
        blurAmount={1}
        reducedTransparencyFallbackColor={theme.colors.red}
      />
      <View style={styles.modalContainerStyle}>
        <View style={styles.innerViewStyle}>
          <AppImage source={{uri: imageURL}} style={styles.imageStyle} />
          <AppText size={theme.fontSize.font_20} bold style={styles.textStyle}>
            {title}
          </AppText>
          <AppText
            size={theme.fontSize.font_18}
            color={theme.colors.gray}
            style={styles.textStyle}>
            {subTitle}
          </AppText>
          {modalType === ModalType.PRIMARY ? (
            <View style={styles.primaryButtonViewStyle}>
              <AppButton
                buttonTitle={cancelButtonTitle}
                onPress={onCancelPress}
                buttonType={ButtonType.PRIMARY}
                buttonTitleStyle={{color: theme.colors.white}}
                buttonStyle={{
                  marginVertical: theme.margin.margin_5,
                  width: '45%',
                }}
              />
              {onOkPress && okButtonTitle && (
                <AppButton
                  buttonTitle={okButtonTitle}
                  buttonType={ButtonType.PRIMARY}
                  onPress={onOkPress}
                  buttonStyle={{
                    marginVertical: theme.margin.margin_5,
                    width: '45%',
                  }}
                  buttonTitleStyle={{color: theme.colors.white}}
                />
              )}
            </View>
          ) : (
            <AppButton
              buttonTitle={cancelButtonTitle}
              buttonType={ButtonType.PRIMARY}
              onPress={onCancelPress}
              buttonStyle={{marginVertical: theme.margin.margin_5, width: '45%'}}
              buttonTitleStyle={{color: theme.colors.white}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;
