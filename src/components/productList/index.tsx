import { FC, useState } from "react";
import Product from "../product";
import { IProduct } from "../../types/product";

import styles from "./styles.module.css";

interface ProductListProps {
  products: IProduct[];
  handleDelete: (id: string) => void;
  onEdit: (product: IProduct) => void;
}

const ProductList: FC<ProductListProps> = ({
  products,
  handleDelete,
  onEdit,
}) => {
  const [sortOption, setSortOption] = useState("alphabetical");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "count") {
      return b.count - a.count;
    }
    return 0;
  });

  return (
    <div className={styles.productListContainer}>
      <h1 className={styles.title}>Product List</h1>
      <select
        className={styles.sortSelect}
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
      >
        <option value="alphabetical">Sort by Name</option>
        <option value="count">Sort by Count</option>
      </select>
      <div className={styles.productGrid}>
        {sortedProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <Product
              product={product}
              isDisplayAllDetails={false}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
