export  default function convertDateToMills(dateString: string): number {
    // TODO: validate dateString for format DD.MM.YYYY
    const dateArr = dateString.split('.');
    const year = Number(dateArr[2]);
    const month = Number(dateArr[1]) - 1;
    const day = Number(dateArr[0]);
    const dateObj = new Date(year, month, day);
    const dateNumber = dateObj.getTime();

    return dateNumber;
}
