import { seedDatabase } from '../utils/seed.data';

const initDbTests = async () => {
  await seedDatabase();
};

initDbTests().then(() => process.exit());
