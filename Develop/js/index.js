// DOM Ready Wrapper
$(function () {
	var $currentTime = $('[data-js=current-time]')

	setInterval(displayTimeDate, 1000)
	checkTimeBlockStatus()
	renderTasks()
	// Get the user's input from the associated textarea
	function getUserInput() {
		var timeBlockId = $(this).parent().attr('id')
		var index = timeBlockId - 9
		var userInput = $(this).prev().val().trim()
		if (userInput === '') {
			$(this).prev().attr('placeholder', 'Please enter a task').addClass('error-message')
			setTimeout(() => $(this).prev().removeAttr('placeholder'), 3000) // Clear error message after 3 seconds
			return
		} else {
			var newTask = { ...newTask, [timeBlockId]: userInput }
		}
		// Get tasks from local storage, then update with new task
		var tasks = getTasksFromStorage()
		tasks.splice(index, 1, newTask)
		saveTasksToStorage(tasks)
		clearInputs()
		renderTasks()
	}

	// If local storage is empty, assign an empty array to tasks.
	function getTasksFromStorage() {
		var tasks = localStorage.getItem('tasks')
		tasks ? (tasks = JSON.parse(tasks)) : (tasks = [])
		return tasks
	}

	// Save updated tasks
	function saveTasksToStorage(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	// Clears textarea values
	function clearInputs() {
		$('textarea').val('')
	}

	// Render tasks to allocated time blocks
	function renderTasks() {
		var tasks = getTasksFromStorage()
		console.log(tasks)
		console.log(tasks[0])
		var i = 0
		console.log(tasks.length)
		while (i < tasks.length) {
			var key = Object.keys(tasks[i])
			$('#' + key)
				.find('textarea')
				.val(tasks[i][key])
			i++
		}
	}

	// Renders time and date
	function displayTimeDate() {
		var timeDate = dayjs().format('ddd DD MMM YYYY, hh:mm:ss A')
		console.log(timeDate)
		$currentTime.text(timeDate)
	}

	// Will check time block status and change background color accordingly
	function checkTimeBlockStatus() {
		$('textarea').each(function () {
			var currentHour = dayjs().hour()
			var timeBlockHour = parseInt($(this).parent().attr('id'))

			if (timeBlockHour < currentHour) {
				$(this).addClass('past')
			} else if (timeBlockHour === currentHour) {
				$(this).addClass('current')
			} else {
				$(this).addClass('future')
			}
		})
	}

	// Will clear local storage and timeblock values.
	function emptyLocalStorage() {
		localStorage.clear()
		clearInputs()
	}

	// Save Button Event Listener
	$('#scheduler').on('click', '.save-button', getUserInput)

	// Delete All tasks Event Listener
	$('[data-js="clear-button"]').on('click', emptyLocalStorage)
})
