export interface FirestoreOrder {
  ID: string
  Name: string
  CreatedAt: string
  UpdatedAt: string
  CancelledAt: string | null
  ClosedAt: string | null
  ProcessedAt: string
  Currency: string
  TotalPrice: number | Float64Array
  SubtotalPrice: number
  TotalDiscounts: number
  TotalTax: number
  TaxesIncluded: boolean
  FinancialStatus: string
  FulfillmentStatus: string
  OrderNumber: number
  ShopName: string
  AccountId: string
}
  
  export interface FirestoreLineItem {
    id: string;
    productId: string;
    quantity: number;
    price: string;
    totalDiscount: string;
    title: string;
    taxLines: FirestoreTaxLine[];
  }
  
  export interface FirestoreAddress {
    address1: string;
    address2?: string;
    city: string;
    country: string;
    zip: string;
    phone?: string;
  }
  
  export interface FirestoreCustomer {
    // Define fields if necessary, e.g.:
    firstName?: string;
    lastName?: string;
    email?: string;
  }
  
  export interface FirestoreTaxLine {
    title: string;
    price: string;
    rate: string;
  }
  