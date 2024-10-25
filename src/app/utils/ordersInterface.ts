 export interface FirestoreOrder {
  id?: string;
  name?: string;
  email?: string;
  created_at?: string; // RFC3339 timestamp
  updated_at?: string;
  cancelled_at?: string;
  closed_at?: string;
  processed_at?: string;
  customer?: FirestoreCustomer;
  billing_address?: FirestoreAddress;
  shipping_address?: FirestoreAddress;
  currency?: string;
  total_price?: string; // decimal.Decimal serialized as string
  subtotal_price?: string;
  total_discounts?: string;
  total_line_items_price?: string;
  taxes_included?: boolean;
  total_tax?: string;
  tax_lines?: FirestoreTaxLine[];
  total_weight?: number;
  financial_status?: string; // goshopify.OrderFinancialStatus
  fulfillments?: FirestoreFulfillment[];
  fulfillment_status?: string; // goshopify.OrderFulfillmentStatus
  token?: string;
  line_items?: FirestoreLineItem[];
  shipping_lines?: FirestoreShippingLine[];
  transactions?: FirestoreTransaction[];
  app_id?: number;
  tags?: string;
  awb?: string;
}

export interface FirestoreCustomer {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  state?: string;
  note?: string;
  verified_email?: boolean;
  multipass_identifier?: string;
  orders_count?: number;
  tax_exempt?: boolean;
  total_spent?: number;
  phone?: string;
  tags?: string;
  last_order_id?: number;
  last_order_name?: string;
  default_address?: FirestoreCustomerAddress;
  addresses?: FirestoreCustomerAddress[];
  created_at?: string;
  updated_at?: string;
  metafields?: Metafield[];
}

export interface FirestoreAddress {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  country_code?: string;
  first_name?: string;
  last_name?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  province?: string;
  zip?: string;
}

export interface FirestoreLineItem {
  id?: string;
  product_id?: string;
  quantity?: number;
  price?: string;
  total_discount?: string;
  title?: string;
  tax_lines?: FirestoreTaxLine[];
}

export interface FirestoreTaxLine {
  title?: string;
  price?: string;
  rate?: string;
}

export interface FirestoreFulfillment {
  id?: string;
  status?: string;
  tracking_company?: string;
  tracking_numbers?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface FirestoreShippingLine {
  id?: string;
  title?: string;
  price?: string;
  code?: string;
}

export interface FirestoreTransaction {
  id?: string;
  amount?: string;
  status?: string;
  gateway?: string;
  created_at?: string;
}

export interface FirestoreCustomerAddress {
  id?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
  name?: string;
  province_code?: string;
  country_code?: string;
}

export interface Metafield {
  namespace: string;
  key: string;
  value: string;
  value_type: string;
  description?: string;
}
