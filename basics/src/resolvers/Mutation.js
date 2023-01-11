import { v4 as uuid } from "uuid";

export default {
  addCategory: (parent, args, context) => {
    const {
      input: { name },
    } = args;
    const {
      db: { categories },
    } = context;
    const newCategory = {
      id: uuid(),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },
  deleteCategory: (parent, args, context) => {
    const { db } = context;
    const { id } = args;
    if (db.categories.every((category) => category.id !== id)) return false;

    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) return { ...product, categoryId: null };
      return product;
    });
    return true;
  },
  updateCategory: (parent, args, context) => {
    const { id, input } = args;
    const { db } = context;
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;

    db.categories[index] = { ...db.categories[index], ...input };

    return db.categories[index];
  },

  addProduct: (parent, args, context) => {
    const { input } = args;
    const {
      db: { products },
    } = context;
    const newProduct = {
      ...input,
      id: uuid(),
    };

    products.push(newProduct);

    return newProduct;
  },
  deleteProduct: (parent, args, context) => {
    const { db } = context;
    const { id } = args;
    if (db.products.every((product) => product.id !== id)) return false;

    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
  updateProduct: (parent, args, context) => {
    const { id, input } = args;
    const { db } = context;
    const index = db.products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    db.products[index] = { ...db.products[index], ...input };

    return db.products[index];
  },

  addReview: (parent, args, context) => {
    const { input } = args;
    const {
      db: { reviews },
    } = context;
    const newReview = {
      ...input,
      id: uuid(),
    };

    reviews.push(newReview);

    return newReview;
  },
  deleteReview: (parent, args, context) => {
    const { db } = context;
    const { id } = args;
    if (db.reviews.every((review) => review.id !== id)) return false;

    db.reviews = db.reviews.filter((review) => review.id !== id);

    return true;
  },
  updateReview: (parent, args, context) => {
    const { id, input } = args;
    const { db } = context;
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) return null;

    db.reviews[index] = { ...db.reviews[index], ...input };

    return db.reviews[index];
  },
};
