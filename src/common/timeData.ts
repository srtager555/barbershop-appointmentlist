  export const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  export const TODAY = new Date();
  
  export const UTC_TODAY = `${week[TODAY.getUTCDay()]} ${TODAY.getUTCDate} ${TODAY.getUTCMonth}M ${
    TODAY.getUTCFullYear
  }}`;