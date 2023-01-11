export default {
  category: (parent, args, context) => {
    const categoryId = parent.categoryId;
    const { db } = context;
    return db.categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, args, context) => {
    const { id } = parent;
    const { db } = context;

    return db.reviews.filter((review) => review.productId === id);
  },
};
