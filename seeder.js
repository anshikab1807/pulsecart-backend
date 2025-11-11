// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "./models/Product.js";
import user from "./models/user.js";
import Seller from "./models/Seller.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusbazar";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// Helper function to generate random numbers
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Categories and products (lowercase categories)
const categories = {
fashion: [
    { name: "Men's Casual T-Shirt", subcategory: "men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { name: "Women's Summer Dress", subcategory: "women", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500" },
    { name: "Leather Jacket", subcategory: "men", image: "https://images.unsplash.com/photo-1586463946273-8ccbf60c0b38?w=500" },
    { name: "Sneakers", subcategory: "unisex", image: "https://images.unsplash.com/photo-1580709503690-cf49fa5c947c?w=500" },
    { name: "Denim Skirt", subcategory: "women", image: "https://images.unsplash.com/photo-1555529669-6a0d72df5c23?w=500" },
    { name: "Hoodie", subcategory: "unisex", image: "https://images.unsplash.com/photo-1588204947195-df88b146c053?w=500" },
    { name: "Casual Shorts", subcategory: "men", image: "https://images.unsplash.com/photo-1593032195466-d6b92b1c9d3e?w=500" },
    { name: "Blouse", subcategory: "women", image: "https://images.unsplash.com/photo-1581089781785-d51e66eeaa01?w=500" },
    { name: "Formal Shirt", subcategory: "men", image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=500" },
    { name: "Sports Cap", subcategory: "unisex", image: "https://images.unsplash.com/photo-1602810319284-0018f4e85b70?w=500" },
    { name: "Wristwatch", subcategory: "unisex", image: "https://images.unsplash.com/photo-1572887260481-c414a85efbfc?w=500" },
    { name: "Evening Gown", subcategory: "women", image: "https://images.unsplash.com/photo-1599942620400-5d21cbf5e5f1?w=500" },
    { name: "Denim Jacket", subcategory: "men", image: "https://images.unsplash.com/photo-1593032532322-3d03c885b1c4?w=500" },
    { name: "Yoga Pants", subcategory: "women", image: "https://images.unsplash.com/photo-1600180758895-52a6f80c1f50?w=500" },
    { name: "Running Shoes", subcategory: "unisex", image: "https://images.unsplash.com/photo-1613927424686-1dcbe2144d15?w=500" },
    { name: "Formal Trousers", subcategory: "men", image: "https://images.unsplash.com/photo-1618354694806-bcf63c1a0f72?w=500" }
  ],
  electronics: [
    { name: "Wireless Bluetooth Headphones", subcategory: "audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { name: "Smart Watch", subcategory: "wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { name: "Wireless Mouse", subcategory: "accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" },
    { name: "Keyboard", subcategory: "accessories", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { name: "Laptop", subcategory: "computers", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { name: "Portable Charger", subcategory: "accessories", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500" },
    { name: "Smartphone", subcategory: "mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { name: "Tablet", subcategory: "computers", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { name: "Smart TV", subcategory: "television", image: "https://images.unsplash.com/photo-1587825140708-2f4c89f8e6c1?w=500" },
    { name: "Digital Camera", subcategory: "photography", image: "https://images.unsplash.com/photo-1519183071298-a2962f4a53c2?w=500" },
    { name: "VR Headset", subcategory: "gaming", image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500" },
    { name: "Projector", subcategory: "home entertainment", image: "https://images.unsplash.com/photo-1572374036558-b2f042f34be8?w=500" },
    { name: "External Hard Drive", subcategory: "storage", image: "https://images.unsplash.com/photo-1587825140708-2f4c89f8e6c1?w=500" },
    { name: "Earbuds", subcategory: "audio", image: "https://images.unsplash.com/photo-1555617117-08f29d7e2a90?w=500" },
    { name: "Gaming Console", subcategory: "gaming", image: "https://images.unsplash.com/photo-1606813909225-d9a0aa2a1f68?w=500" },
    { name: "Drone", subcategory: "gadgets", image: "https://images.unsplash.com/photo-1581092580497-0461f6b0be6f?w=500" }
  ],
  furniture: [
    { name: "Wooden Dining Table", subcategory: "dining", image: "https://images.unsplash.com/photo-1598300051923-9c4f6ed187f2?w=500" },
    { name: "Office Chair", subcategory: "office", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500" },
    { name: "Sofa Set", subcategory: "living room", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b4c?w=500" },
    { name: "Queen Bed", subcategory: "bedroom", image: "https://images.unsplash.com/photo-1598300051933-9c4f6ed187f3?w=500" },
    { name: "Wardrobe", subcategory: "bedroom", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b5d?w=500" },
    { name: "Bookshelf", subcategory: "living room", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b6f?w=500" },
    { name: "Coffee Table", subcategory: "living room", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b7f?w=500" },
    { name: "TV Stand", subcategory: "living room", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b8f?w=500" },
    { name: "Nightstand", subcategory: "bedroom", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0b9f?w=500" },
    { name: "Recliner Chair", subcategory: "living room", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0baf?w=500" },
    { name: "Dining Chair Set", subcategory: "dining", image: "https://images.unsplash.com/photo-1580584125056-2b39ec2f0bbf?w=500" }
  ],
  appliances: [
    { name: "Air Fryer", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1585237672455-6c0b8dc155a8?w=500" },
    { name: "Vacuum Cleaner", subcategory: "cleaning", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500" },
    { name: "Microwave Oven", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500" },
    { name: "Refrigerator", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1582582494702-7f165f1aa0c1?w=500" },
    { name: "Washing Machine", subcategory: "laundry", image: "https://images.unsplash.com/photo-1590250359501-2e8f99fc1c9d?w=500" },
    { name: "Blender", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500" },
    { name: "Coffee Maker", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500" },
    { name: "Toaster", subcategory: "kitchen", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500" },
    { name: "Iron", subcategory: "laundry", image: "https://images.unsplash.com/photo-1598430256738-6ff3349447f8?w=500" },
    { name: "Hair Dryer", subcategory: "personal care", image: "https://images.unsplash.com/photo-1587049352851-0911d6f55f78?w=500" }
  ],
   toys: [
    { name: "Lego Building Set", subcategory: "building", image: "https://images.unsplash.com/photo-1617196038707-04d6ab2b04a6?w=500" },
    { name: "Action Figure", subcategory: "figures", image: "https://images.unsplash.com/photo-1584448948236-88a5d2de7f39?w=500" },
    { name: "Remote Control Car", subcategory: "vehicles", image: "https://images.unsplash.com/photo-1574860646386-33829523d2e6?w=500" },
    { name: "Puzzle Game", subcategory: "educational", image: "https://images.unsplash.com/photo-1584270354949-0d3f5d5c7fa3?w=500" },
    { name: "Doll Set", subcategory: "dolls", image: "https://images.unsplash.com/photo-1590422747087-87bc4cb0e5fb?w=500" },
    { name: "Board Game", subcategory: "games", image: "https://images.unsplash.com/photo-1592754075443-1ff0ff0d6f7d?w=500" },
    { name: "Stuffed Animal", subcategory: "soft toys", image: "https://images.unsplash.com/photo-1595433562696-1b0d65f4f79c?w=500" },
    { name: "Train Set", subcategory: "vehicles", image: "https://images.unsplash.com/photo-1617196038699-ef6e4f0f8e92?w=500" },
    { name: "Toy Drum Set", subcategory: "musical", image: "https://images.unsplash.com/photo-1617196038722-b5f42c4e4f34?w=500" },
    { name: "Building Blocks", subcategory: "building", image: "https://images.unsplash.com/photo-1617196038710-5c1e1c8f7a90?w=500" }
  ],

  cosmetics: [
    { name: "Lipstick Set", subcategory: "makeup", image: "https://images.unsplash.com/photo-1600180758895-52a6f80c1f50?w=500" },
    { name: "Foundation Cream", subcategory: "makeup", image: "https://images.unsplash.com/photo-1618354694806-bcf63c1a0f72?w=500" },
    { name: "Moisturizer", subcategory: "skincare", image: "https://images.unsplash.com/photo-1613927424686-1dcbe2144d15?w=500" },
    { name: "Shampoo", subcategory: "haircare", image: "https://images.unsplash.com/photo-1581092580497-0461f6b0be6f?w=500" },
    { name: "Perfume", subcategory: "fragrance", image: "https://images.unsplash.com/photo-1606813909225-d9a0aa2a1f68?w=500" },
    { name: "Eyeliner", subcategory: "makeup", image: "https://images.unsplash.com/photo-1617196038725-41e8f5e2c24f?w=500" },
    { name: "Nail Polish Set", subcategory: "makeup", image: "https://images.unsplash.com/photo-1617196038720-9a9b8b2d1f8c?w=500" },
    { name: "Face Wash", subcategory: "skincare", image: "https://images.unsplash.com/photo-1617196038715-7c4c4b9e9f92?w=500" },
    { name: "Conditioner", subcategory: "haircare", image: "https://images.unsplash.com/photo-1617196038718-b5f1b1f6a23d?w=500" },
    { name: "Face Serum", subcategory: "skincare", image: "https://images.unsplash.com/photo-1617196038702-c4d2f0f8e1a3?w=500" }
  ],

  kilos: [
    { name: "Rice 5kg Pack", subcategory: "food grains", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500" },
    { name: "Wheat Flour 5kg", subcategory: "food grains", image: "https://images.unsplash.com/photo-1598514981693-9e5d5e3a1c4f?w=500" },
    { name: "Sugar 2kg", subcategory: "sweeteners", image: "https://images.unsplash.com/photo-1588173820977-27e08d8a1b3f?w=500" },
    { name: "Salt 1kg", subcategory: "spices", image: "https://images.unsplash.com/photo-1588173820976-3d5f2e8b1a3f?w=500" },
    { name: "Cooking Oil 5L", subcategory: "oils", image: "https://images.unsplash.com/photo-1588173820974-2c5b2e4b1a1c?w=500" },
    { name: "Lentils 2kg", subcategory: "pulses", image: "https://images.unsplash.com/photo-1588173820975-1d1b1b2a0f2e?w=500" }
  ],

  sports: [
    { name: "Football", subcategory: "ball games", image: "https://images.unsplash.com/photo-1581369800352-2f2c4b2b1f3c?w=500" },
    { name: "Cricket Bat", subcategory: "batting", image: "https://images.unsplash.com/photo-1581369800351-2c3b4b1e0f4d?w=500" },
    { name: "Tennis Racket", subcategory: "racquet sports", image: "https://images.unsplash.com/photo-1581369800353-2d3c4b2f1a2e?w=500" },
    { name: "Basketball", subcategory: "ball games", image: "https://images.unsplash.com/photo-1581369800354-2a3c4b2f1b3d?w=500" },
    { name: "Yoga Mat", subcategory: "fitness", image: "https://images.unsplash.com/photo-1581369800355-2b3d4b2f1c4f?w=500" },
    { name: "Dumbbell Set", subcategory: "fitness", image: "https://images.unsplash.com/photo-1581369800356-2c3e4b2f1d5e?w=500" },
    { name: "Skipping Rope", subcategory: "fitness", image: "https://images.unsplash.com/photo-1581369800357-2d3f4b2f1e6f?w=500" }
  ],

  books: [
    { name: "Novel - Mystery", subcategory: "fiction", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },
    { name: "Science Textbook", subcategory: "education", image: "https://images.unsplash.com/photo-1581092580497-0461f6b0be6f?w=500" },
    { name: "Cookbook", subcategory: "cooking", image: "https://images.unsplash.com/photo-1617196038722-b5f42c4e4f34?w=500" },
    { name: "Biography", subcategory: "non-fiction", image: "https://images.unsplash.com/photo-1581092580495-0461f6b0be6f?w=500" }
  ],

  gaming: [
    { name: "PlayStation 5", subcategory: "console", image: "https://images.unsplash.com/photo-1617196038725-41e8f5e2c24f?w=500" },
    { name: "Xbox Series X", subcategory: "console", image: "https://images.unsplash.com/photo-1617196038720-9a9b8b2d1f8c?w=500" },
    { name: "Gaming Chair", subcategory: "accessory", image: "https://images.unsplash.com/photo-1617196038715-7c4c4b9e9f92?w=500" },
    { name: "Gaming Headset", subcategory: "accessory", image: "https://images.unsplash.com/photo-1617196038718-b5f1b1f6a23d?w=500" }
  ],

  pets: [
    { name: "Dog Food 5kg", subcategory: "food", image: "https://images.unsplash.com/photo-1617196038702-c4d2f0f8e1a3?w=500" },
    { name: "Cat Toy Set", subcategory: "toys", image: "https://images.unsplash.com/photo-1617196038707-04d6ab2b04a6?w=500" },
    { name: "Bird Cage", subcategory: "accessories", image: "https://images.unsplash.com/photo-1584448948236-88a5d2de7f39?w=500" }
  ],

  stationery: [
    { name: "Notebook", subcategory: "writing", image: "https://images.unsplash.com/photo-1617196038722-b5f42c4e4f34?w=500" },
    { name: "Pen Set", subcategory: "writing", image: "https://images.unsplash.com/photo-1617196038725-41e8f5e2c24f?w=500" },
    { name: "Color Pencils", subcategory: "art", image: "https://images.unsplash.com/photo-1617196038720-9a9b8b2d1f8c?w=500" }
  ],

  travel: [
    { name: "Backpack", subcategory: "bags", image: "https://images.unsplash.com/photo-1617196038715-7c4c4b9e9f92?w=500" },
    { name: "Travel Pillow", subcategory: "accessories", image: "https://images.unsplash.com/photo-1617196038718-b5f1b1f6a23d?w=500" },
    { name: "Suitcase", subcategory: "bags", image: "https://images.unsplash.com/photo-1617196038702-c4d2f0f8e1a3?w=500" }
  ],

  music: [
    { name: "Acoustic Guitar", subcategory: "instruments", image: "https://images.unsplash.com/photo-1617196038707-04d6ab2b04a6?w=500" },
    { name: "Keyboard", subcategory: "instruments", image: "https://images.unsplash.com/photo-1584448948236-88a5d2de7f39?w=500" },
    { name: "Drum Set", subcategory: "instruments", image: "https://images.unsplash.com/photo-1574860646386-33829523d2e6?w=500" }
  ],

  health: [
    { name: "Vitamin C Tablets", subcategory: "supplements", image: "https://images.unsplash.com/photo-1584270354949-0d3f5d5c7fa3?w=500" },
    { name: "First Aid Kit", subcategory: "medical", image: "https://images.unsplash.com/photo-1590422747087-87bc4cb0e5fb?w=500" },
    { name: "Hand Sanitizer", subcategory: "hygiene", image: "https://images.unsplash.com/photo-1592754075443-1ff0ff0d6f7d?w=500" }
  ],

  gardening: [
    { name: "Gardening Tools Set", subcategory: "tools", image: "https://images.unsplash.com/photo-1595433562696-1b0d65f4f79c?w=500" },
    { name: "Flower Seeds Pack", subcategory: "seeds", image: "https://images.unsplash.com/photo-1617196038699-ef6e4f0f8e92?w=500" },
    { name: "Plant Pots", subcategory: "pots", image: "https://images.unsplash.com/photo-1617196038722-b5f42c4e4f34?w=500" }
  ]
};
// Flatten categories
const sampleProducts = [];
Object.keys(categories).forEach(cat => {
  categories[cat].forEach(prod => {
    sampleProducts.push({
      name: prod.name,
      description: `${prod.name} - high quality ${prod.subcategory} product`,
      price: getRandom(100, 5000),
      category: cat,
      subcategory: prod.subcategory,
      image: prod.image,
      amount: getRandom(10, 100),
      brand: `${cat}Brand`,
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1))
    });
  });
});

// Sample Users
const users = [
  { fullName: "Rahul Kumar", email: "rahul@example.com", phone: "9876543210", password: "rahul123", address: [{ street: "123 MG Road", city: "Bangalore", pincode: "560001", tag: "Home" }] },
  { fullName: "Sneha Sharma", email: "sneha@example.com", phone: "9123456780", password: "sneha123", address: [{ street: "45 Park Street", city: "Mumbai", pincode: "400001", tag: "Work" }] }
];

// Sample Sellers
const sellers = [
  { fullName: "John Doe", username: "john123", email: "john@example.com", phone: "9876543210", password: "password123" },
  { fullName: "Jane Smith", username: "jane_s", email: "jane@example.com", phone: "9123456780", password: "mypassword" }
];

// Seeder Function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Seller.deleteMany({});

    await Product.insertMany(sampleProducts);
    await User.insertMany(users);
    await Seller.insertMany(sellers);

    console.log(`🎉 Database seeded successfully with ${sampleProducts.length} products!`);
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
