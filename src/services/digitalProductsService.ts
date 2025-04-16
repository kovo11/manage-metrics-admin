
// Type definition for Digital Products
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
}

export const fetchFeaturedProducts = async (): Promise<Record<string, Product[]>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const products = {
    "Instagram": [
      {
        id: "insta-1",
        name: "Instagram Premium Account",
        description: "High-quality Instagram account with 10K+ followers and engagement history.",
        price: "$99.99",
        imageUrl: "/placeholder.svg",
        category: "Instagram",
        featured: true
      }
    ],
    "Twitter": [
      {
        id: "twitter-1",
        name: "Twitter Verified Account",
        description: "Established Twitter account with verification and 5K+ followers.",
        price: "$149.99",
        imageUrl: "/placeholder.svg",
        category: "Twitter",
        featured: true
      }
    ],
    "Facebook": [
      {
        id: "fb-1",
        name: "Facebook Page",
        description: "Facebook business page with 15K likes and active audience.",
        price: "$129.99",
        imageUrl: "/placeholder.svg",
        category: "Facebook",
        featured: true
      }
    ]
  };
  
  return products;
};

export const fetchProductDetails = async (id: string): Promise<Product> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock product data
  const product = {
    id,
    name: "Premium Social Media Account",
    description: "High-quality account with verified status and active followers. Perfect for businesses or influencers looking to establish presence quickly.",
    price: "$129.99",
    imageUrl: "/placeholder.svg",
    category: "Instagram",
    featured: true
  };
  
  return product;
};

export const digitalProductsService = {
  fetchFeaturedProducts,
  fetchProductDetails
};
