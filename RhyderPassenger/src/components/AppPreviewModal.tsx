import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {WebView} from 'react-native-webview';
import AppImage from './AppImage';

interface AppPreviewModalProps {
  visible: boolean;
  onCancelPress: () => void;
  selectedDocument: any;
}

const {width, height} = Dimensions.get('window');

const AppPreviewModal: React.FC<AppPreviewModalProps> = ({
  visible,
  onCancelPress,
  selectedDocument,
}) => {
  console.log('selectedDocument===', selectedDocument);

  return (
    <Modal visible={visible} transparent animationType={'fade'}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancelPress}>
            <Icon name="closecircle" color="#ffffff" size={24} />
          </TouchableOpacity>
          {selectedDocument?.url?.endsWith('.pdf') ? (
            <WebView
              source={{uri: selectedDocument.url}}
              style={styles.webView}
            />
          ) : (
            <AppImage
              source={{uri: selectedDocument?.url}}
              style={styles.imagePreview}
              resizeMode={'contain'}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  webView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
});

export default AppPreviewModal;
