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
    category: 'Foot wear',
    image:
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Alice Brown', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '5',
    title: 'Gold Chain Necklace',
    price: '200.00',
    category: 'Jewelry',
    image:
      'https://images.pexels.com/photos/2866076/pexels-photo-2866076.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Sarah Lee', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '6',
    title: 'Luxury Perfume Set',
    price: '60.00',
    category: 'Body Care',
    image:
      'https://images.pexels.com/photos/9653241/pexels-photo-9653241.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'David Kim', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '7',
    title: 'Stylish Backpack',
    price: '50.00',
    category: 'Clothing',
    image:
      'https://images.pexels.com/photos/7233159/pexels-photo-7233159.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Sophia Carter', avatar: 'https://via.placeholder.com/50' },
  },
  {
    id: '8',
    title: 'Chocolate Cookies',
    price: '15.00',
    category: 'Snacks',
    image:
      'https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: { name: 'Emma Watson', avatar: 'https://via.placeholder.com/50' },
  },
];

const images = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const messages = [
  {
    id: '1',
    product: {
      name: 'iPhone 12',
      image:
        'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'John Doe',
    lastMessage: 'Hey, is this still available?',
    timestamp: '2:30 PM',
    unread: true,
  },
  {
    id: '2',
    product: {
      name: 'MacBook Pro',
      image:
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Jane Smith',
    lastMessage: 'Can you do a discount?',
    timestamp: '1:15 PM',
    unread: false,
  },
  {
    id: '3',
    product: {
      name: 'Nike Air Force 1',
      image:
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Mike Johnson',
    lastMessage: 'I’ll pick it up tomorrow.',
    timestamp: '12:45 PM',
    unread: true,
  },
  {
    id: '4',
    product: {
      name: 'Samsung Galaxy S21',
      image:
        'https://images.pexels.com/photos/7443663/pexels-photo-7443663.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Sarah Williams',
    lastMessage: 'Is there a warranty?',
    timestamp: '11:30 AM',
    unread: false,
  },
  {
    id: '5',
    product: {
      name: 'PlayStation 5',
      image:
        'https://images.pexels.com/photos/13459940/pexels-photo-13459940.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Daniel Brown',
    lastMessage: 'Can we meet today?',
    timestamp: '9:00 AM',
    unread: true,
  },
  {
    id: '6',
    product: {
      name: 'Canon EOS R6',
      image:
        'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Emily Davis',
    lastMessage: 'What’s the condition?',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: '7',
    product: {
      name: 'Apple Watch Series 7',
      image:
        'https://images.pexels.com/photos/4370370/pexels-photo-4370370.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'James Carter',
    lastMessage: 'I sent the payment.',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: '8',
    product: {
      name: 'Gaming PC',
      image:
        'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Sophia Lee',
    lastMessage: 'Is shipping included?',
    timestamp: '2 days ago',
    unread: true,
  },
  {
    id: '9',
    product: {
      name: 'Electric Scooter',
      image:
        'https://images.pexels.com/photos/11227788/pexels-photo-11227788.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'David Wilson',
    lastMessage: 'Can you share more pictures?',
    timestamp: '3 days ago',
    unread: false,
  },
  {
    id: '10',
    product: {
      name: 'GoPro Hero 9',
      image:
        'https://images.pexels.com/photos/6373476/pexels-photo-6373476.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    user: 'Olivia Martinez',
    lastMessage: 'Is the battery original?',
    timestamp: '1 week ago',
    unread: true,
  },
];
const dummyTradeHistory = [
  {
    id: '1',
    productName: 'Laptop',
    price: 1200,
    productImage:
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Bought',
    tradedWith: 'John Doe',
    date: '2025-03-08',
  },
  {
    id: '2',
    productName: 'Phone',
    price: 800,
    productImage:
      'https://images.pexels.com/photos/7443663/pexels-photo-7443663.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Bought',
    tradedWith: 'Jane Smith',
    date: '2025-03-05',
  },
  {
    id: '3',
    productName: 'Headphones',
    price: 200,
    productImage:
      'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Sold',
    tradedWith: 'Alice Johnson',
    date: '2025-03-10',
  },
  {
    id: '4',
    productName: 'Smartwatch',
    price: 300,
    productImage:
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Sold',
    tradedWith: 'Bob Brown',
    date: '2025-03-12',
  },
];
export { categories, listings, images, messages, dummyTradeHistory };
