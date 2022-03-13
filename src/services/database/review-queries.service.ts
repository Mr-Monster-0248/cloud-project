import { getConnection } from 'typeorm';
import { Review } from '../../entities/Review';
import { filterUndefinedProperty } from '../../utils/filterUndefinedProperty';

interface ReviewQueryOptions {
  restaurantId?: number;
  userId?: number;
}

/**
 * Retrieve all the Reviews from the DB
 * @param options Options to filter the query by
 * @returns Array of Review as a Promise
 */
export async function getAllReviews(
  options: ReviewQueryOptions
): Promise<Review[]> {
  // Create request stem to retrieve Reviews
  const queryBuilder = getConnection()
    .getRepository(Review)
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.reviewer', 'user');

  const { restaurantId, userId } = options;

  // If a Restaurant ID was supplied
  if (restaurantId) {
    // Filter query by Restaurant ID
    queryBuilder
      .leftJoinAndSelect('review.restaurant', 'restaurant')
      .andWhere('restaurant.restaurantId = :id', { id: restaurantId });
  }

  // If a User ID was supplied
  if (userId) {
    // Filter query by Restaurant ID
    queryBuilder.andWhere('user.userId = :id', { id: userId });
  }

  // Return the resulting array of Review
  return await queryBuilder.getMany();
}

/**
 * Retrieve a single Review from the DB from its ID
 * @param reviewId The ID of the Review to retrieve
 * @param options Options to filter the query by
 * @returns Review as a Promise
 */
export async function getOneReviewById(
  reviewId: number,
  options?: ReviewQueryOptions
): Promise<Review> {
  // Create request stem to retrieve Reviews
  const queryBuilder = getConnection()
    .getRepository(Review)
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.reviewer', 'user')
    .where('review.reviewId = :reviewId', { reviewId: reviewId });

  // If some options were supplied
  if (options) {
    // If a Restaurant ID was supplied
    if (options.restaurantId) {
      // Filter query by Restaurant ID
      queryBuilder
        .leftJoinAndSelect('review.restaurant', 'restaurant')
        .andWhere('restaurant.restaurantId = :id', {
          id: options.restaurantId,
        });
    }

    // If a User ID was supplied
    if (options.userId) {
      // Filter query by Restaurant ID
      queryBuilder.andWhere('user.userId = :id', { id: options.userId });
    }
  }

  // Return the resulting Review or fail
  return await queryBuilder.getOneOrFail();
}

/**
 * Save a Review in the DB
 * @param review The Review to save
 * @returns The ID of the newly created Restaurant
 */
export async function saveReview(review: Review): Promise<number> {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Review)
    .values({
      reviewer: review.reviewer,
      restaurant: review.restaurant,
      content: review.content,
      grade: review.grade,
    })
    .execute();

  return result.identifiers[0].reviewId as number;
}

/**
 * Save a Review in the DB
 * @param review The Review to save
 * @returns The ID of the newly created Restaurant
 */
export async function updateReview(review: Review) {
  const filteredReview = filterUndefinedProperty(review)
  return await getConnection()
    .createQueryBuilder()
    .update(Review)
    .set({
      ...filteredReview
    })
    .where('reviewId = :reviewId', { reviewId: review.reviewId })
    .execute();
}

/**
 * Delete a Review from the DB
 * @param reviewId The ID of the Review to delete
 */
export async function deleteReview(reviewId: number) {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Review)
    .where('reviewId = :id', { id: reviewId })
    .execute();
}
