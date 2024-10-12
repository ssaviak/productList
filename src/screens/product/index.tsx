import { useEffect, useState } from "react";
import Product from "../../components/product";
import { IProduct } from "../../types/product";
import ProductModal from "../../components/productModal";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api/client";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/productThunks";

const ProductScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<IProduct | null>(null);

  const handleAddProduct = async (newProduct: IProduct) => {
    dispatch(createProduct(newProduct));
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProduct(id || "1");
      setProduct(product);
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Page</h1>
      <Product isDisplayAllDetails={true} product={product} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        onConfirm={handleAddProduct}
      />
    </div>
  );
};

export default ProductScreen;
