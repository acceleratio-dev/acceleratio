import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import * as jwt from 'jsonwebtoken';

const AUTH_SECRET = 'secret-key';

@Injectable()
export class AuthService {
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateTokens(user: User) {
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      AUTH_SECRET,
      {
        expiresIn: '1h',
        issuer: 'your-app-name',
        audience: 'your-app-users',
      },
    );

    return {
      accessToken,
    };
  }
}
