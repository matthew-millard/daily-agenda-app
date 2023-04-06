$(function () {
	var schedularElement = $('[data-js="scheduler"]')
	var currentTimeElement = $('[data-js="current-time"]')

	function displayTimeDate() {
		var timeDate = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a')
		currentTimeElement.text(timeDate)
	}
	checkTimeBlockStatus()
	clearInputs()
	displayTasks()
	// Display current time & date
	setInterval(displayTimeDate, 1000)

	function displayTasks() {
		var tasks = getTasksFromStorage()

		$('textarea').each(function () {
			var index = $(this).parent().attr('id')
			var taskIndex = index - 9

			if (tasks[taskIndex]) {
				$(this).val(tasks[taskIndex][index])
			} else {
				$(this).val('')
			}
		}) ///////// Where I left off!!!!!!
	}

	function clearInputs() {
		$('textarea').val('')
	}

	function saveTasksToStorage(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	function getTasksFromStorage() {
		var tasks = localStorage.getItem('tasks')
		tasks ? (tasks = JSON.parse(tasks)) : (tasks = [])
		return tasks
	}

	function checkTimeBlockStatus() {
		$('textarea').each(function () {
			var currentHour = dayjs().hour()
			console.log(currentHour)
			var timeBlockHour = parseInt($(this).attr('id'))
			console.log(timeBlockHour)
			console.log(currentHour)

			if (timeBlockHour < currentHour) {
				$(this).addClass('past')
			} else if (timeBlockHour === currentHour) {
				$(this).addClass('current')
			} else {
				$(this).addClass('future')
			}
		})
	}

	function saveTask() {
		var task = $(this).prev().val().trim()
		var timeBlock = $(this).parent().attr('id')
		var taskIndex = timeBlock - 9
		var newTask = {
			...newTask,
			[timeBlock]: task,
		}

		var tasks = getTasksFromStorage()
		tasks.splice(taskIndex, 1, newTask)
		saveTasksToStorage(tasks)
		clearInputs()
		displayTasks()
	}

	schedularElement.on('click', '.save-button', saveTask)
})

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
