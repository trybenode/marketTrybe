//dummy data to be replaced
const categories = [
  {
    id: '1',
    name: 'Electronics',
    image:
      'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Clothing',
    image:
      'https://images.pexels.com/photos/8306370/pexels-photo-8306370.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Home Appliances',
    image:
      'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Foot Wear',
    image:
      'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '5',
    name: 'Jewelry',
    image:
      'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '6',
    name: 'Hair Accessories',
    image:
      'https://images.pexels.com/photos/30988728/pexels-photo-30988728/free-photo-of-elegant-flat-lay-of-beauty-accessories-on-magazine.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '7',
    name: 'Body Care',
    image:
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '8',
    name: 'Snacks',
    image:
      'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const listings = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: '120.00',
    category: 'Electronics',
    image:
      'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'John Doe', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '2',
    title: 'Men’s Leather Jacket',
    price: '85.00',
    category: 'Clothing',
    image:
      'https://images.pexels.com/photos/6626884/pexels-photo-6626884.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Jane Doe', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '3',
    title: 'Smartwatch',
    price: '150.00',
    category: 'Electronics',
    image:
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Mike Smith', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '4',
    title: 'Nike Running Shoes',
    price: '95.00',
    category: 'Footwear',
    image:
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Alice Brown', avatar: 'https://via.placeholder.com/50' },
  },
];

const images = [
  { id: 1, url: 'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, url: 'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, url: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400' },
];
export { categories, listings, images};
