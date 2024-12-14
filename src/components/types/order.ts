export interface OrderSummary {
    status: string
    prepaid: number
    cod: number
    total: number
  }
  
  export interface OrderStats {
    pickup: number
    inTransit: number
    ofd: number
    delivered: number
    undelivered: number
    rto: number
  }
  
  