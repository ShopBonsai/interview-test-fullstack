// exports.seed = async function seedMockMerchantData(knex) {
const { merchants } = require('../../../mockMerchantData');
const db = require('../connect.ts');

// exports.seed = async function seedMockMerchantData(knex) {
const merchArr = merchants.slice(0, 1);

async function main() {
  await db('merchants').del();
  await db('products').del();

  merchArr.map(async m => {
    // Create the `merchant`

    const merch = {
      index_val: m.index,
      guid: m.guid,
      logo: m.logo,
      // created_at: new Date(m.dateCreated),
      published_state: m.publishedState,
      merchant_name: m.merchant,
      commission_fee: parseInt(m.commissionFee) / 100,
      contact_email: m.contactEmail,
      address: m.address,
      // published_date: new Date(m.publishedDate),
      description: m.companyDescription,
    };

    // console.log('merch', merch);
    const merchRecordId = await db('merchants').insert(merch);
    console.log(merchRecordId);
    console.log('----------------------------------');
    console.log('----------------------------------');
    console.log('----------------------------------');

    // console.log(m.publishedBy.userId);
    let user = await db
      .select('*')
      .from('users')
      .where('id', m.publishedBy.userId)
      .first();

    // Create the `merchant_publishes`
    await db('merchant_publishes').insert({
      user_id: user.id,
      merchant_id: merchRecordId,
    });

    const brands = m.brands;
    const prods = m.products;

    prods.map(async p => {
      let prod = {
        original_id: p.id,
        product_name: p.name,
        price: p.price,
        description: p.description,
        size: p.size,
        quantity: p.quantity,
        image_url: p.image,
      };

      const prodBrand = await db
        .select('*')
        .from('brands')
        .where('name', brands[p.belongsToBrand])
        .first();

      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(p);

      const prodRecordId = await db('products').insert({
        ...prod,
        brand_id: prodBrand,
      });

      // Create
      // await db('merchant_products').insert({
      //   merchant_id: merchRecordId,
      //   product_id: prodRecordId,
      // });

      console.log(prod);
      console.log('Brand: ', prodBrand);
      console.log('Brand.id: ', prodBrand.id);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    });

    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    // console.log(prods);
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  });

  console.log(merchArr);
}

main();
// seedMockMerchantData();
