import { parse, format } from 'date-fns';

export const formatStrapiTime = (time: string) => {
  return format(parse(time, 'H:mm:ss', 0), 'h:mm:ss a');
};
