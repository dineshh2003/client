import { gql } from '@apollo/client';

// Calculate Shipping Rates Types
export interface ShippingRate {
  courier_code: string;
  courier_name: string;
  base_charge: number;
  fuel_surcharge: number;
  cod_charge: number;
  handling_charge: number;
  total_charge: number ;
  expected_days: number;
}

export interface CalculateShippingRatesResponse {
  calculateShippingRates: {
    success: boolean;
    rates: ShippingRate[];
    error?: string;
  };
}

export interface CalculateShippingRatesVariables {
  origin_pincode: number;
  destination_pincode: number;
  weight: number | Float64Array;
  length: number | Float64Array;
  width: number | Float64Array;
  height: number | Float64Array;
  collectable_amount: number | Float64Array;
}

// GraphQL Mutation
export const CALCULATE_SHIPPING_RATES = gql`
  mutation CalculateRates(
    $origin_pincode: Int!,
    $destination_pincode: Int!,
    $weight: Float!,
    $length: Float,
    $width: Float,
    $height: Float,
    $collectable_amount: Float!
  ) {
    calculateShippingRates(
      input: {
        origin_pincode: $origin_pincode
        destination_pincode: $destination_pincode
        weight: $weight
        length: $length
        width: $width
        height: $height
        payment_mode: PREPAID
        collectable_amount: $collectable_amount
        courier_codes: ["DELHIVERY", "XPRESSBEES"]
      }
    ) {
      success
      rates {
        courier_code
        courier_name
        base_charge
        fuel_surcharge
        cod_charge
        handling_charge
        total_charge
        expected_days
      }
      error
    }
  }
`;