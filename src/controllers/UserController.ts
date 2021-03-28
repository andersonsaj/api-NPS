import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getRepository(User);

    const userAleradyExists = await usersRepository.findOne({ email });

    if (userAleradyExists) {
      return response.status(400).json({
        error: 'User já existe',
      });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.json(user);
  }
}
