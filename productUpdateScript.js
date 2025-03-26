require('dotenv').config(); // Load environment variables from .env
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { faker } = require('@faker-js/faker');
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const db = getFirestore();

const ADMIN_UID = 'DL3gKN7v6GUUImruQXwoYFspgmm1';
const PRODUCT_COUNT = 35;

// const { initializeApp } = require('firebase/app');

// const { getFirestore, collection, addDoc} = require('firebase/firestore');
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK using environment variables
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix line breaks
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   }),
// });
// const db = admin.firestore(); used to delete product

function normalizeCategory(category) {
  if (!category || typeof category !== 'string') {
    return '';
  }
  return category.toLowerCase().replace(/_/g, ' '); // Converts "home_appliances" to "home appliances"
}
async function updateProductCategories() {
  console.log('🔄 Fetching categories...');

  // Fetch categories from Firestore
  const categoriesSnapshot = await db.collection('categories').get();
  const categoryMapping = {};

  categoriesSnapshot.forEach((doc) => {
    const categoryName = normalizeCategory(doc.data().name); // Normalize category name
    if (categoryName) {
      categoryMapping[categoryName] = doc.id; // Store category name to ID mapping
    }
  });

  console.log('✅ Category mapping:', categoryMapping);

  console.log('🔄 Fetching products...');
  const productsSnapshot = await db.collection('products').get();
  let updatedCount = 0;

  for (const productDoc of productsSnapshot.docs) {
    const product = productDoc.data();

    if (!product.category) {
      console.warn(`⚠️ No category found for product ${productDoc.id}`);
      continue;
    }
    const normalizedProductCategory = normalizeCategory(product.category);

    if (categoryMapping[normalizedProductCategory]) {
      const categoryId = categoryMapping[normalizedProductCategory];

      // Update product's category ID in Firestore
      await db.collection('products').doc(productDoc.id).update({
        categoryId: categoryId,
      });

      updatedCount++;
    } else {
      console.warn(
        `⚠️ No matching category found for product ${productDoc.id} (${product.category})`
      );
    }
  }

  console.log(`✅ ${updatedCount} products updated with category IDs.`);
}

// updateProductCategories().catch(console.error);

async function deleteAllProducts() {
  console.log('🚨 Deleting all products...');

  const productsRef = db.collection('products');
  const productsSnapshot = await productsRef.get();

  if (productsSnapshot.empty) {
    console.log('✅ No products found. Nothing to delete.');
    return;
  }

  const batch = db.batch();
  productsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`✅ Deleted ${productsSnapshot.size} products.`);
}

//   deleteAllProducts().catch(console.error);

const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await db.collection('categories').get();
    if (categoriesSnapshot.empty) {
        throw new Error('No categories found in Firestore.');
      }
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    process.exit(1);
  }
};

const generateMockProducts = (categories) => {
  const products = [];
  const baseTimestamp = Date.now();

  for (let i = 0; i < PRODUCT_COUNT; i++) {
    const category = faker.helpers.arrayElement(categories);
    // const price = parseFloat(faker.commerce.price(1000, 500000));

    products.push({
      name: faker.commerce.productName(),
      subcategory: faker.helpers.arrayElement(category.subcategories),
      categoryId: category.name,
      negotiable: faker.datatype.boolean(),
      description: faker.commerce.productDescription(),
      brand: faker.company.name(),
      condition: faker.helpers.arrayElement(['New', 'Used', 'Refurbished']),
      color: faker.color.human(),
    //   price: price,
    //   originalPrice: price - price * 0.2, // 20% discount
    price: parseFloat(faker.commerce.price(1000, 500000)),
    originalPrice: parseFloat(faker.commerce.price(800, 400000)), // Ensure proper discount logic
      year: faker.date.between({ from: '2015-01-01', to: '2023-01-01' }).getFullYear(),
      userId: ADMIN_UID,
      createdAt: new Date(baseTimestamp - i * 1000), // Stagger timestamps
      updatedAt: null,
      images: [faker.image.urlLoremFlickr({ category: 'product' })], // Ensure actual images are used
    });
  }

  return products;
};

const seedProducts = async () => {
  try {
    console.log('🔄 Fetching categories from firestore...');
    const categories = await fetchCategories();

    // if(categories.length === 0){
    //     console.error('No categories found. Please seed categories first.');
    //     process.exit(1);
    // }
    console.log(`found ${categories.length} categories. generating products...`);
    const products = generateMockProducts(categories);

    for (const product of products) {
      const docRef = await db.collection('products').add(product);
      console.log(`Uploaded product with ID: ${docRef.id}`);
    // const docRef = await addDoc(collection(db, 'products'), product);
    // console.log(`Uploaded product with ID: ${docRef.id}`);
    }

    console.log(`Successfully uploaded ${products.length} products!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
