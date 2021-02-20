const mongoDBConn = require('../connection');
const Merchant = require('../../models/merchant')
const { merchants } = require('../../../mockMerchantData');
const seed = async() => {
    await mongoDBConn()
    const data = await Merchant.insertMany(merchants)
    if (data && data.length > 0) {
        console.log(`DATA CREATED SUCCESSFULLY: ${data.length} RECORDS INSERTED`)
        process.exit(0)
    }
}
seed()
