const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, doc } = require('firebase/firestore');
const { faker } = require('@faker-js/faker');

// Configuration
const ADMIN_UID = 'DL3gKN7v6GUUImruQXwoYFspgmm1'; // Replace with actual test admin UID
const PRODUCT_COUNT = 15;

// const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateMockProducts = () => {
  const products = [];
  const baseTimestamp = Date.now();

  // Sample categories that match your app's categories
  const categories = [
    { id: 'electronics', subcategories: ['Mobile Phones', 'Laptops', 'Accessories'] },
    { id: 'fashion', subcategories: ['Clothing', 'Shoes', 'Watches'] },
    { id: 'home', subcategories: ['Furniture', 'Decor', 'Appliances'] }
  ];

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
        year: faker.date.between({ from: '2015-01-01', to: '2023-01-01' }).getFullYear(),
        userId: ADMIN_UID,
        createdAt: new Date(baseTimestamp - (i * 1000)), // Stagger timestamps
        updatedAt: null,
        // For images, you might want to add placeholder URLs
        // images: [faker.image.urlLoremFlickr({ category: 'product' }]
      }
    });
  }
  
  return products;
};

const seedProducts = async () => {
  try {
    const products = generateMockProducts();
    
    for (const product of products) {
      const productRef = doc(db, 'products', product.id);
      await setDoc(productRef, product.data);
      console.log(`Uploaded product: ${product.id}`);
    }
    
    console.log(`Successfully uploaded ${products.length} products!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();