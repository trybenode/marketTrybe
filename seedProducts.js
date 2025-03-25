const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc,getDocs, updateDoc, setDoc, doc } = require('firebase/firestore');
const { faker } = require('@faker-js/faker');

// Configuration
const ADMIN_UID = 'DL3gKN7v6GUUImruQXwoYFspgmm1'; // Replace with actual test admin UID
const PRODUCT_COUNT = 15;
// const CATEGORY_COUNT = 20;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateMockProducts = () => {
  const products = [];
  const baseTimestamp = Date.now();

  // Sample categories
  // const categories = [
  //   {
  //     name: 'Electronics',
  //     image:
  //       'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'Smartwatches'],
  //   },
  //   {
  //     name: 'Clothing',
  //     image:
  //       'https://images.pexels.com/photos/8306370/pexels-photo-8306370.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Men', 'Women', 'Kids', 'Winter Wear', 'Sportswear'],
  //   },
  //   {
  //     name: 'Home Appliances',
  //     image:
  //       'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Kitchen Appliances', 'Laundry', 'Cooling & Heating', 'Vacuum Cleaners'],
  //   },
  //   {
  //     name: 'Foot Wear',
  //     image:
  //       'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Casual Shoes', 'Formal Shoes', 'Sneakers', 'Sandals', 'Slippers'],
  //   },
  //   {
  //     name: 'Jewelry',
  //     image:
  //       'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches'],
  //   },
  //   {
  //     name: 'Hair Accessories',
  //     image:
  //       'https://images.pexels.com/photos/30988728/pexels-photo-30988728/free-photo-of-elegant-flat-lay-of-beauty-accessories-on-magazine.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Hair Clips', 'Hair Bands', 'Wigs', 'Hair Extensions', 'Hair Care'],
  //   },
  //   {
  //     name: 'Body Care',
  //     image:
  //       'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Lotions', 'Scrubs', 'Body Wash', 'Perfumes', 'Deodorants'],
  //   },
  //   {
  //     name: 'Snacks',
  //     image:
  //       'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Chips', 'Biscuits', 'Nuts & Seeds', 'Chocolate', 'Cereal Bars'],
  //   },
  //   {
  //     name: 'Sports & Fitness',
  //     image:
  //       'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Gym Equipment', 'Yoga Mats', 'Cycling', 'Running Shoes', 'Sportswear'],
  //   },
  //   {
  //     name: 'Toys & Games',
  //     image:
  //       'https://images.pexels.com/photos/3933021/pexels-photo-3933021.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Educational Toys', 'Board Games', 'Action Figures', 'Dolls', 'Puzzles'],
  //   },
  //   {
  //     name: 'Books & Stationery',
  //     image:
  //       'https://images.pexels.com/photos/5022971/pexels-photo-5022971.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Fiction', 'Non-Fiction', 'Comics', 'School Supplies', 'Office Supplies'],
  //   },
  //   {
  //     name: 'Beauty & Makeup',
  //     image:
  //       'https://images.pexels.com/photos/3892677/pexels-photo-3892677.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Lipsticks', 'Foundations', 'Mascara', 'Nail Polish', 'Makeup Brushes'],
  //   },
  //   {
  //     name: 'Pet Supplies',
  //     image:
  //       'https://images.pexels.com/photos/6870752/pexels-photo-6870752.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Dog Food', 'Cat Food', 'Pet Toys', 'Pet Grooming', 'Pet Beds'],
  //   },
  //   {
  //     name: 'Automotive',
  //     image:
  //       'https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: [
  //       'Car Accessories',
  //       'Motorcycle Gear',
  //       'Tires & Wheels',
  //       'Car Cleaning',
  //       'Car Audio',
  //     ],
  //   },
  //   {
  //     name: 'Groceries',
  //     image:
  //       'https://images.pexels.com/photos/3952049/pexels-photo-3952049.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Vegetables', 'Fruits', 'Dairy Products', 'Bakery', 'Beverages'],
  //   },
  //   {
  //     name: 'Furniture',
  //     image:
  //       'https://images.pexels.com/photos/6489086/pexels-photo-6489086.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     subcategories: ['Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Storage'],
  //   },
  // ];

  for (let i = 0; i < PRODUCT_COUNT; i++) {
    const category = faker.helpers.arrayElement(categories);
    const productId = `${ADMIN_UID}_${baseTimestamp}_${i}`;

    products.push({
      id: productId,
      data: {
        name: faker.commerce.productName(),
        subcategory: faker.helpers.arrayElement(category.subcategories),
        categoryId: category.id,
        negotiable: faker.datatype.boolean(),
        description: faker.commerce.productDescription(),
        brand: faker.company.name(),
        condition: faker.helpers.arrayElement(['New', 'Used', 'Refurbished']),
        color: faker.color.human(),
        price: parseFloat(faker.commerce.price(1000, 500000)),
        orignalPrice: price - (price * 0.2), // 5% discount
        year: faker.date.between({ from: '2015-01-01', to: '2023-01-01' }).getFullYear(),
        userId: ADMIN_UID,
        createdAt: new Date(baseTimestamp - i * 1000), // Stagger timestamps
        updatedAt: null,
        // For images, you might want to add placeholder URLs
        // images: [faker.image.urlLoremFlickr({ category: 'product' }]
      },
    });
  }

  return products;
};

// const seedProducts = async () => {
//   try {
//     const products = generateMockProducts();

//     for (const product of products) {
//       const productRef = doc(db, 'products', product.id);
//       await setDoc(productRef, product.data);
//       console.log(`Uploaded product: ${product.id}`);
//     }

//     console.log(`Successfully uploaded ${products.length} products!`);
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding products:', error);
//     process.exit(1);
//   }
// };

// seedProducts();

// script for categories

// const categories = [
//   {
//     name: 'Electronics',
//     image:
//       'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'Smartwatches'],
//   },
//   {
//     name: 'Clothing',
//     image:
//       'https://images.pexels.com/photos/8306370/pexels-photo-8306370.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Men', 'Women', 'Kids', 'Winter Wear', 'Sportswear'],
//   },
//   {
//     name: 'Home Appliances',
//     image:
//       'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Kitchen Appliances', 'Laundry', 'Cooling & Heating', 'Vacuum Cleaners'],
//   },
//   {
//     name: 'Foot Wear',
//     image:
//       'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Casual Shoes', 'Formal Shoes', 'Sneakers', 'Sandals', 'Slippers'],
//   },
//   {
//     name: 'Jewelry',
//     image:
//       'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches'],
//   },
//   {
//     name: 'Hair Accessories',
//     image:
//       'https://images.pexels.com/photos/30988728/pexels-photo-30988728/free-photo-of-elegant-flat-lay-of-beauty-accessories-on-magazine.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Hair Clips', 'Hair Bands', 'Wigs', 'Hair Extensions', 'Hair Care'],
//   },
//   {
//     name: 'Body Care',
//     image:
//       'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Lotions', 'Scrubs', 'Body Wash', 'Perfumes', 'Deodorants'],
//   },
//   {
//     name: 'Snacks',
//     image:
//       'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Chips', 'Biscuits', 'Nuts & Seeds', 'Chocolate', 'Cereal Bars'],
//   },
//   {
//     name: 'Sports & Fitness',
//     image:
//       'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Gym Equipment', 'Yoga Mats', 'Cycling', 'Running Shoes', 'Sportswear'],
//   },
//   {
//     name: 'Toys & Games',
//     image:
//       'https://images.pexels.com/photos/3933021/pexels-photo-3933021.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Educational Toys', 'Board Games', 'Action Figures', 'Dolls', 'Puzzles'],
//   },
//   {
//     name: 'Books & Stationery',
//     image:
//       'https://images.pexels.com/photos/5022971/pexels-photo-5022971.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Fiction', 'Non-Fiction', 'Comics', 'School Supplies', 'Office Supplies'],
//   },
//   {
//     name: 'Beauty & Makeup',
//     image:
//       'https://images.pexels.com/photos/3892677/pexels-photo-3892677.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Lipsticks', 'Foundations', 'Mascara', 'Nail Polish', 'Makeup Brushes'],
//   },
//   {
//     name: 'Pet Supplies',
//     image:
//       'https://images.pexels.com/photos/6870752/pexels-photo-6870752.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Dog Food', 'Cat Food', 'Pet Toys', 'Pet Grooming', 'Pet Beds'],
//   },
//   {
//     name: 'Automotive',
//     image:
//       'https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: [
//       'Car Accessories',
//       'Motorcycle Gear',
//       'Tires & Wheels',
//       'Car Cleaning',
//       'Car Audio',
//     ],
//   },
//   {
//     name: 'Groceries',
//     image:
//       'https://images.pexels.com/photos/3952049/pexels-photo-3952049.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Vegetables', 'Fruits', 'Dairy Products', 'Bakery', 'Beverages'],
//   },
//   {
//     name: 'Furniture',
//     image:
//       'https://images.pexels.com/photos/6489086/pexels-photo-6489086.jpeg?auto=compress&cs=tinysrgb&w=400',
//     subcategories: ['Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Storage'],
//   },
// ];
// const uploadCategories = async () => {
//   try {
//     for (const category of categories) {
//       const docRef = await addDoc(collection(db, 'categories'), {
//         name: category.name,
//         image: category.image,
//         subcategories: category.subcategories,
//         createdAt: new Date(), // Timestamp for reference
//       });
//       console.log(`Category "${category.name}" added with ID: ${docRef.id}`);
//       console.log(`Successfully uploaded categories!`);
//       process.exit(0);
//     }
//   } catch (error) {
//     console.error('Error adding categories:', error);
//   }
// };

// uploadCategories();

const fixProductCategoryIds = async () => {
  try {
    // Fetch all categories and map names to IDs
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categoriesMap = {};
    
    categoriesSnapshot.forEach((doc) => {
      categoriesMap[doc.data().name] = doc.id; // Store name → ID mapping
    });

    // Fetch all products
    const productsSnapshot = await getDocs(collection(db, 'products'));

    // Update each product's categoryId to the actual Firebase ID
    const updates = productsSnapshot.docs.map(async (productDoc) => {
      const productData = productDoc.data();
      const categoryId = categoriesMap[productData.categoryId]; // Convert name → ID

      if (categoryId) {
        const productRef = doc(db, 'products', productDoc.id);
        await updateDoc(productRef, { categoryId });
        console.log(`Updated product ${productDoc.id} with categoryId ${categoryId}`);
      }
    });

    await Promise.all(updates);
    console.log('✅ All products updated with correct category IDs!');
  } catch (error) {
    console.error('❌ Error fixing product category IDs:', error);
  }
};

fixProductCategoryIds();


// node seedProducts.js code to run script 