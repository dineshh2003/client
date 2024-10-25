export interface FirestoreOrder {
    ID: string;
    Name: string;
    Email?: string;
    CreatedAt: string;
    UpdatedAt?: string;
    cancelledAt?: string;
    closedAt?: string;
    ProcessedAt: string;
    customer?: FirestoreCustomer;
    billingAddress?: FirestoreAddress;
    ShippingAddress?: FirestoreAddress;
    currency: string;
    TotalPrice: string;
    subtotalPrice: string;
    totalDiscounts: string;
    totalLineItemsPrice: string;
    taxesIncluded: boolean;
    totalTax: string;
    taxLines: FirestoreTaxLine[];
    totalWeight: number;
    FinancialStatus: string;
    fulfillments?: any;
    fulfillmentStatus?: string;
    token: string;
    lineItems: FirestoreLineItem[];
    shippingLines?: any;
    transactions?: any;
    appID: number;
    tags?: string;
    awb?: string;
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
  