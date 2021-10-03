import { RegisterInput } from './types/register-input';
import { User, UserModel } from './../entities/user';
import { Resolver, Mutation, AuthChecker, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async register(
    @Arg('data')
    { email, name, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      userId: uuid(),
    });

    await user.save();

    const token = jwt.sign({ userId: user.userId }, process.env.APP_SECRET);

    user.token = token;

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async auth(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: AuthChecker): Promise<User> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid User');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid PW');
    }

    const token = jwt.sign({ userId: user.userId }, process.env.APP_SECRET);

    user.token = token;

    return user;
  }
}
