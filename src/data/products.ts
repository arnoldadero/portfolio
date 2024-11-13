import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fish Biscuits',
    description: 'Crunchy, protein-rich fish biscuits made from premium fish meat. Perfect for snacking.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    category: 'Snacks',
    stock: 50
  },
  {
    id: '2',
    name: 'Solar-Dried Omena',
    description: 'Naturally sun-dried Omena fish, preserving all nutrients and flavor. Sustainable and healthy.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1534766438357-2b270dbd1b40?auto=format&fit=crop&q=80&w=800',
    category: 'Dried Fish',
    stock: 30
  },
  {
    id: '3',
    name: 'Deep-Fried Omena',
    description: 'Crispy deep-fried Omena fish, perfect as a protein-rich snack or meal accompaniment.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=800',
    category: 'Fried Fish',
    stock: 40
  },
  {
    id: '4',
    name: 'Deep-Fried Fulu',
    description: 'Traditional deep-fried Fulu fish, crispy and flavorful. A local delicacy.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800',
    category: 'Fried Fish',
    stock: 25
  },
  {
    id: '5',
    name: 'Myco-Protein Fish Feed',
    description: 'High-quality fish feed enriched with myco-protein for optimal fish growth and health.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1620921575116-fb8902865f81?auto=format&fit=crop&q=80&w=800',
    category: 'Fish Feed',
    stock: 100
  }
];