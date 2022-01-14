enum order_status {'active','complete'}
export interface Order{
    orderId: number,
    status: order_status,
    user_id: number
}
export interface OrderWithDetails extends Order{
    product_id: number,
    quantity: number,

}
  
