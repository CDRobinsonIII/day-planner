// Use the moment object along with the format method to display the current day on the index.HTML page.
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// Create function to display 9 different time block on the day planner. This will be done by mainpulating the DOM of the index.HTML page. 


function createTimeBlocks () {

    // Create a for Loop to run through the 9 different time blocks for the day planner. Start with 9AM (09), end with 5PM (17).
    // For the iterator use tb for time block.
    for (i = 0; i <9; i++) {

        // Create a row (aka time block) to contain the three columns of data for the time block. There will be 9 different rows. 
        // Each row needs to have an id stating the row they are, based off of the iterator tb.
        var timeBlockRow = $('<div>').addClass('row time-block');
        row = $(timeBlockRow); 
        
        // Create the 3 different columns that will be in each row. 
        // One column for the time for the time block, one column for the text area containing the task, and another column for the save button. 
        columnTimeBlock = $('<div>').addClass('col-md-1 p-0 hour').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
        columnTimeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));;
        columnTaskBlock = $('<textarea>').addClass('col-md-9 description p-0 past');
        columnSaveBlock = $('<button>').addClass('saveBtn col-md-1 p-0').html('<i class = "fas fa-save"></i>');

        // Append the three columns to the row in the correct order. 
        row.append(columnTimeBlock);
        row.append(columnTaskBlock);
        row.append(columnSaveBlock);

        // Append the row to the container 
        $('.container').append(row);
        
    }
}

createTimeBlocks ();




// Use the moment object to get() the current hour we are in.
// This could be helpful when changing tasks background ground for the past, present, future.
// Need to confirm what hour format is used, 12 or 24. 
var currentDayTime = moment();
var currentDayHour = currentDayTime.get("hour");	
console.log("The current hour is: " + currentDayHour);

// This uses set() to change minutes to 55. 
// This might be helpful if I were to add a button/input field to have user type in new hour so they can see how the color changes for the tasks if they were in a different part of the day.
//Possible 

var newDayTime = moment();
var newDayMinute = newDayTime.set("minute",55);	
console.log(newDayMinute.toString());
