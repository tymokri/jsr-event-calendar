import {Dayjs} from "dayjs";
import {formatDate} from "./date";


export const rules = {
    required: (message: string = 'Input is required') => ({
        required: true,
        message
    }),
    idDateAfter: (message: string) => () => ({
        validator(_: any, value: Dayjs) {
            const day = new Date();
            const currentDay = formatDate(day);
            const dateFromCalendar = formatDate(value.toDate()).toString();

            if (dateFromCalendar >= currentDay) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(message));
        }
    })
};