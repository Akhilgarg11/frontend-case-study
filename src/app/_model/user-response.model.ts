export interface userResponse{
    name: string,
    email: string,
    phone: string,
    address: {
      street: string,
      city: string,
      pincode: string
      state: string
    },
    cart: any,
    userOrders: any
}