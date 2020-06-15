type EventInfo = {
  id: string;
  eventname: string;
  eventdate: string;
  eventtime: string;
  eventlink: string;
  location: string;
  description: string;
  eventtype: string;
  shouldpublish: boolean;
  blmendorsed: boolean;
};

type ModalData = {
  date: Date;
  events: EventInfo[];
};

type MonthInfo = {
  startDate: Date;
  events: EventInfo[];
};
