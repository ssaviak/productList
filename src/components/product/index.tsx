import { FC } from "react";
import { IProduct } from "../../types/product";

import styles from "./styles.module.css";

interface ProductProps {
  product: IProduct;
  isDisplayAllDetails?: boolean;
  onEdit?: (product: IProduct) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
}

const Product: FC<ProductProps> = ({
  product,
  isDisplayAllDetails = true,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.productContainer}>
      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(product.id)}
        >
          🗑️
        </button>
      )}

      {onEdit && (
        <button className={styles.editButton} onClick={() => onEdit(product)}>
          ✏️
        </button>
      )}

      <h1 className={styles.productTitle}>{product.name}</h1>
      <img
        className={styles.productImage}
        src={product.imageUrl}
        alt={product.name}
      />
      <p className={styles.productCount}>Count: {product.count}</p>
      <p className={styles.productWeight}>Weight: {product.weight}</p>
      {isDisplayAllDetails && (
        <>
          <h3 className={styles.commentsTitle}>Comments:</h3>
          <ul>
            {product.comments &&
              product.comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <p>{comment.description}</p>
                  <small className={styles.commentDate}>{comment.date}</small>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Product;
