import { Entity } from "../../core/Entity";
import { OrderCreatedEvent } from "./order-created";
import { OrderPaidEvent } from "./order-paid";

type OrderStatus = 'pendings' | 'paid'

interface OrderProps {
  customerId: string;
  productId: string;
  amountInCents: number;
  status: OrderStatus;
  createdAt: Date;
}

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId
  }

  get productId() {
    return this.props.productId
  }

  get amountInCents() {
    return this.props.amountInCents
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  public pay() {
    this.props.status = 'paid'

    const orderPaidEvent = new OrderPaidEvent(this)

    this.addDomainEvent(orderPaidEvent)
  }

  static create(props: OrderProps, id?: string) {
    const order = new Order(props)

    if (!id) {
      const orderCreatedEvent = new OrderCreatedEvent(order)
      order.addDomainEvent(orderCreatedEvent)
    }

    return order
  }
}
