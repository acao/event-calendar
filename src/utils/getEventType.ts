const EVENT_TYPES = ['meeting', 'action', 'other', 'training'];

export default function getEventType(type: string) {
  if (type) {
    const rawType = type.toLowerCase();
    if (EVENT_TYPES.includes(rawType)) {
      return rawType;
    }
  }
  return 'other';
}
