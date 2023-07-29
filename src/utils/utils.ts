export function convertMinutesToHHMM(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let output = "";

    if (hours > 0) {
        output += `${hours}h `;
    }

    if (remainingMinutes > 0) {
        output += `${remainingMinutes}mn`;
    }

    return output.trim();
}

export function formatTimeTo12Hour(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}



// get hh-mm
export function getTimeAsObj(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    // const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return {
        time: `${formattedHours}:${formattedMinutes}`,
        period: `${period}`
    };
}

export function convertFirstLetterToUpperCase(sentence: string) {
    return sentence
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


export const formatName = (title: string, num: number) => {
    const shortenedTitle = title.slice(0, num) + "...";
    return shortenedTitle
}

export function formatDateDayAndMonth(dateString: string) {
    const options: any = { day: 'numeric', month: 'long' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}

export function formatDateTo_dd_mm_yy(dateString: string) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}



// Function to get the month name from a date string
export function getMonthName(dateString: string) {
    const date = new Date(dateString);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
}

// Function to get the day number from a date string
export function getDayNumber(dateString: string) {
    const date = new Date(dateString);
    return date.getDate();
}


// get row latter:
export const getRowLetter = (index:number) => {
    const startingLetterCode = 'A'.charCodeAt(0);
    return String.fromCharCode(startingLetterCode + Math.floor(index / 1));
};