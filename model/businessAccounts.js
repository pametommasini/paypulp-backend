const newClient = async () => await require("./newClient")();

class BusinessAccount {
  constructor(
    businessId = null,
    customerId = null,
    businessName = null,
    businessType = null,
    businessDescription = null,
    webPage = null,
    cif = null,
    industry = null,
    bankAccountNumber = null
  ) {
    this.businessId = businessId;
    this.customerId = customerId;
    this.businessName = businessName;
    this.businessType = businessType;
    this.businessDescription = businessDescription;
    this.webPage = webPage;
    this.cif = cif;
    this.industry = industry;
    this.bankAccountNumber = bankAccountNumber;
  }
}

const dataToBusinessAccount = (dataFromDb) => {
  const businessAccount = new BusinessAccount(
    (customerId = dataFromDb.customer_id),
    (businessId = dataFromDb.business_id),
    (businessName = dataFromDb.business_name),
    (businessType = dataFromDb.business_type),
    (businessDescription = dataFromDb.business_description),
    (webPage = dataFromDb.web_page),
    (cif = dataFromDb.cif),
    (industry = dataFromDb.industry),
    (bankAccountNumber = dataFromDb.bank_account_number)
  );
  return businessAccount;
};

class BusinessAccountsManager {
  static getBusinessByName = async (businessName) => {
      const pgClient = await newClient();
      try {
        const dbBusiness = await pgClient.query(
          "SELECT * FROM business_accounts WHERE business_name = ($1)",
          [businessName]
        );
        pgClient.end();

        if (dbBusiness.rows.length === 0) return
        const business = dataToBusinessAccount(dbBusiness.rows[0]);
        return business;
      } catch (error) {
        return error;
      }
  }
}

module.exports = BusinessAccountsManager;
