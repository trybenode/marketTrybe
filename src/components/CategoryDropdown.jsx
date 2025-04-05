//category selection
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ScrollView, View } from 'react-native';

const CategoryDropdown = ({ open, setOpen, selectedValue, setSelectedValue }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
      const categoryData = querySnapshot.docs.map((doc) => ({
        label: doc.data().name, // DropdownPicker expects label/value format
        value: doc.data().name,
      }));
      setCategory(categoryData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ zIndex: 1000, elevation: 5 }}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={category}
        setOpen={setOpen}
        setValue={setSelectedValue}
        listMode="MODAL"
        placeholder="Select Category"
        style={{ marginBottom: 10 }}
        dropDownContainerStyle={{ zIndex: 1000, elevation: 5 }}
        modalProps={{ animationType: 'slide' }}
      />
    </View>
  );
};

export default CategoryDropdown;
