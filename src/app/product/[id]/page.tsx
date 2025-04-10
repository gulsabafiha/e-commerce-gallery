import { products } from '../../../data/products';
import ProductPageContent from '../../../components/ProductPageContent';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  return <ProductPageContent params={params} />;
} 