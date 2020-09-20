import { parse } from 'date-fns';

export const DATE_FORMAT = 'MM/dd/yyyy';

export const parseEventDate = (date: string) => parse(date, DATE_FORMAT, 0);
