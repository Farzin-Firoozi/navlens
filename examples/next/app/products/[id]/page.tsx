import { products } from "../../data";

import ProductDetails from "../../screens/productDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <ProductDetails product={product} />;
};

export default Page;
