import React, {createContext, useContext, ReactNode} from 'react';
import {useDispatch} from 'react-redux';

interface DocumentsContextType {}

const DocumentsContext = createContext<DocumentsContextType | undefined>(
  undefined
);

export const DocumentsProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();

  return (
    <DocumentsContext.Provider value={{}}>{children}</DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
