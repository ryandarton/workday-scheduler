$(function () {
  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    // Get the id of the time-block containing the button that was clicked
    var timeBlockId = $(this).closest('.time-block').attr('id');
    // Get the user input from the textarea within the time-block
    var userInput = $(this).siblings('textarea').val();
    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js
  var currentHour = dayjs().format('H');
  // convert currentHour to Mountain Time
  currentHour = parseInt(currentHour) + 1;

  // Loop through each time-block
  $('.time-block').each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr('id');
    // translate the time-block id to a 24-hour format
    timeBlockId = timeBlockId.split('-')[1];
    // Get the user input from local storage using the time-block id as the key
    var userInput = localStorage.getItem(timeBlockId);
    // Set the value of the corresponding textarea element
    $(this).find('textarea').val(userInput);
    // Remove all classes from the time-block
    $(this).removeClass('past present future');
    // Add the appropriate class based on the current hour
    if (timeBlockId < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockId === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format('MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Display the current date in the header of the page
  var currentTime = dayjs().format('h:mm A');
  // convert currentHour to Mountain Time
  currentHour = parseInt(currentHour) + 1;
  $('#currentTime').text(currentTime);
});
