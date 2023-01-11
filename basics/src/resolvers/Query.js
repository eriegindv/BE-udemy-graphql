export default {
  hello: () => "world",
  products: (parent, args, context) => {
    const { filter } = args;
    const { db } = context;
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale != null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === onSale
        );
      }

      if (avgRating != null) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, args, context) => {
    const { id } = args;
    const { db } = context;
    return db.products.find((product) => product.id === id);
  },
  categories: (parent, args, context) => {
    return context.db.categories;
  },
  category: (parent, args, context) => {
    const { id } = args;
    const { db } = context;
    return db.categories.find((category) => category.id === id);
  },
};
