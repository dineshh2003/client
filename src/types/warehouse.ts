export interface Warehouse {
    ID: string
    UserID: string
    ContactPerson: string
    ContactNumber: string
    EmailAddress: string
    CompleteAddress: string
    Landmark: string
    Pincode: string
    City: string
    State: string
    Country: string
  }
  
  export interface WareHouse {
    id: string
    userID: string
    contactPerson: string
    contactNumber: string
    emailAddress: string
    completeAddress: string
    landmark?: string | null
    pincode: string
    city: string
    state: string
    country: string
  }