import { Order } from "../bounded-contexts/sales/order";
import { OrderCreatedEvent } from "../bounded-contexts/sales/order-created";
import { DomainEvents } from "../core/DomainEvents";

DomainEvents.registerSubscriber(OrderCreatedEvent.name,
  (order) => {
    console.log(order)
  },
)

const order = Order.create({
  amountInCents: 1000,
  createdAt: new Date(),
  customerId: 'customer-id',
  productId: 'product-id',
  status: 'paid'
})

DomainEvents.dispatchEventsForEntity(order.id)
