import { gql } from "@apollo/client";

export const DEDUCT_BALANCE = gql`
  mutation DeductBalance($input: DeductBalanceInput!) {
    deductBalance(input: $input) {
      newBalance
      errors {
        code
        message
      }
    }
  }
`;

export const RECHARGE_WALLET = gql`
  mutation RechargeWallet($input: RechargeWalletInput!) {
    rechargeWallet(input: $input) {
      newBalance
      errors {
        code
        message
      }
    }
  }
`;
