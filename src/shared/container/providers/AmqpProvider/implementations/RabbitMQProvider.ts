import { Connection, Channel, connect, Message } from 'amqplib';
import IAmqpProvider from '../models/IAmqpProvider';

export default class RabbitMQProvider implements IAmqpProvider {
  private conn: Connection;

  private channel: Channel;

  public uri = 'amqp://admin:admin@localhost:5672';

  async start(): Promise<void> {
    try {
      this.conn = await connect(this.uri);

      this.channel = await this.conn.createChannel();
      console.log('Rabbitmq server running');
    } catch (error) {
      console.log('eroooooooooooo', error);
    }
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    if (!this.conn) {
      await this.start;
    }
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<void | null> {
    return this.channel.consume(queue, message => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
