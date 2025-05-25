import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args({ name: 'loginInput', type: () => LoginInput })
    loginInput: LoginInput,
  ) {
    const user = await this.userService.findByEmail(loginInput.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.authService.comparePassword(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('User not found');
    }

    const { accessToken } = await this.authService.generateTokens(user);

    // const hashedPassword = await this.authService.hashPassword(loginInput.password);

    // const newUser = await this.userService.create({
    //   username: loginInput.email,
    //   email: loginInput.email,
    //   password: hashedPassword,
    // });
    // await newUser.save();

    return {
      accessToken,
    };
  }
}
