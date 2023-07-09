//array of custom settings
var settings = { 
	'date': "2023-05-10T17:30:00",
	'format': "on"
		}
let interval
//run the function
function startCount(date){
	settings.date = date;
	interval = setInterval(countdown_proc, 1000);
		
}

function stopCount(){
	clearInterval(interval); 
}
//loop the function


function countdown_proc() {

		daysPH = document.getElementById("days");
		hoursPH = document.getElementById("hours");
		minutesPH = document.getElementById("minutes");
		secondsPH = document.getElementById("seconds");

		eventDate = new Date(settings['date']) ;
		currentDate = new Date();

		eventDate = eventDate.getTime();
		currentDate = currentDate.getTime();
			
		if(eventDate <= currentDate) {
				clearInterval(interval);
		}
			
		seconds = eventDate - currentDate;

		seconds = Math.floor(seconds / 1000);
			
		days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
		seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed
			
		hours = Math.floor(seconds / (60 * 60));
		seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed
			
		minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
			
		//conditional Ss

		let daysLab = daysPH.nextElementSibling;
		let hoursLab = hoursPH.nextElementSibling;
		let minutesLab = minutesPH.nextElementSibling;
		let secondsLab = secondsPH.nextElementSibling;

		if (days == 1) { daysLab.innerHTML = "Día"; } else { daysLab.innerHTML = "Días"; }
		if (hours == 1) { hoursLab.innerHTML = "Hora"; } else { hoursLab.innerHTML = "Horas"; }
		if (minutes == 1) { minutesLab.innerHTML = "Minuto"; } else { minutesLab.innerHTML = "Minutos"; }
		if (seconds == 1) { secondsLab.innerHTML = "Segundo"; } else { secondsLab.innerHTML = "Segundos"; }
			
		//logic for the two_digits ON setting
		if(settings['format'] == "on") {
			days = (String(days).length >= 2) ? days : "0" + days;
			hours = (String(hours).length >= 2) ? hours : "0" + hours;
			minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
			seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
		}
			
			//update the countdown's html values.
		if(!isNaN(eventDate)) {
			
			daysPH.innerHTML = days;
			hoursPH.innerHTML = hours;
			minutesPH.innerHTML = minutes;
			secondsPH.innerHTML = seconds;
			
			} else { 
				alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
				stopCount();
			}
		}
		

	