// Use the moment object along with the format method to display the current day on the index.HTML page.
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// Use the moment object to get() the current hour we are in.
// This could be helpful when changing tasks background ground for the past, present, future.
// Need to confirm what hour format is used, 12 or 24. 
var currentDayTime = moment();
var currentDayHour = currentDayTime.get("hour");	
console.log("The current hour is: " + currentDayHour);

// This uses set() to change minutes to 55. 
// This might be helpful if I were to add a button/input field to have user type in new hour so they can see how the color changes for the tasks if they were in a different part of the day.
//Possible bonus!

var newDayTime = moment();
var newDayMinute = newDayTime.set("minute",55);	
console.log(newDayMinute.toString());

