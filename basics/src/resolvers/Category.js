export default {
  products: (parent, args, context) => {
    const { id: categoryId } = parent;
    const { filter } = args;
    const { db } = context;
    let filteredProducts = db.products.filter(
      (product) => product.categoryId === categoryId
    );

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
};
