// Use the moment object along with the format method to display the current day on the index.HTML page.
$("#currentDay").text(moment().format("dddd, MMMM Do"));


// Create a function to retreive any stored tasks from the local storage. 
// The function is called one at a time for each time slot via the createTimeBlocks function.
function retrieveStoredTask (timeBlockTask) {

    // Declare var to local storage item.
    var timeBlockTaskId = `task${timeBlockTask}`;
    console.log("This is the task id in retrieved stored data: " + timeBlockTaskId)
    var timeBlockData = localStorage.getItem(timeBlockTaskId);

    // See if there is data in the local storage for the timeBlockTask.
    // If there is data, then display it in the text area for that time block.
    if (timeBlockData) {

        // Grab the task id (with a template literal) which is attached to the <textarea>.
        // After grabbing the task id set the value .text() to the task in the local storage.
        $(`#${timeBlockTaskId}`).text(timeBlockData)
    }  

}

// Create function to display 9 different time block on the day planner. This will be done by mainpulating the DOM of the index.HTML page. 
function createTimeBlocks () {

    // Create a for Loop to run through the 9 different time blocks for the day planner. Start with 9AM (09), end with 5PM (17).
    for (i = 0; i <9; i++) {

        // Create a row (aka time block) to contain the three columns of data for the time block. There will be 9 different rows. 
        // Each row needs to have an id stating the row they are, based off of the iterator i starting at 9 for (9am).
        var timeBlockRow = $('<div>').addClass('row time-block');
        row = $(timeBlockRow); 
        
        // Create the 3 different columns that will be in each row. 
        // One column for the time for the time block, one column for the text area containing the task, and another column for the save button. 

        // The first column is the time column.
        // The data-time attribute is created using the moment.js time method and hour AMPM format (hA). 
        // This attribute will be used to create the time to be display in the time block column.
        columnTimeBlock = $('<div>').addClass('col-md-1 p-0 hour').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
        columnTimeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));;

        // The second column is the text area to hold the task for that hour.
        // The task id created will be use to display the task text from local storage.

        columnTaskBlock = $('<textarea>').addClass('col-md-10 description p-0 past').attr('id', `task${i}`);
        // console.log("The task id attribute is: " + columnTaskBlock.val());

        // The third column is the save button to save the task to local storage. 
        columnSaveBlock = $('<button>').addClass('saveBtn col-md-1 p-0').html('<i class = "fas fa-save"></i>');

        // Append the three columns to the row in the correct order. 
        row.append(columnTimeBlock);
        row.append(columnTaskBlock);
        row.append(columnSaveBlock);

        // Append the row to the container 
        $('.container').append(row);

        console.log("This the current task id " + `task${i}`);
        retrieveStoredTask (i);
        
    }
}

createTimeBlocks ();

// Function to change time slot text area color based on current hour. If present = red (class present); past = gray (class past); future = green (class future).
function updateTimeBlockColors () {

    // Use the moment object to get() the current hour we are in.
    var currentDayTime = moment();
    var currentDayHour = currentDayTime.get("hour");	
    console.log("The current hour is: " + currentDayHour);
    
    // Create a for loop to cycle through all 9 time slots in the time block. Compare time slot time to current time and change color accordingly. 

    for (i = 0; i < 9; i++) {

        var taskTimeSlot = $(`#task${i}`).val();

        if ((i+9)===currentDayHour) {
            $(`#task${i}`).addClass('present');
        }
        else if ((i+9)>currentDayHour) {
            $(`#task${i}`).addClass('future');
        }
        else {
            $(`#task${i}`).addClass('past');
        }
        console.log("The current task to change color is: " +taskTimeSlot);
    }
}

updateTimeBlockColors ();

function storeTask () {
    // this console shows us the this works to grab the button too!!!!!
    // console.log ("********this",this);

    // Get the data
    //.sibling helps you traverse vertically
    var taskText = $(this).siblings(".description").val();
    console.log("This is the task to be saved: " +taskText);
        
    // Get the id too
    
    var taskId = $(this).siblings("textarea").attr('id');
    
    console.log("This is the task ID of task to be saved: " +taskId);

    // Store the typed in task in local storage. 
    localStorage.setItem(taskId, taskText);
}

// Create an addEventListener for when user hits the save button for the tasks.
$(".saveBtn").on("click",storeTask);












// This uses set() to change minutes to 55. 
// This might be helpful if I were to add a button/input field to have user type in new hour so they can see how the color changes for the tasks if they were in a different part of the day.
//Possible 

var newDayTime = moment();
var newDayMinute = newDayTime.set("minute",55);	
console.log(newDayMinute.toString());
