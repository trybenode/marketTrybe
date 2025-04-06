//submit button used on sell screen
import React from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

const SubmitButton = ({ isEditMode, isAgreed, onPress, isLoading }) => {
  return (
    <Button
      mode="contained"
      disabled={(!isAgreed && !isEditMode) || isLoading}
      onPress={onPress}
      labelStyle={{ fontSize: 16, width: '100%' }}
      buttonColor={isEditMode ? 'red' : undefined}
      style={{ width: '45%', marginBottom: 42 }}>
      {isLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : isEditMode ? (
        'Update Product'
      ) : (
        'Upload Product'
      )}
    </Button>
  );
};

export default SubmitButton;
