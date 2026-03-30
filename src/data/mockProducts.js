const mockProducts = [
  {
    id: 1,
    title: 'Samsung Galaxy F54 (Ocean Blue) - 8GB RAM, 128GB Storage',
    price: 229.99,
    discountPercentage: 12,
    rating: 4.4,
    brand: 'Samsung',
    category: 'Mobiles',
    // using stable placeholder images to avoid missing-asset 404s
    image: 'https://picsum.photos/seed/samsung_f54/600/600',
    featured: true
  },
  {
    id: 2,
    title: 'boAt Airdopes 141 - True Wireless Earbuds',
    price: 29.99,
    discountPercentage: 20,
    rating: 4.1,
    brand: 'boAt',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/boat_airdopes/600/600',
    featured: false
  },
  {
    id: 3,
    title: 'Apple iPhone 14 Pro (128GB) - Space Black',
    price: 999.99,
    discountPercentage: 8,
    rating: 4.7,
    brand: 'Apple',
    category: 'Mobiles',
    image: 'https://picsum.photos/seed/iphone14pro/600/600',
    featured: true
  },
  {
    id: 4,
    title: 'Levi\'s Men\'s Slim Fit Jeans - Dark Wash',
    price: 49.99,
    discountPercentage: 30,
    rating: 4.2,
    brand: 'Levi\'s',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/levis_jeans/600/600',
    featured: false
  },
  {
    id: 5,
    title: 'Philips 4L Air Fryer - HD9200',
    price: 99.99,
    discountPercentage: 15,
    rating: 4.3,
    brand: 'Philips',
    category: 'Home & Kitchen',
    image: 'https://picsum.photos/seed/philips_airfryer/600/600',
    featured: false
  },
  {
    id: 6,
    title: 'Noise ColorFit Pro 4 Smart Watch',
    price: 59.99,
    discountPercentage: 25,
    rating: 4.0,
    brand: 'Noise',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/noise_watch/600/600',
    featured: true
  }
]

export default mockProducts
