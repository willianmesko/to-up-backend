import { string } from '@hapi/joi';

export default interface ICreateNotificationDTO {
  content: string;
  recipient_id: string;
}
