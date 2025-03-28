// //category list in sell/upload page.
// import React, { useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';

// const CategoryDropdown = ({
//   open,
//   setOpen,
//   selectedValue,
//   setSelectedValue,
//   category,
//   setCategory,
// }) => {
//   return (
//     <DropDownPicker
//       open={open}
//       value={selectedValue}
//       items={category}
//       setOpen={setOpen}
//       setValue={setSelectedValue}
//       setItems={setCategory}
//       placeholder="Select Category"
//       style={{ marginBottom: 10 }}
//     />
//   );
// };

// export default CategoryDropdown;
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const CategoryDropdown = ({ open, setOpen, selectedValue, setSelectedValue }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
      const categoryData = querySnapshot.docs.map((doc) => ({
        label: doc.data().name, // DropdownPicker expects label/value format
        value: doc.id,
      }));
      setCategory(categoryData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={category}
      setOpen={setOpen}
      setValue={setSelectedValue}
      placeholder="Select Category"
      style={{ marginBottom: 10 }}
    />
  );
};

export default CategoryDropdown;
