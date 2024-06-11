import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  description: string;
  date?: Date;
  city: string;
  duration: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  city: { type: String, required: true },
  duration: { type: String, required: true },
});

const EventModel = mongoose.model<IEvent>("Event", EventSchema);

export { EventModel };
