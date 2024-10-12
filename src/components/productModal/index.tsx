// src/components/ProductModal.tsx
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { IProduct } from "../../types/product";
import { generateRandomId } from "../../utils";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedProduct: IProduct) => Promise<void>;
  product?: IProduct | null;
}

const ProductModal: FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    name: string;
    count: number;
    weight: IProduct["weight"];
    imageUrl: string;
  }>();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        count: product.count,
        weight: product.weight,
        imageUrl: product.imageUrl,
      });
    } else {
      reset({ name: "", count: 0, weight: "0", imageUrl: "" });
    }
  }, [product, isOpen, reset]);

  const onSubmit = (data: {
    name: string;
    count: number;
    weight: string;
    imageUrl: string;
  }) => {
    onConfirm({
      id: product ? product.id : generateRandomId(),
      ...data,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{product ? "Edit" : "Add"} Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Product Name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Count</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Count"
              {...register("count", {
                required: "Count is required",
                valueAsNumber: true,
              })}
            />
            {errors.count && (
              <span className={styles.errorText}>{errors.count.message}</span>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Weight</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Weight"
              {...register("weight", {
                required: "Weight is required",
                valueAsNumber: true,
              })}
            />
            {errors.weight && (
              <span className={styles.errorText}>{errors.weight.message}</span>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Image URL</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Image URL"
              {...register("imageUrl", { required: "Image URL is required" })}
            />
            {errors.imageUrl && (
              <span className={styles.errorText}>
                {errors.imageUrl.message}
              </span>
            )}
          </div>
          <div className={styles.modalButtons}>
            <button type="submit">Confirm</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
