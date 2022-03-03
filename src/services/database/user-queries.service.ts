import { getConnection } from 'typeorm';
import { User } from '../../entities/User';

/**
 * Retrieve all the Users from the DB
 * @returns Array of User as a Promise
 */
export async function getAllUsers(): Promise<User[]> {
  return await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany();
}

/**
 * Retrieve a single User from the DB
 * @param userId The ID of the User to retrieve
 * @returns User as a Promise
 */
export async function getOneUserById(userId: number): Promise<User> {
  // Return the resulting User or fail
  return await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.reviews', 'review')
    .where('user.userId = :id', { id: userId })
    .getOneOrFail();
}

/**
 * Retrieve a single User from the DB
 * @param token The token of the user
 * @returns User as a Promise
 */
export async function getOneUserByToken(token: string): Promise<User> {
  // Return the resulting User or fail
  return await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.token = :token', { token: token })
    .getOneOrFail();
}

/**
 * Retrieve a token with a matching username and password
 * @param username The username of the user
 * @param password The password of the user
 * @returns a User instance with only the token setted
 */
export async function getTokenByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  // Return the resulting User or fail
  return await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .select('user.token')
    .where('user.username = :username', { username: username })
    .andWhere('user.password = :password', { password: password })
    .getOneOrFail();
}

/**
 * Save a User in the DB
 * @param user The User to save
 */
export async function saveUser(user: User) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: user.username,
      password: user.password,
      token: user.token,
    })
    .execute();
}

/**
 * Delete an User from the DB
 * @param userId The ID of the User to delete
 */
export async function deleteUser(userId: number) {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('userId = :id', { id: userId })
    .execute();
}
