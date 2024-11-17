export type Supplier = {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: Address;
};

export type Address = {
  street: string;
  city: string;
  region: string;
  postalCode: number;
  country: string;
  phone: string;
};
