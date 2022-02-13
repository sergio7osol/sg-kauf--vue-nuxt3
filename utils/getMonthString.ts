export default function getMonthString(monthNumber: number) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthNumber = Number(monthNumber) - 1;

    return monthNames[monthNumber];
}