// import React, { useState, memo } from 'react';
// import { View, TextInput } from 'react-native';

// const SearchBar = memo(() => {
//   const [searchQuery, setSearchQuery] = useState('');
//   return (
//     <View className="my-4 rounded-lg border border-gray-300 bg-white px-4 py-2">
//       <TextInput
//         placeholder="Search "
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         className="text-base"
//       />
//     </View>
//   );
// });

// export default SearchBar;

import React, { useState, memo } from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="my-4 rounded-lg border border-gray-300 bg-white px-4">
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="py-1 text-base"
      />
    </View>
  );
});

export default SearchBar;
