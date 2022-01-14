enum order_status {'active','complete'}

export default interface OrderInterface {
    orderId: number,
    status: order_status,
    total: number,
    user_id: number
}
  
