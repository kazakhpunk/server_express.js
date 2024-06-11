import { CreateEventDto } from './dtos/CreateEvent.dot';
import { IEvent, EventModel } from './models/Event';

class EventService {
  async getEventById(id: string): Promise<IEvent | null> {
    return await EventModel.findById(id).exec();
  }

  async getEvents(page: number, limit: number): Promise<IEvent[]> {
    const skip = (page - 1) * limit;
    return await EventModel.find().skip(skip).limit(limit).exec();
  }

  async getEventsByCity(city: string, page: number, limit: number): Promise<IEvent[]> {
    const skip = (page - 1) * limit;
    return await EventModel.find({ location: city }).skip(skip).limit(limit).exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const { name, description, date, city, duration } = createEventDto;
    const newEvent = new EventModel({
      name,
      description,
      date: date ? new Date(date) : undefined, 
      city,
      duration,
    });

    await newEvent.save();
    return newEvent;
  }
}

export default EventService;

