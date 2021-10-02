import { APP_SECRET } from './../../utils/consts';
import { RegisterInput } from './types/register-input';
import { User, UserModel } from './../entities/user';
import { Resolver, Query, Mutation, AuthChecker, Arg, Ctx } from 'type-graphql';
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

    const token = jwt.sign({ userId: user.userId }, APP_SECRET);

    user.token = token;

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: AuthChecker): Promise<User> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    const token = jwt.sign({ userId: user.userId }, APP_SECRET);

    user.token = token;

    return user;
  }
}
