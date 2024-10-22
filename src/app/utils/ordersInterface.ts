
export interface Order {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    cancelledAt?: Date;
    closedAt?: Date;
    processedAt?: Date;
    customer?: Customer;
    billingAddress?: Address;
    shippingAddress?: Address;
    currency?: string;
    totalPrice?: string; // Use string for decimal.Decimal equivalent.
    totalPriceSet?: AmountSet;
    totalShippingPriceSet?: AmountSet;
    currentTotalPrice?: string;
    subtotalPrice?: string;
    currentSubtotalPrice?: string;
    totalDiscounts?: string;
    totalDiscountSet?: AmountSet;
    currentTotalDiscounts?: string;
    currentTotalDiscountsSet?: AmountSet;
    totalLineItemsPrice?: string;
    taxesIncluded?: boolean;
    totalTax?: string;
    totalTaxSet?: AmountSet;
    currentTotalTax?: string;
    currentTotalTaxSet?: AmountSet;
    taxLines?: TaxLine[];
    totalWeight?: number;
    financialStatus?: string;
    fulfillments?: Fulfillment[];
    fulfillmentStatus?: string;
    token?: string;
    cartToken?: string;
    number?: number;
    orderNumber?: number;
    note?: string;
    test?: boolean;
    browserIp?: string;
    buyerAcceptsMarketing?: boolean;
    cancelReason?: string;
    noteAttributes?: NoteAttribute[];
    discountCodes?: DiscountCode[];
    lineItems?: LineItem[];
    shippingLines?: ShippingLine[];
    transactions?: Transaction[];
    appId?: number;
    customerLocale?: string;
    landingSite?: string;
    referringSite?: string;
    sourceName?: string;
    clientDetails?: ClientDetails;
    tags?: string;
    locationId?: number;
    paymentGatewayNames?: string[];
    processingMethod?: string;
    userId?: number;
    orderStatusUrl?: string;
    gateway?: string;
    confirmed?: boolean;
    checkoutToken?: string;
    reference?: string;
    sourceIdentifier?: string;
    sourceUrl?: string;
    deviceId?: number;
    phone?: string;
    landingSiteRef?: string;
    checkoutId?: number;
    contactEmail?: string;
    metafields?: Metafield[];
    sendReceipt?: boolean;
    sendFulfillmentReceipt?: boolean;
    presentmentCurrency?: string;
    inventoryBehaviour?: string;
  }
  export interface Customer {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    state?: string;
    note?: string;
    verifiedEmail?: boolean;
    multipassIdentifier?: string;
    ordersCount?: number;
    taxExempt?: boolean;
    totalSpent?: string;
    phone?: string;
    tags?: string;
    lastOrderId?: number;
    lastOrderName?: string;
    emailMarketingConsent?: EmailMarketingConsent;
    smsMarketingConsent?: SMSMarketingConsent;
    defaultAddress?: CustomerAddress;
    addresses?: CustomerAddress[];
    createdAt?: Date;
    updatedAt?: Date;
    metafields?: Metafield[];
  }
  
  export interface EmailMarketingConsent {
    state: string;
    optInLevel: string;
    consentUpdatedAt?: Date;
  }
  
  export interface SMSMarketingConsent {
    state: string;
    optInLevel: string;
    consentUpdatedAt?: Date;
    consentCollectedFrom?: string;
  }
  export  interface Address {
    id?: number;
    address1?: string;
    address2?: string;
    city?: string;
    company?: string;
    country?: string;
    countryCode?: string;
    firstName?: string;
    lastName?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    phone?: string;
    province?: string;
    provinceCode?: string;
    zip?: string;
  }
  export  interface AmountSet {
    shopMoney?: AmountSetEntry;
    presentmentMoney?: AmountSetEntry;
  }
  
  export interface AmountSetEntry {
    amount?: string;
    currencyCode?: string;
  }
  export interface TaxLine {
    title?: string;
    price?: string;
    rate?: string;
  }
  export interface Fulfillment {
    id?: number;
    orderId?: number;
    locationId?: number;
    status?: string;
    createdAt?: Date;
    service?: string;
    updatedAt?: Date;
    trackingCompany?: string;
    shipmentStatus?: string;
    trackingInfo?: FulfillmentTrackingInfo;
    trackingNumber?: string;
    trackingNumbers?: string[];
    trackingUrl?: string;
    trackingUrls?: string[];
    receipt?: Receipt;
    lineItems?: LineItem[];
    notifyCustomer?: boolean;
  }
  
  export interface FulfillmentTrackingInfo {
    company?: string;
    number?: string;
    url?: string;
  }
  
  export interface Receipt {
    testCase?: boolean;
    authorization?: string;
  }
  export interface LineItem {
    id?: number;
    productId?: number;
    variantId?: number;
    quantity?: number;
    currentQuantity?: number;
    price?: string;
    totalDiscount?: string;
    title?: string;
    variantTitle?: string;
    name?: string;
    sku?: string;
    vendor?: string;
    giftCard?: boolean;
    taxable?: boolean;
    fulfillmentService?: string;
    requiresShipping?: boolean;
    variantInventoryManagement?: string;
    preTaxPrice?: string;
    properties?: NoteAttribute[];
    productExists?: boolean;
    fulfillableQuantity?: number;
    grams?: number;
    fulfillmentStatus?: string;
    taxLines?: TaxLine[];
    originLocation?: Address;
    destinationLocation?: Address;
    appliedDiscount?: AppliedDiscount;
    discountAllocations?: DiscountAllocation[];
  }
  
  export interface AppliedDiscount {
    title?: string;
    description?: string;
    value?: string;
    valueType?: string;
    amount?: string;
  }
  
  export interface DiscountAllocation {
    amount?: string;
    discountApplicationIndex?: number;
    amountSet?: AmountSet;
  }
  export interface ShippingLine {
    id?: number;
    title?: string;
    price?: string;
    priceSet?: AmountSet;
    discountedPrice?: string;
    discountedPriceSet?: AmountSet;
    code?: string;
    source?: string;
    phone?: string;
  }
  export interface Metafield {
    createdAt?: Date;
    description?: string;
    id?: number;
    key?: string;
    namespace?: string;
    ownerId?: number;
    ownerResource?: string;
    updatedAt?: Date;
    value?: any;
    type?: string;
    adminGraphqlApiId?: string;
  }
  // NoteAttribute Interface
  export interface NoteAttribute {
    name?: string;
    value?: any; // any to support various data types
  }
  
  // DiscountCode Interface
  export interface DiscountCode {
    amount?: string; // Using string to represent decimals since JS lacks native decimal support
    code?: string;
    type?: string;
  }
  
  // PaymentDetails Interface
  export interface PaymentDetails {
    avsResultCode?: string;
    creditCardBin?: string;
    cvvResultCode?: string;
    creditCardNumber?: string;
    creditCardCompany?: string;
  }
  
  // Transaction Interface
  export interface Transaction {
    id?: number;
    orderId?: number;
    amount?: string; // Using string to represent decimals
    kind?: string;
    gateway?: string;
    status?: string;
    message?: string;
    createdAt?: string; // Date represented as ISO string
    test?: boolean;
    authorization?: string;
    currency?: string;
    locationId?: number | null;
    userId?: number | null;
    parentId?: number | null;
    deviceId?: number | null;
    errorCode?: string;
    sourceName?: string;
    source?: string;
    paymentDetails?: PaymentDetails;
  }
  
  // ClientDetails Interface
  export interface ClientDetails {
    acceptLanguage?: string;
    browserHeight?: number;
    browserIp?: string;
    browserWidth?: number;
    sessionHash?: string;
    userAgent?: string;
  }
  
  // CustomerAddress Interface
  export interface CustomerAddress {
    id?: number;
    customerId?: number;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    zip?: string;
    phone?: string;
    name?: string;
    provinceCode?: string;
    countryCode?: string;
    countryName?: string;
    default?: boolean;
  }
  
  