export default interface IAmqpProvider {
  start(): Promise<void>;
  publishInQueue(queue: string, message: string): Promise<boolean>;
  publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
  consume(queue: string, callback: Function): Promise<void | null>;
}
