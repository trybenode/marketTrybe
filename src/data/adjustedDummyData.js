const categories = [
  {
    categoryId: 'category1',
    name: 'Electronics',
    description: 'Phones, laptops, and other electronic gadgets.',
    icon: 'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date(),
    subcategories: ['Phones', 'Laptops', 'Accessories'],
  },
  {
    categoryId: 'category2',
    name: 'Clothing',
    description: 'Men and women wears.',
    icon: 'https://images.pexels.com/photos/8306370/pexels-photo-8306370.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date(),
    subcategories: ['Men', 'Women', 'Kids'],
  },
  {
    categoryId: 'category3',
    name: 'Jewelry',
    description: 'Rings, necklaces, bracelets, and more.',
    icon: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date(),
    subcategories: ['Rings', 'Chains', 'Earrings'],
  },
];

const users = [
  {
    userId: 'user1',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
    profilePicture: '',
    address: '123 Market Street, Cityville',
    locationType: 'hostelite',
    createdAt: new Date(),
    isVerified: true,
    isBanned: false,
    role: 'user',
    favourites: ['listing1', 'listing2'],
    purchaseHistory: [],
  },
  {
    userId: 'user2',
    fullName: 'Jane Smith',
    email: 'janesmith@example.com',
    phoneNumber: '+0987654321',
    profilePicture: '',
    address: '456 Commerce Blvd, Townsville',
    locationType: 'non-hostelite',
    createdAt: new Date(),
    isVerified: true,
    isBanned: false,
    role: 'user',
    favourites: [],
    purchaseHistory: [],
  },
];

const listings = [
  {
    listingId: 'listing1',
    sellerId: 'user1',
    listingName: 'Wireless Headphones',
    listingDescription: 'High-quality wireless headphones with noise cancellation.',
    price: 120.0,
    categoryId: 'category1',
    images: [
      'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
    location: 'Cityville',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    model: 2023,
    type: 1,
    color: 'Black',
    condition: 'New',
  },
  {
    listingId: 'listing2',
    sellerId: 'user2',
    listingName: 'Gold Chain Necklace',
    listingDescription: 'Beautiful 18k gold chain necklace.',
    price: 200.0,
    categoryId: 'category3',
    images: [
      'https://images.pexels.com/photos/2866076/pexels-photo-2866076.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
    location: 'Townsville',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    model: 2022,
    color: 'Gold',
    condition: 'New',
  },
];

const conversations = [
  {
    conversationId: 'conv1',
    participants: ['user1', 'user2'],
    lastMessage: {
      senderId: 'user1',
      text: 'Is the necklace available?',
      timestamp: new Date(),
    },
    listingId: 'listing2',
    messages: [
      {
        messageId: 'msg1',
        senderId: 'user1',
        receiverId: 'user2',
        text: 'Is the necklace available?',
        timestamp: new Date(),
      },
      {
        messageId: 'msg2',
        senderId: 'user2',
        receiverId: 'user1',
        text: 'Yes, still available!',
        timestamp: new Date(),
      },
    ],
  },
];

const reports = [
  {
    reportId: 'report1',
    reporterId: 'user1',
    reportedUserId: 'user2',
    reportedListingId: 'listing2',
    reason: 'Fake product',
    description: 'Looks like a fake gold chain.',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { categories, users, listings, conversations, reports };
