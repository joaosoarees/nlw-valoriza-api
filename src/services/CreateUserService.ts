import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute(user: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const { email } = user;

    if (!email) {
      throw new Error('Incorrect email.');
    }

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new Error('User already exists.');
    }

    const newUser = usersRepository.create(user);

    await usersRepository.save(newUser);

    return newUser;
  }
}
