import {pick, types} from '@react-native-documents/picker';
import React, {createContext, useContext, ReactNode, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  isFileSizeValid,
  prepareFormData,
} from '../utils/ConstantTypes/globalFunctions';
import {
  callDeleteDocumentApi,
  callGetUploadedDocumentsApi,
  callUploadIdentityApi,
} from '../modules/Authentication/redux/thunk';
import {DocumentType} from '../utils/ConstantTypes/authTypes';

type eachDocumentType = {
  id: number;
  url: string | number | undefined;
  name: string | number | undefined;
  uploadStatus: boolean;
  uploadProgress: number;
};
interface documentListType {
  driverPhoto: eachDocumentType;
  usDriverLicense: eachDocumentType;
  genderProof: eachDocumentType;
  permanentAddress: eachDocumentType;
  currentAddress: eachDocumentType;
  vehicleImage: eachDocumentType;
  registrationCertificate: eachDocumentType;
  insurance: eachDocumentType;
  inspection: eachDocumentType;
}

interface DocumentsContextType {
  documents: documentListType;
  handleFileUpload: (type: string) => Promise<void>;
  handleDeletePress: (
    documentDetail: eachDocumentType,
    docType: number,
  ) => Promise<void>;
  handleUploadedDocuments: () => void;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(
  undefined,
);

const initialDocument = {
  vehicleImage: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  registrationCertificate: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  insurance: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  inspection: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  driverPhoto: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  usDriverLicense: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  genderProof: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  permanentAddress: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  currentAddress: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
};

export const DocumentsProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<documentListType>(initialDocument);

  // Handle File Upload
  const handleFileUpload = async (type: string) => {
    console.log('type=====', type);

    try {
      if (type == 'vehicleImages') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        console.log('image=====', image);
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          console.log('fileForm====context', fileForm);
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.VehichleImages,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                vehicleImage: {
                  ...documents.vehicleImage,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          console.log('response====context', response);

          if (response) {
            setDocuments({
              ...documents,
              vehicleImage: {
                ...documents.vehicleImage,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              vehicleImage: {
                ...documents.vehicleImage,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'vehicleImage must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'registrationCertificate') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.RegistrationCertificate,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                registrationCertificate: {
                  ...documents.registrationCertificate,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              registrationCertificate: {
                ...documents.registrationCertificate,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              registrationCertificate: {
                ...documents.registrationCertificate,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'registrationCertificate must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'insurance') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.VehicleInsurance,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                insurance: {
                  ...documents.insurance,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              insurance: {
                ...documents.insurance,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              insurance: {
                ...documents.insurance,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'insurance must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'inspection') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.VehicleInspection,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                inspection: {
                  ...documents.inspection,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              inspection: {
                ...documents.inspection,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              inspection: {
                ...documents.inspection,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'inspection must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'driverPhoto') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.DriverImage,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                driverPhoto: {
                  ...documents.driverPhoto,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              driverPhoto: {
                ...documents.driverPhoto,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              driverPhoto: {
                ...documents.driverPhoto,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'driverPhoto must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'usDriverLicense') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.DriverLicense,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                usDriverLicense: {
                  ...documents.usDriverLicense,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              usDriverLicense: {
                ...documents.usDriverLicense,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              usDriverLicense: {
                ...documents.usDriverLicense,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'usDriverLicense must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'genderProof') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.GenderIdentityProof,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                genderProof: {
                  ...documents.genderProof,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              genderProof: {
                ...documents.genderProof,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              genderProof: {
                ...documents.genderProof,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'genderProof must be between 400 KB and 800 KB.',
          );
        }
      } else if (type == 'permanentAddress') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.DriverPermanentAddress,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                permanentAddress: {
                  ...documents.permanentAddress,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              permanentAddress: {
                ...documents.permanentAddress,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              permanentAddress: {
                ...documents.permanentAddress,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'permanentAddress must be between 400 KB and 800 KB.',
          );
        }
      } else {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType.DriverCurrentAddress,
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                currentAddress: {
                  ...documents.currentAddress,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          if (response) {
            setDocuments({
              ...documents,
              currentAddress: {
                ...documents.currentAddress,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              currentAddress: {
                ...documents.currentAddress,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'currentAddress must be between 400 KB and 800 KB.',
          );
        }
      }
    } catch (error) {
      console.log('File Picker Error:', error);
    }
  };

  const handleDeletePress = async (
    documentDetail: eachDocumentType,
    docType: number,
  ) => {
    try {
      console.log('documentDetail.id====', documentDetail.id);
      const response = await callDeleteDocumentApi(dispatch, documentDetail.id);

      if (response) {
        let updatedDocuments = {...documents};

        switch (docType) {
          case DocumentType.VehichleImages:
            updatedDocuments.vehicleImage = initialDocument.vehicleImage;
            break;
          case DocumentType.RegistrationCertificate:
            updatedDocuments.registrationCertificate =
              initialDocument.registrationCertificate;
            break;
          case DocumentType.VehicleInsurance:
            updatedDocuments.insurance = initialDocument.insurance;
            break;
          case DocumentType.VehicleInspection:
            updatedDocuments.inspection = initialDocument.inspection;
            break;
          case DocumentType.DriverImage:
            updatedDocuments.driverPhoto = initialDocument.driverPhoto;
            break;
          case DocumentType.DriverLicense:
            updatedDocuments.usDriverLicense = initialDocument.usDriverLicense;
            break;
          case DocumentType.GenderIdentityProof:
            updatedDocuments.genderProof = initialDocument.genderProof;
            break;
          case DocumentType.DriverPermanentAddress:
            updatedDocuments.permanentAddress =
              initialDocument.permanentAddress;
            break;
          case DocumentType.DriverCurrentAddress:
            updatedDocuments.currentAddress = initialDocument.currentAddress;
            break;
          default:
            console.warn('Unknown document type:', docType);
        }
        setDocuments(updatedDocuments);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleUploadedDocuments = async () => {
    const getUploadedDocs: any = await callGetUploadedDocumentsApi(dispatch);
    console.log('getUploadedDocs====', getUploadedDocs);
    updateDocuments(getUploadedDocs);
  };

  const updateDocuments = (data: any[]) => {
    let updatedDocuments = {...initialDocument};
    for (let i = 0; i < data.length; i++) {
      if (DocumentType.VehichleImages === data[i].type) {
        updatedDocuments.vehicleImage = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.RegistrationCertificate === data[i].type) {
        updatedDocuments.registrationCertificate = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.VehicleInsurance === data[i].type) {
        updatedDocuments.insurance = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.VehicleInspection === data[i].type) {
        updatedDocuments.inspection = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.UserImage === data[i].type) {
        updatedDocuments.driverPhoto = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.DriverLicense === data[i].type) {
        updatedDocuments.usDriverLicense = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.GenderIdentityProof === data[i].type) {
        updatedDocuments.genderProof = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.DriverPermanentAddress === data[i].type) {
        updatedDocuments.permanentAddress = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType.DriverCurrentAddress === data[i].type) {
        updatedDocuments.currentAddress = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      }
    }
    setDocuments(updatedDocuments);
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        handleFileUpload,
        handleDeletePress,
        handleUploadedDocuments,
      }}>
      {children}
    </DocumentsContext.Provider>
  );
};

// Custom hook to use the Documents Context
export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};
