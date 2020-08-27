import * as bcrypt from "bcrypt";

import connectToDB from "./db";
import User from "./models/User";

import { UserRole } from "./models/User";

const main = async () => {
  const args = process.argv.slice(2);
  let email = args[0];
  let password = args[1];

  if (!email) {
    console.warn("No email provided, defaulting to admin@admin.com");
    email = "admin@admin.com";
  }

  if (!password) {
    console.warn("No password provided, defaulting to 'password'");
    password = "password";
  }

  try {
    console.log("Connecting to database..");
    const db = await connectToDB();
    console.log("Connected to database.");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Creating user with email ${email}.`);

    const user = await User.create({
      email,
      auth: {
        password: {
          bcrypt: hashedPassword,
        },
      },
      profile: {
        name: "admin user",
      },
      role: UserRole.ADMIN,
    });

    console.log(`User created with ID: ${user._id}`);
    console.log("exiting.");
    process.exit(0);
  } catch (e) {
    console.error("FAILED: CREATING_ADMIN_USER");
    console.error(e);
    process.exit(1);
  }
};

main();
