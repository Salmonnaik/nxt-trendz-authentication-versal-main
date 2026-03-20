import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import Header from '../Header'
import './index.css'

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const CategoryProducts = () => {
  const {categoryId} = useParams()
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeOptionId, setActiveOptionId] = useState(
    sortbyOptions[0].optionId,
  )
  const [categoryInfo, setCategoryInfo] = useState({})

  const getCategoryInfo = useCallback(() => {
    const categories = {
      men: {
        name: 'Men',
        description: "Discover latest trends in men's fashion",
        imageUrl:
          'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=1200&h=400&fit=crop',
      },
      women: {
        name: 'Women',
        description: 'Explore our exclusive women collection',
        imageUrl:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop',
      },
      kids: {
        name: 'Kids',
        description: 'Fun and comfortable clothes for kids',
        imageUrl:
          'https://images.unsplash.com/photo-1515488042364-ee5c0c79b7d2?w=1200&h=400&fit=crop',
      },
      home: {
        name: 'Home & Living',
        description: 'Transform your home with our decor collection',
        imageUrl:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop',
      },
      electronics: {
        name: 'Electronics',
        description: 'Latest gadgets and electronics',
        imageUrl:
          'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop',
      },
    }
    setCategoryInfo(
      categories[categoryId] || {
        name: 'Products',
        description: 'Browse our products',
      },
    )
  }, [categoryId])

  const sortProducts = useCallback((products, sortBy) => {
    const sortedList = [...products]
    switch (sortBy) {
      case 'PRICE_HIGH':
        return sortedList.sort((a, b) => b.price - a.price)
      case 'PRICE_LOW':
        return sortedList.sort((a, b) => a.price - b.price)
      default:
        return sortedList
    }
  }, [])

  const getProducts = useCallback(async () => {
    setIsLoading(true)

    const mockProducts = {
      men: [
        {
          id: 'men1',
          title: 'Men Casual Shirt',
          brand: 'Allen Solly',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'men2',
          title: 'Men Jeans',
          brand: 'Levis',
          price: 2500,
          imageUrl:
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'men3',
          title: 'Men Sports Shoes',
          brand: 'Nike',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'men4',
          title: 'Men Watch',
          brand: 'Titan',
          price: 4500,
          imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'men5',
          title: 'Men T-Shirt Pack',
          brand: 'U.S. Polo',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'men6',
          title: 'Men Formal Shirt',
          brand: 'Van Heusen',
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'men7',
          title: 'Men Shorts',
          brand: 'Puma',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'men8',
          title: 'Men Belt',
          brand: 'Louis Philippe',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1544968123-4a308531c5b9?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'men9',
          title: 'Men Hoodie',
          brand: 'Adidas',
          price: 2800,
          imageUrl:
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'men10',
          title: 'Men Sunglasses',
          brand: 'Ray-Ban',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'men11',
          title: 'Men Wallet',
          brand: 'Tommy Hilfiger',
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'men12',
          title: 'Men Backpack',
          brand: 'Wildcraft',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'men13',
          title: 'Men Tie',
          brand: 'Park Avenue',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'men14',
          title: 'Men Socks Pack',
          brand: 'Jockey',
          price: 400,
          imageUrl:
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'men15',
          title: 'Men Cap',
          brand: 'New Era',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'men16',
          title: 'Men Formal Pants',
          brand: 'Blackberrys',
          price: 2400,
          imageUrl:
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'men17',
          title: 'Men Track Suit',
          brand: 'Reebok',
          price: 3200,
          imageUrl:
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'men18',
          title: 'Men Blazer',
          brand: 'Arrow',
          price: 4500,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'men19',
          title: 'Men Loafers',
          brand: 'Woodland',
          price: 2800,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'men20',
          title: 'Men Gym T-Shirt',
          brand: 'Gymshark',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'men21',
          title: 'Men Boxers Pack',
          brand: 'Calvin Klein',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'men22',
          title: 'Men Winter Jacket',
          brand: 'United Colors of Benetton',
          price: 4200,
          imageUrl:
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
          rating: 4.6,
        },
      ],
      women: [
        {
          id: 'women1',
          title: 'Women Ethnic Wear',
          brand: 'Biba',
          price: 2500,
          imageUrl:
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'women2',
          title: 'Women Handbag',
          brand: 'Lavie',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'women3',
          title: 'Women Sandals',
          brand: 'Bata',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'women4',
          title: 'Women Watch',
          brand: 'Fossil',
          price: 5500,
          imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'women5',
          title: 'Women Kurti',
          brand: 'FabIndia',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'women6',
          title: 'Women Jeans',
          brand: 'Wrangler',
          price: 2800,
          imageUrl:
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'women7',
          title: 'Women Earrings',
          brand: 'Tanishq',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1599643448532-58a2a517b9c5?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'women8',
          title: 'Women Sunglasses',
          brand: 'Ray-Ban',
          price: 4200,
          imageUrl:
            'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'women9',
          title: 'Women Dress',
          brand: 'Zara',
          price: 3200,
          imageUrl:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'women10',
          title: 'Women Heels',
          brand: 'Aldo',
          price: 2500,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'women11',
          title: 'Women Makeup Kit',
          brand: 'Lakme',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1596462502278-27d6355445f3?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'women12',
          title: 'Women Purse',
          brand: 'Hidesign',
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'women13',
          title: 'Women Top',
          brand: 'Forever New',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'women14',
          title: 'Women Necklace',
          brand: 'Swarovski',
          price: 4500,
          imageUrl:
            'https://images.unsplash.com/photo-1599643448532-58a2a517b9c5?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'women15',
          title: 'Women Scarf',
          brand: 'Vera Moda',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'women16',
          title: 'Women Leggings',
          brand: 'Libas',
          price: 900,
          imageUrl:
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'women17',
          title: 'Women Bracelet',
          brand: 'Pandora',
          price: 2800,
          imageUrl:
            'https://images.unsplash.com/photo-1599643448532-58a2a517b9c5?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'women18',
          title: 'Women Skirt',
          brand: 'Mango',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'women19',
          title: 'Women Perfume',
          brand: 'Calvin Klein',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'women20',
          title: 'Women Hair Clips',
          brand: "Claire's",
          price: 500,
          imageUrl:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'women21',
          title: 'Women Night Suit',
          brand: 'Nykaa',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'women22',
          title: 'Women Yoga Pants',
          brand: 'Nike',
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
          rating: 4.5,
        },
      ],
      kids: [
        {
          id: 'kids1',
          title: 'Kids T-Shirt',
          brand: 'Gini & Jony',
          price: 500,
          imageUrl:
            'https://tse1.mm.bing.net/th/id/OIP.LCrNmGy3V4E4Yyu_EfXSLQHaFl?pid=Api&P=0&h=180',
          rating: 4.3,
        },
        {
          id: 'kids2',
          title: 'Kids Toys',
          brand: 'Funskool',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'kids3',
          title: 'Kids School Bag',
          brand: 'Skybags',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'kids4',
          title: 'Kids Shorts Set',
          brand: 'United Colors of Benetton',
          price: 900,
          imageUrl:
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'kids5',
          title: 'Kids Party Wear',
          brand: 'Little Kangaroos',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'kids6',
          title: 'Kids Sports Shoes',
          brand: 'Puma',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'kids7',
          title: 'Kids Summer Dress',
          brand: 'Mothercare',
          price: 1100,
          imageUrl:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'kids8',
          title: 'Kids Winter Jacket',
          brand: "Carter's",
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'kids9',
          title: 'Kids Water Bottle',
          brand: 'Milton',
          price: 400,
          imageUrl:
            'https://images.unsplash.com/photo-1549497538-59295c7d5fd4?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'kids10',
          title: 'Kids Lunch Box',
          brand: 'Tupperware',
          price: 600,
          imageUrl:
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'kids11',
          title: 'Kids Cap',
          brand: 'Disney',
          price: 350,
          imageUrl:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'kids12',
          title: 'Kids Slippers',
          brand: 'Crocs',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'kids13',
          title: 'Kids Story Books',
          brand: 'Amar Chitra Katha',
          price: 300,
          imageUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'kids14',
          title: 'Kids Pencil Box',
          brand: 'Classmate',
          price: 250,
          imageUrl:
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'kids15',
          title: 'Kids Swimming Goggles',
          brand: 'Speedo',
          price: 450,
          imageUrl:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'kids16',
          title: 'Kids Umbrella',
          brand: 'Poppins',
          price: 550,
          imageUrl:
            'https://images.unsplash.com/photo-1515488042364-ee5c0c79b7d2?w=300&h=400&fit=crop',
          rating: 4.2,
        },
      ],
      home: [
        {
          id: 'home1',
          title: 'Home Decor Lamp',
          brand: 'Philips',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'home2',
          title: 'Kitchen Cookware Set',
          brand: 'Prestige',
          price: 3000,
          imageUrl:
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'home3',
          title: 'Bed Sheets Set',
          brand: 'Bombay Dyeing',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'home4',
          title: 'Wall Clock',
          brand: 'Ajanta',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'home5',
          title: 'Cushion Covers',
          brand: 'Home Centre',
          price: 600,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'home6',
          title: 'Dinner Set',
          brand: 'La Opala',
          price: 2200,
          imageUrl:
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'home7',
          title: 'Wall Painting',
          brand: 'Artisan',
          price: 1800,
          imageUrl:
            'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'home8',
          title: 'Plant Pot',
          brand: 'Ugaoo',
          price: 450,
          imageUrl:
            'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'home9',
          title: 'Bath Towels Set',
          brand: 'Spaces',
          price: 900,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'home10',
          title: 'Coffee Mug Set',
          brand: 'Milton',
          price: 750,
          imageUrl:
            'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'home11',
          title: 'Photo Frame',
          brand: 'Archies',
          price: 350,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'home12',
          title: 'Table Lamp',
          brand: 'Havells',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'home13',
          title: 'Storage Box',
          brand: 'Nilkamal',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'home14',
          title: 'Air Freshener',
          brand: 'Godrej Aer',
          price: 300,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.0,
        },
        {
          id: 'home15',
          title: 'Dustbin',
          brand: 'Brabantia',
          price: 1100,
          imageUrl:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
          rating: 4.2,
        },
      ],
      electronics: [
        {
          id: 'elec1',
          title: 'Smartphone',
          brand: 'Samsung',
          price: 25000,
          imageUrl:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'elec2',
          title: 'Laptop',
          brand: 'HP',
          price: 45000,
          imageUrl:
            'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'elec3',
          title: 'Headphones',
          brand: 'Sony',
          price: 3000,
          imageUrl:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'elec4',
          title: 'Smart Watch',
          brand: 'Apple',
          price: 35000,
          imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'elec5',
          title: 'Tablet',
          brand: 'iPad',
          price: 40000,
          imageUrl:
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'elec6',
          title: 'Bluetooth Speaker',
          brand: 'JBL',
          price: 5000,
          imageUrl:
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'elec7',
          title: 'Power Bank',
          brand: 'Mi',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1593642632821-8f785ba67e45?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'elec8',
          title: 'USB Cable',
          brand: 'Anker',
          price: 500,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'elec9',
          title: 'Wireless Mouse',
          brand: 'Logitech',
          price: 1500,
          imageUrl:
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=400&fit=crop',
          rating: 4.5,
        },
        {
          id: 'elec10',
          title: 'Keyboard',
          brand: 'Corsair',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'elec11',
          title: 'Webcam',
          brand: 'Logitech',
          price: 4500,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'elec12',
          title: 'Monitor',
          brand: 'LG',
          price: 15000,
          imageUrl:
            'https://images.unsplash.com/photo-1527443224154-c4a59439b2a7?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'elec13',
          title: 'Printer',
          brand: 'Canon',
          price: 8000,
          imageUrl:
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'elec14',
          title: 'Router',
          brand: 'TP-Link',
          price: 2000,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'elec15',
          title: 'Charger',
          brand: 'Belkin',
          price: 800,
          imageUrl:
            'https://images.unsplash.com/photo-1593642632821-8f785ba67e45?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'elec16',
          title: 'Earphones',
          brand: 'Boat',
          price: 1200,
          imageUrl:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
          rating: 4.3,
        },
        {
          id: 'elec17',
          title: 'Microphone',
          brand: 'Blue Yeti',
          price: 6500,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.6,
        },
        {
          id: 'elec18',
          title: 'External Hard Drive',
          brand: 'Seagate',
          price: 4500,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
          rating: 4.4,
        },
        {
          id: 'elec19',
          title: 'USB Hub',
          brand: 'Amazon Basics',
          price: 600,
          imageUrl:
            'https://images.unsplash.com/photo-1593642632821-8f785ba67e45?w=300&h=400&fit=crop',
          rating: 4.2,
        },
        {
          id: 'elec20',
          title: 'HDMI Cable',
          brand: 'Mediabridge',
          price: 400,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
          rating: 4.1,
        },
        {
          id: 'elec21',
          title: 'Smart TV',
          brand: 'Sony',
          price: 35000,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'elec22',
          title: 'Gaming Console',
          brand: 'PlayStation',
          price: 40000,
          imageUrl:
            'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=400&fit=crop',
          rating: 4.9,
        },
        {
          id: 'elec23',
          title: 'Drone',
          brand: 'DJI',
          price: 25000,
          imageUrl:
            'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=400&fit=crop',
          rating: 4.7,
        },
        {
          id: 'elec24',
          title: 'Camera',
          brand: 'Canon',
          price: 30000,
          imageUrl:
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
          rating: 4.8,
        },
        {
          id: 'elec25',
          title: 'Tripod',
          brand: 'Manfrotto',
          price: 3500,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
          rating: 4.5,
        },
      ],
    }

    // Simulate API call delay
    setTimeout(() => {
      const products = mockProducts[categoryId] || []
      const sortedProducts = sortProducts(products, activeOptionId)
      setProductsList(sortedProducts)
      setIsLoading(false)
    }, 1000)
  }, [categoryId, activeOptionId, sortProducts])

  useEffect(() => {
    getCategoryInfo()
    getProducts()
  }, [getCategoryInfo, getProducts])

  const updateActiveOptionId = newOptionId => {
    setActiveOptionId(newOptionId)
    const sortedProducts = sortProducts(productsList, newOptionId)
    setProductsList(sortedProducts)
  }

  const renderProductsList = () => (
    <>
      <ProductsHeader
        activeOptionId={activeOptionId}
        sortbyOptions={sortbyOptions}
        updateActiveOptionId={updateActiveOptionId}
      />
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  )

  const renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  return (
    <>
      <Header />
      <div className="category-container">
        <div className="category-hero">
          <img
            src={categoryInfo.imageUrl}
            alt={categoryInfo.name}
            className="category-hero-image"
          />
          <div className="category-hero-content">
            <h1 className="category-title">{categoryInfo.name}</h1>
            <p className="category-description">{categoryInfo.description}</p>
          </div>
        </div>

        <div className="category-products-section">
          {isLoading ? renderLoader() : renderProductsList()}
        </div>
      </div>
    </>
  )
}

export default CategoryProducts
