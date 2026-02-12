import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function formatarDataHumana(data?: string | null) {
  if (!data) return "-";

  return dayjs(data).calendar(null, {
    sameDay: "[Hoje às] HH:mm:ss",
    lastDay: "[Ontem às] HH:mm:ss",
    lastWeek: "dddd [às] HH:mm:ss",
    sameElse: "DD/MM/YYYY HH:mm:ss",
  });
}
