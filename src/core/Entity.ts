import { randomUUID } from "crypto";
import { DomainEvent } from "./DomainEvent";
import { DomainEvents } from "./DomainEvents";

export class Entity<Props> {
  protected readonly _id: string;
  protected props: Props
  protected _domainEvents: DomainEvent[] = []

  protected constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get id() {
    return this._id;
  }

  get domainEvents() {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent)
    DomainEvents.markEntityForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
