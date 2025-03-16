//category list in sell/upload page.
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CategoryDropdown = ({
  open,
  setOpen,
  selectedValue,
  setSelectedValue,
  category,
  setCategory,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={category}
      setOpen={setOpen}
      setValue={setSelectedValue}
      setItems={setCategory}
      placeholder="Select Category"
      style={{ marginBottom: 10 }}
    />
  );
};

export default CategoryDropdown;
