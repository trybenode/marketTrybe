import React from 'react';
import { Button } from 'react-native-paper';

const SubmitButton = ({ isEditMode, isAgreed, onPress }) => {
  return (
    <Button
      mode="contained"
      disabled={!isAgreed && !isEditMode}
      onPress={onPress}
      labelStyle={{ fontSize: 16, width: '60%' }}
      buttonColor={isEditMode ? 'red' : undefined}
      style={{ marginBottom: 48, marginTop: 20 }}>
      {isEditMode ? 'Update Product' : 'Upload Product'}
    </Button>
  );
};

export default SubmitButton;
