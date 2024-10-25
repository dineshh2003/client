export interface FirestoreOrder {
  ID: string;                      // Order ID
  Name: string;                    // Order Name
  email?: string;                  // Customer Email
  createdAt: string;               // Order Creation Timestamp
  updatedAt?: string;              // Order Update Timestamp
  cancelledAt?: string;            // Order Cancellation Timestamp
  closedAt?: string;               // Order Closure Timestamp
  processedAt: string;             // Order Processing Timestamp
  customer?: FirestoreCustomer;    // Customer Information
  billingAddress?: FirestoreAddress; // Billing Address
  shippingAddress?: FirestoreAddress; // Shipping Address
  currency: string;                // Currency Code
  totalPrice: string;              // Total Price (Serialized as String)
  subtotalPrice: string;           // Subtotal Price (Serialized as String)
  totalDiscounts: string;          // Total Discounts (Serialized as String)
  totalLineItemsPrice: string;     // Total Line Items Price (Serialized as String)
  taxesIncluded: boolean;          // Taxes Included Flag
  totalTax: string;                // Total Tax (Serialized as String)
  taxLines: FirestoreTaxLine[];    // Tax Lines
  totalWeight: number;             // Total Weight
  financialStatus: string;         // Financial Status (e.g., pending)
  fulfillments?: any;              // Fulfillment Information
  fulfillmentStatus?: string;      // Fulfillment Status
  token: string;                   // Token for the Order
  lineItems: FirestoreLineItem[];  // List of Line Items
  shippingLines?: any;             // Shipping Lines Information
  transactions?: any;              // Transaction Information
  appID: number;                   // App ID (if applicable)
  tags?: string;                   // Order Tags
  awb?: string;                    // Airway Bill Number
}

export interface FirestoreLineItem {
  id: string;                      // Line Item ID
  productId: string;               // Product ID
  quantity: number;                // Quantity Ordered
  price: string;                   // Price of the Item (Serialized as String)
  totalDiscount: string;           // Total Discount on the Line Item (Serialized as String)
  title: string;                   // Title of the Item
  taxLines: FirestoreTaxLine[];    // Tax Lines related to the Item
}

export interface FirestoreAddress {
  address1: string;                // Primary Address Line
  address2?: string;               // Secondary Address Line (optional)
  city: string;                    // City Name
  country: string;                 // Country Name
  zip: string;                     // ZIP or Postal Code
  phone?: string;                  // Phone Number (optional)
}

export interface FirestoreCustomer {
  // Define fields for customer if necessary
  // Example:
  // id?: string;
  // firstName?: string;
  // lastName?: string;
  // email?: string;
}

export interface FirestoreTaxLine {
  title: string;                   // Title of the Tax
  price: string;                   // Price of the Tax (Serialized as String)
  rate: string;                    // Tax Rate (Serialized as String)
}
