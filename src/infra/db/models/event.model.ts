import { Schema, model } from 'mongoose'
import { string } from 'zod';


interface IEvent {
  url: string;
  requested_on: Date;
  scheduled_time: Date;
  device_id: string;
  notification_type: 'WEBPUSH',
  processed_on: Date
}

const eventSchema = new Schema<IEvent>({
  url: { type: String, required: true },
  requested_on: { type: Date, required: true },
  scheduled_time: { type: Date, required: true },
  device_id: { type: String, required: true },
  processed_on: { type: Date, required: false }
})

export const Event = model('Event', eventSchema)
