/* Description: Parses the data stored in the varible 'data' (embeded by EJS on rendering) to build the HMTL DOM */




/* 
/	From now on the only valid date and time formats are ISO and millisecond originally it all was built on ms
/	but the goal is to migrate to iso before reaching full production :D 	
/
/	ISO is like this ---> YYYY-MM-DDTHH:mm:ss:mmmm 
/									*
/									note the "T" to split time from date ;)
/
/		Dates splits with dashes "-" and hours splits with colons ":" easy peasy(?) cider squeeze
*/




var tick = 30000; 								//Milliseconds <- this is wrong also gotta fix this 


/*   Quick notes

To change a global css property (set under :root{ --your-property})

document.documentElement.style.setProperty('--your-property', 'value');



*/
document.getElementById("modalCtaBtn").addEventListener('click',checkInput);

let earOpTime = 0;								//Set by the getOffset function as the earlier opening time
let latClTime = 0;								//Set by the getOffset function as the later closing time
let lengths = [];								//Set by the getOffset function as the lenght of each shift (maybe we can add a longer?)


getOffsets();									//Gets the offsets used later in rendering the divs <----- NEEDS TO BE FIXED


let testNow = new Date();


renderDays(testNow,15);





sWrapper = document.getElementById('sWrapper');

function renderDays(from, amount = 15){


/*Days and months tags should come in the "DATA[CONFIG]" */


let days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'];


let standsCount = [];

/*Lets loop the given amount of times to create the divs for each day to be displayed */



for (let r = 0 ; r < amount; r++){								//Repeats the cycle 'amount' times		<- r is the magic number						

	let newSlide = document.createElement('div');				//Creates a new slide and add classees				
	newSlide.classList.add("swiper-slide");

	standsCount[r] = 0;											//Stands counter



/* this do .. while loop is opened to rewrite the placeholder if there is 
no data available for this day (so empty days are rewritten andr not displayed)
usefull mostly for sundays or holydays */



do {


	let newDay = document.createElement('div');				//Creates a container DIV

	newDay.classList.add("card");
	newDay.classList.add("h-100");

	newSlide.insertAdjacentElement("afterbegin", newDay);	//Inserts in the container

	let now = new Date(from);			// Stores the current date (will augment one day on each iteration)

	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);

	let d = now.getDay();				//Day of the week 0-6 (to pick from array days[])
	let m = now.getMonth();				//Month of the year 0-11 (to pick from array months[])
	let f = now.getDate();				//Day of the month 0-31 (to display on screen)
	let y = now.getFullYear();			//Year XXXX format


	let tempId = "id_" + f + m + y;


	newDay.setAttribute("id", tempId); 					//overwrites if relooping  it

	
	let newTitle = document.createElement('div');		//Creates the container for the title

	newTitle.classList.add("card-body");				//Adds classes

	newDay.insertAdjacentElement("afterbegin", newTitle);		//inserts it

	
	let newTitleText = document.createElement('p');				//Creates de p tag for title, and assigns class
	
	newTitleText.classList.add("testimonial-author");			//Asigns a class to it

	let fullDate = days[d] + " " + f + " " + months[m]

	newTitleText.innerText =  fullDate; 
				
	newTitle.insertAdjacentElement("afterbegin", newTitleText);	//Inserts it

				
	let anotherContainer = document.createElement('div');		//Creates a container DIV

	anotherContainer.classList.add("rowCont");					//Add clases
	anotherContainer.classList.add("h-100");					//Add clases
	
	newDay.insertAdjacentElement("beforeend", anotherContainer);//Inserts it

	/* Now lets loop trough the stands object (if there is any) */		

	for (let s = 0; data["stands"][s] != null; s++){
						
		lengths.push(0);	// We add an item to the array lenghts on each iteration

		let daySchema = data["stands"][s]["weekSchema"][d];  

		// 'd' is an Int used as index to select the schema to be applied for this stand on this day of the week

		/*The result is an int, that is kept in the 'daySchema' variable, and it'll be used as index on data["schemas"][X]*/						

		let selSchema = data["schemas"][daySchema] 			//Select the schema to be applied
						
	/* Next we check if there are shift availables for that stand on this day, otherwise, the stand is unavailable */		

		if (selSchema.hasOwnProperty("shifts")) {

			standsCount[r] += 1; //Here we can increment the amount of stands available for this day

		}
						
	}	/* End of the first stands Loop
		 if there are no stands, then the local was closed and we gotta loopback to the do .. while
		to rewrite the whole day so its no empty day displayed*/

	if (standsCount[r] < 1) {	

		wasClosed = true;
	
	}
	else{												//We keep rendering the data for this day

		/* Loop trough all the stands list */

		for (let s = 0; data["stands"][s] != null; s++){	
					
			let daySchema = data["stands"][s]["weekSchema"][d]; 
			
			// 'd' is an Int used as index to select the schema to be applied for this stand on this day of the week

			/*The result is an int, that is kept in the 'daySchema' variable, and it'll be used as index on data["schemas"][X]*/	

			let selSchema = data["schemas"][daySchema] 			

			if (selSchema.hasOwnProperty("shifts")) {

				let standTitle = document.createElement('div');
				standTitle.innerHTML = data["stands"][s]["name"];
				standTitle.classList.add("stTitle");

				let newStand = document.createElement('div');
							
				let bgCol = data["stands"][s]["color"];

				let opTime =  selSchema["shifts"][0]["sTime"];

				let clTime = opTime + lengths[daySchema];

				let topOff =  opTime - earOpTime ;
				let botOff =  latClTime - clTime ;

				let topOffset = topOff / lengths[daySchema] ;
				let botOffset = botOff ;

				let standId = s + "_" + f + m + y;

				let opHour = msToTime(opTime);

				newStand.classList.add("card-body");	
				newStand.classList.add("stands");
							

	 			newStand.style.setProperty('--count', standsCount[r]);

	 			newStand.style.setProperty('--botOffset', botOffset);
	 			newStand.style.setProperty('--topOffset', topOffset);
	 			
	 			newStand.setAttribute("id",standId);
	 			newStand.setAttribute("data-opHour",opHour);

				let standContainer = document.createElement('div');			 //to place the title on top
				let standContainerFit = document.createElement('div');		 //another div, becouse .. something happened

				standContainer.classList.add("stCont");							/* with some more time lets re-check this part*/
				standContainer.style.setProperty('--count', standsCount[r]);
				standContainer.classList.add("h-100");
				standContainerFit.classList.add("stContFit");
				standContainerFit.classList.add("card-body");
				standContainerFit.style.setProperty('--count', standsCount[r]);
				standContainer.insertAdjacentElement("beforeend", standTitle);
							
				standContainer.insertAdjacentElement("beforeend", standContainerFit);

				anotherContainer.insertAdjacentElement("beforeend", standContainer);

				standContainerFit.insertAdjacentElement("beforeend", newStand);
							
				standContainerFit.style.setProperty('--botOffset', botOffset);
 				standContainerFit.style.setProperty('--topOffset', topOffset);
	 			standContainer.style.setProperty('--topOffset', topOffset);

				let n = 0; //shifts counter goes back to zero on every new stand

				for (let m = 0; m * tick < lengths[daySchema]; m++){ //this loops the whole shift in 'tick' intervals

					let shiftStartTime = selSchema["shifts"][n]["sTime"];

					let shiftLenght = selSchema["shifts"][n]["length"];
					
					let elaTime = m * tick;
					
					let tSinceOp = opTime + elaTime

					let currTime = msToTime(tSinceOp);

					var [hour, min] = currTime.split(':')

					now.setHours(hour);
					now.setMinutes(min);

					if (tSinceOp >= shiftStartTime + shiftLenght){
						n++	
					}


					let newTic = document.createElement('div');
					percent = 100 * tick / lengths[daySchema];
					percent += "%";

					if (selSchema["shifts"][n]["avail"]){

						newTic.classList.add("tics");
						newTic.style.setProperty('--bgColor', bgCol);
						newTic.setAttribute("title", tSinceOp)
						newTic.setAttribute("data-content", currTime);
						
						newTic.setAttribute("data-date", fullDate);
						newTic.setAttribute("data-stand", s);
						newTic.setAttribute("data-parentID", standId);
					
						newTic.innerHTML = "";
						newTic.setAttribute("data-bs-toggle", "modal");
		 				newTic.setAttribute("data-bs-target", "#staticBackdrop");
 				 				
		 				newTic.addEventListener('click', populateModal);
		 				newTic.addEventListener('mouseover', popOver);
		 				newTic.addEventListener('mouseout', popOver);


		 				//console.log(event.toISOString())





	 				}
	 				else {

	 				}

					newTic.style.height = percent;
					newStand.insertAdjacentElement("beforeend", newTic);
				}  /*End of 'ticks' for loop */

			}	/* End of if (has own property)*/

		}	/* End of 'stands' for loop */

		wasClosed = false;

	}	/*End of 'wasn't closed' else */

	from.setDate(from.getDate() + 1)


	sWrapper.insertAdjacentElement("beforeend", newSlide);

} while(wasClosed) //end of do ... while


} //end of for (r) loop

} //end of renderDays


function sched(){
	/*Handle the request and response to the main API
	The demo version, will store data on the data object*/
	
	let id = this.id;


}

function populateModal(){

	/*Populate the data on the modal when is opened 
	The fields to populate are 

	-Date	(this.dataset.date)
	-Stand	(get current day ID? maybe?)
	-Times availables (read from parent looping through set)
	-Tasks availables (read from data[this.dataset.stand])

	*/
	
	let parentID = this.dataset.parentid;
	let date = this.dataset.date;
	let stand = this.dataset.stand;
	let time = this.dataset.content;

	let parent = document.getElementById(parentID);

	let [parType, parDate] = parentID.split("_");

	let daySlideID = "id_" + parDate;

	let daySlide = document.getElementById(daySlideID);

	let standArray = daySlide.getElementsByClassName("stands");

	upDate(date, time);



	let standPH = document.getElementById("standPH");

	standPH.addEventListener('mouseover', toggleOp);
	standPH.addEventListener('mouseout', toggleOp);

	standPH.innerHTML = ""; //clear contents


	for (let i = 0; standArray[i] != null; i++){

		let newOp = document.createElement('li');
		newOp.setAttribute("value", i);
		newOp.setAttribute("data-task", i);

		let currStandId = standArray[i].getAttribute("id");

		let [type, date] = currStandId.split("_");

		type = parseInt(type);
		newOp.innerHTML = data["stands"][type]["name"];

		if(i == stand){
			newOp.classList.add("opSelected");
			changeTasks(i);
		}
		else{
			newOp.classList.add("opUnSel");
			newOp.classList.add("hideThis");
		}
		newOp.addEventListener("click", getStand);
		newOp.addEventListener("click", selectOp);
		standPH.insertAdjacentElement("beforeend",newOp);
	}


	popTime(parent);	


}



function getStand(){


	let stand = this.dataset.task;

	changeTasks(stand);
	
}


function selectOp(){

	let parent = this.parentNode;

	var children = parent.firstElementChild;

	/* loop through siblings , remove class opSelected, then set this to selected */
	
	do {
	
		if(children.classList.contains("opSelected")){
			children.classList.remove("opSelected");
		}
		children.classList.add("opUnSel");

	} while (children = children.nextElementSibling)
	
	/*Gotta make some conditional cases to call updates on the content if the clicked element is
		part of another dataset */

	switch (this.dataset.trigger){
		case 'time':
			let t = this.dataset.time;
			upDate(0, t);
			break;

	}

	
	
	this.classList.remove("opUnSel");
	this.classList.add("opSelected")

}

function upDate(date, time){

	/* It gotta work in both ways lets use the ids to check */

	let datePH = document.getElementById("datePH");

	if (date == 0){
		date = datePH.dataset.date;
	}
	if (time == 0){
		time = datePH.dataset.time;
	}
	
	datePH.innerHTML = date + " Hora: " + time;

	datePH.setAttribute("data-time", time);
	datePH.setAttribute("data-date", date);

	
}

function toggleOp() {

	let parent = this.parentNode;
	let opUnSel = parent.getElementsByClassName("opUnSel");
	for(let o = 0; opUnSel[o] != null; o++){
		opUnSel[o].classList.toggle("hideThis");
	}


}

function changeTasks(stand){

	/*
	We gotta trigger this every time the stand is selected moving it to another function
	and passing it the stand number as atribbute or something along those lines
*/

	let standPH = document.getElementById("standPH");

	let tasksPH = document.getElementById("tasksPH");

	tasksPH.addEventListener('mouseover', toggleOp);
	tasksPH.addEventListener('mouseout', toggleOp);



	tasksPH.innerHTML = ""; //clear contents

	let defaultOp = document.createElement('li');
	defaultOp.classList.add("opSelected");
	defaultOp.innerHTML = "Selecciona una especialidad"  //This shoul coome specified in the data set
	tasksPH.insertAdjacentElement("beforeend",defaultOp)
	// newOp.setAttribute("selected", "selected");

	for (let i = 0; data["tasks"][i] != null; i++){
		
		for(let j = 0; data["stands"][stand]["availTasks"][j] != null; j++)
		{

			if(data["stands"][stand]["availTasks"][j] == i){
			
				let newOp = document.createElement('li');
				newOp.innerHTML = data["tasks"][i]["name"];
				newOp.setAttribute("value", j);
				newOp.classList.add("opUnSel");
				newOp.classList.add("hideThis");
			
				/*Add also data tags with the time and price */
				
				newOp.addEventListener("click", selectOp);

				tasksPH.insertAdjacentElement("beforeend",newOp)
			
			}
		
		}
	}

	
	// let newTic = document.createElement('div');


}

function popTime(parent){

	let datePH = document.getElementById("datePH");

	let timePH = document.getElementById("timePH");
	
	let time = datePH.dataset.time;



	timePH.addEventListener('mouseover', toggleOp);
	timePH.addEventListener('mouseout', toggleOp);


	let tics = parent.getElementsByClassName("tics");

	timePH.innerHTML = "";

	for(t = 0; tics[t] != null; t++)
	{
		let currTic = tics[t].dataset.content;
		let newTime = document.createElement('li');
		newTime.innerHTML = currTic;
		if (time == currTic){
			newTime.classList.add("opSelected");
		}
		else{
			newTime.classList.add("opUnSel")
			newTime.classList.add("hideThis")
		}
		newTime.setAttribute("data-trigger", "time")
		newTime.setAttribute("data-time", currTic)
		timePH.insertAdjacentElement('beforeend', newTime);
		newTime.addEventListener("click", selectOp);
	}



}


function checkInput(){

	/* Check all the menu inputs and throw errors if necesary
	*/ 
	alert("checked")
}

function popOver(){

	/*Creates a small div next to the selected item with fixed position to display aditional data */

	let output = this.dataset.content;

	if (this.innerHTML != ""){
		this.innerHTML = ""
	}
	else {
		this.innerHTML = output;
		this.title = output;
	
	}
}

function getOffsets () {
	/* 
			next we loop through the set of shifts to check the earlier opening time,
						but it's only daily, so we gotta improve this to loop through all the week
						*/ 


							for (let l = 0 ; data["schemas"][l] != null ; l++)		
							{
								lengths.push(0);


								if (data["schemas"][l].hasOwnProperty("shifts")) {
									
									for(let q = 0; data["schemas"][l]["shifts"][q] != null; q++)
									{
										let opTime =  data["schemas"][l]["shifts"][0]["sTime"];
										let length =  data["schemas"][l]["shifts"][q]["length"];
										
										if (length[l] != 0){
											lengths[l] += length;
										}
										else {
											lengths[l] = length
										}

										let clTime = opTime + lengths[l];
										

				
										if(opTime < earOpTime || earOpTime === 0){
												earOpTime = opTime;
											}
										if(clTime > latClTime || latClTime === 0){
												latClTime = clTime;
											}
									}
								}	
							
							}
}

/*Schedule object constructor*/

function Schedule(date, stands){
	this[date] = stands;
}

function msToTime(mili){
	let tString = "";
	mili /= 1000;
	let hours = parseInt(mili / 360);
	let mins = ((mili - (hours * 360)) / 360) * 60;
	if (mins < 10) {
		tString = " " + hours + ":0" + mins;
	}
	else {
		tString = " " + hours + ":" + mins;
	}
	return(tString);

}