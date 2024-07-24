import { formatDistanceToNowStrict } from "date-fns";


export function relativeDate(from: Date) {
   return formatDistanceToNowStrict(from, { addSuffix: true });
 }


 