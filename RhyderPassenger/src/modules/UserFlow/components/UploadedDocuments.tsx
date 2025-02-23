import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppImage, AppText, ShadowCard} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {IconButton} from 'react-native-paper';
import {
  callDeleteDocumentApi,
  callGetUploadedDocumentsApi,
} from '../../Authentication/redux/thunk';
import {useDispatch} from 'react-redux';
import {log} from '../../../utils/Logger';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';
import AppPreviewModal from '../../../components/AppPreviewModal';

type eachDocumentType = {
  id: number | undefined;
  url: string | number | undefined;
  name: string | number | undefined;
};

interface documentListType {
  image: eachDocumentType;
  idProof: eachDocumentType;
  genderProof: eachDocumentType;
}
const initialDocument = {
  image: {
    id: 0,
    url: '',
    name: '',
  },
  idProof: {
    id: 0,
    url: '',
    name: '',
  },
  genderProof: {
    id: 0,
    url: '',
    name: '',
  },
};

const UploadDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<documentListType>(initialDocument);
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState<Boolean>(false);
  const [preViewDocuments, setPreViewDocuments] = useState({});

  useEffect(() => {
    handleUploadedDocuments();
  }, []);

  //Handle uploaded documents
  const handleUploadedDocuments = async () => {
    const getUploadedDocs = await callGetUploadedDocumentsApi(dispatch);
    log('getUploadedDocs----', getUploadedDocs);
    updateDocuments(getUploadedDocs);
  };

  const updateDocuments = (data: any[]) => {
    const updatedDocuments = {...initialDocument};
    for (let i = 0; i < data.length; i++) {
      if (DocumentType.UserImage === data[i].type) {
        updatedDocuments.image = {
          id: data[i].id,
          url: `https://rhyderapi.k-asoftech.com${data[i].fileUrl}`,
          name: data[i].fileName,
        };
      } else if (DocumentType.IdentityProof === data[i].type) {
        updatedDocuments.idProof = {
          id: data[i].id,
          url: `https://rhyderapi.k-asoftech.com${data[i].fileUrl}`,
          name: data[i].fileName,
        };
      } else if (DocumentType.GenderIdentityProof === data[i].type) {
        updatedDocuments.genderProof = {
          id: data[i].id,
          url: `https://rhyderapi.k-asoftech.com${data[i].fileUrl}`,
          name: data[i].fileName,
        };
      }
    }
    setDocuments(updatedDocuments);
  };

  const handleDeletePress = async (
    documentDetail: eachDocumentType,
    docType: number,
  ) => {
    try {
      const response = await callDeleteDocumentApi(dispatch, documentDetail.id);
      let key =
        docType === DocumentType.UserImage
          ? 'image'
          : docType === DocumentType.IdentityProof
          ? 'idProof'
          : 'genderProof';
      if (response) {
        setDocuments({
          ...documents,
          [key]: initialDocument.image,
        });
      }
    } catch (error) {}
  };

  const handlePreviewClick = (
    documentDetail: eachDocumentType,
    docType: string,
  ) => {
    setPreViewDocuments(documentDetail);
    setShowPreview(true);
  };

  return (
    <>
      <ShadowCard style={styles.card}>
        <View style={styles.cardHeader}>
          <AppText style={styles.cardTitle}>
            {AppString.screens.user.uploadedDocuments.header}
          </AppText>
        </View>

        <View style={styles.uploadedCardViewStyle}>
          <AppText style={styles.uploadLabel}>
            {AppString.screens.user.uploadedDocuments.photoLabel}
          </AppText>
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => {
              handlePreviewClick(documents.image, DocumentType.UserImage);
            }}>
            <AppImage
              source={{uri: documents.image.url}}
              style={styles.uploadedPhoto}
              resizeMode={'cover'}
            />
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => {
                handleDeletePress(documents.image, DocumentType.UserImage);
              }}>
              <IconButton icon="delete" iconColor="#FF69B4" size={15} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.uploadedCardViewStyle}>
          <AppText style={styles.uploadLabel}>
            {AppString.screens.user.uploadedDocuments.identityLabel}
          </AppText>
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => {
              handlePreviewClick(documents.idProof, DocumentType.IdentityProof);
            }}>
            <AppImage
              source={{uri: documents.idProof.url}}
              style={styles.uploadedPhoto}
              resizeMode={'cover'}
            />
            {log(documents.idProof.url)}
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => {
                handleDeletePress(documents.idProof, DocumentType.IdentityProof);
              }}>
              <IconButton icon="delete" iconColor="#FF69B4" size={15} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.uploadedCardViewStyle}>
          <AppText style={styles.uploadLabel}>
            {AppString.screens.user.uploadedDocuments.genderLabel}
          </AppText>
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => {
              handlePreviewClick(documents.genderProof, DocumentType.GenderIdentityProof);
            }}>
            <AppImage
              source={{uri: documents.genderProof.url}}
              style={styles.uploadedPhoto}
              resizeMode={'cover'}
            />
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => {
                handleDeletePress(documents.genderProof, DocumentType.GenderIdentityProof);
              }}>
              <IconButton icon="delete" iconColor="#FF69B4" size={15} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ShadowCard>
      {showPreview && (
        <AppPreviewModal
          visible={showPreview}
          onCancelPress={() => {
            setShowPreview(false);
          }}
          selectedDocument={preViewDocuments}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 15,
    borderRadius: 20,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderStyle: 'solid',
  },
  uploadDocsTitle: {
    marginVertical: 16,
  },
  uploadedCardViewStyle: {
    marginVertical: 10,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  uploadCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray',
    padding: 10,
  },
  uploadedPhoto: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
});

export default UploadDocuments;
