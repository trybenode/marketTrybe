import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

const ADMIN_UID = 'DL3gKN7v6GUUImruQXwoYFspgmm1';
const PRODUCT_COUNT = 35;

const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    if (categoriesSnapshot.empty) {
      throw new Error('No categories found in Firestore.');
    }
    return categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const generateMockProducts = (categories) => {
  const products = [];
  const baseTimestamp = Date.now();

  for (let i = 0; i < PRODUCT_COUNT; i++) {
    const category = faker.helpers.arrayElement(categories);
    products.push({
      name: faker.commerce.productName(),
      subcategory: faker.helpers.arrayElement(category.subcategories),
      categoryId: category.name,
      negotiable: faker.datatype.boolean(),
      description: faker.commerce.productDescription(),
      brand: faker.company.name(),
      condition: faker.helpers.arrayElement(['New', 'Used', 'Refurbished']),
      color: faker.color.human(),
      price: parseFloat(faker.commerce.price(1000, 500000)),
      originalPrice: parseFloat(faker.commerce.price(800, 400000)),
      year: faker.date.between({ from: '2015-01-01', to: '2023-01-01' }).getFullYear(),
      userId: ADMIN_UID,
      createdAt: new Date(baseTimestamp - i * 1000),
      updatedAt: null,
      images: [faker.image.urlLoremFlickr({ category: 'product' })],
    });
  }
  return products;
};

export const seedProducts = async () => {
  try {
    console.log('🔄 Fetching categories...');
    const categories = await fetchCategories();

    console.log(`Found ${categories.length} categories. Generating products...`);
    const products = generateMockProducts(categories);

    const productsCollection = collection(db, 'products');
    for (const product of products) {
      const docRef = await addDoc(productsCollection, product);
      console.log(`Uploaded product with ID: ${docRef.id}`);
    }

    console.log(`Successfully uploaded ${products.length} products!`);
    return true;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};
