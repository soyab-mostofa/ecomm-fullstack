import ProductCard from "@/components/product-card";
import { ProductWithIncludes } from "@/components/product-cards";

export default async function ProductList({
  products,
}: {
  products: ProductWithIncludes[];
}) {
  return (
    <>
      <div className="flex flex-wrap space-y-3 items-baseline justify-start gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
