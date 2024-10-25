export interface FirestoreOrder {
    ID: string;
    Name: string;
    Email?: string;
    CreatedAt: string;
    UpdatedAt?: string;
    CancelledAt?: string;
    ClosedAt?: string;
    ProcessedAt: string;
    Customer?: FirestoreCustomer;
    BillingAddress?: FirestoreAddress;
    ShippingAddress?: FirestoreAddress;
    Currency: string;
    TotalPrice: string;
    SubtotalPrice: string;
    TotalDiscounts: string;
    TotalLineItemsPrice: string;
    TaxesIncluded: boolean;
    TotalTax: string;
    TaxLines: FirestoreTaxLine[];
    TotalWeight: number;
    FinancialStatus: string;
    Fulfillments?: any;
    FulfillmentStatus?: string;
    Token: string;
    LineItems: FirestoreLineItem[];
    ShippingLines?: any;
    Transactions?: any;
    AppID: number;
    Tags?: string;
    AWB?: string;
    Dimensions: {
      Length: number;
      Width: number;
      Height: number;
    };
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
  