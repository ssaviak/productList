import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/productList";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import ProductModal from "../../components/productModal";
import { IProduct } from "../../types/product";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../redux/productThunks";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    updateProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct: Omit<IProduct, "id">) => {
    if (!selectedProduct) {
      return;
    }

    const newProductWithId: IProduct = {
      ...updatedProduct,
      id: selectedProduct.id,
    };
    dispatch(updateProduct(newProductWithId));
  };

  const handleAddProduct = async (newProduct: IProduct) => {
    dispatch(createProduct(newProduct));
  };

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      {error && (
        <div className={styles.errorText}>
          Something went wrong, please try again later
        </div>
      )}
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>
      <ProductList
        products={products}
        handleDelete={handleDelete}
        onEdit={handleEditClick}
      />
      {loading && <div>Loading...</div>}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onConfirm={selectedProduct ? handleUpdateProduct : handleAddProduct}
      />
    </div>
  );
};

export default Home;
