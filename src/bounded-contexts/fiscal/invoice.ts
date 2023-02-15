import { Entity } from "../../core/Entity";

interface InvoiceProps {
  orderId: string;
  createdAt: string;
}

export class Invoice extends Entity<InvoiceProps> {
  get orderId() {
    return this.props.orderId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: InvoiceProps) {
    const invoice = new Invoice(props)
    return invoice
  }
}
