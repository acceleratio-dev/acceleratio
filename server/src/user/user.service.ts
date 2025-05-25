import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  private users = [
    {
      id: 1,
      username: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      username: 'Elon Musk',
      email: 'elon.musk@example.com',
    },
  ];

  async findAll() {
    return this.users;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  async create(user: User) {
    return this.userModel.create(user);
  }
}
