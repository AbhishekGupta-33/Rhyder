import {Platform} from 'react-native';
import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';

/**
 * Upload an image
 * @param formData - Image file data
 */
export const uploadImage = async (
  formData: FormData,
  onProgress: (progress: number) => void,
) => {
  try {
    const response = await apiClient.post(
      ApiName.documents.uploadImage,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: progressEvent => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            onProgress(percentCompleted);
          }
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload an identity document
 * @param documentType - Type of document (e.g., passport, ID card)
 * @param formData - File data
 */
export const uploadIdentity = async (
  documentType: number,
  formData: FormData,
  onProgress: (progress: number) => void,
) => {
  try {
    const response = await apiClient.post(
      ApiName.documents.uploadIdentity(documentType),
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: progressEvent => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            onProgress(percentCompleted);
          }
        },
      },
    );
    console.log("response=====",response);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch user uploaded image
 */
export const getUserImage = async () => {
  try {
    const response = await apiClient.get(ApiName.documents.getUserImage);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get required documents for verification
 */
export const getRequiredDocuments = async () => {
  try {
    const response = await apiClient.get(
      ApiName.documents.getRequiredDocuments,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get uploaded documents list
 */
export const getUploadedDocuments = async () => {
  try {
    const response = await apiClient.get(
      ApiName.documents.getUploadedDocuments,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete an uploaded image by document ID
 * @param documentId - ID of the document to delete
 */
export const deleteDocument = async (documentId: number) => {
  try {
    const response = await apiClient.delete(
      ApiName.documents.deleteImage(documentId),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
