/* Description: Parses the data stored in the varible 'data' (embeded by EJS on rendering) to build the HMTL DOM */
/* If i could add a loading gif on that block, it would be great */

var tick = 5000; 								//Milliseconds <- this is wrong also gotta fix this 



let earOpTime = 0;								//Set by the getOffset function as the earlier opening time
let latClTime = 0;								//Set by the getOffset function as the later closing time
let lengths = [];								//Set by the getOffset function as the lenght of each shift (maybe we can add a longer?)
 


getOffsets();									//Gets the offsets used later in rendering the divs <----- NEEDS TO BE FIXED


let testNow = new Date();


renderDays(testNow,15);

/* this array is going to have the same format as the schedule */ 

let schedArray = []; 

/*Schedule object constructor*/

function Schedule(date, stands){
	this[date] = stands;
}


sWrapper = document.getElementById('sWrapper');

function renderDays(from, amount = 15)

{


/*Days and months tags should come in the "DATA[CONFIG]" */


let days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'];


let standsCount = [];

/*Lets loop the given amount of times to create the divs for eah day to be displayed */



for (let r = 0 ; r < amount; r++){								//Repeats the cycle 'amount' times		<- r is the magic number						

	let newSlide = document.createElement('div');				//Creates a new slide and add classees				
	newSlide.classList.add("swiper-slide");

	standsCount[r] = 0;											//Stands counter



/* this do .. while loop is opened to rewrite the placeholder if there is 
no data available for this day (so empty days are not displayed)
usefull mostly for sundays or holydays */



do {


	let newDay = document.createElement('div');				//Creates a container DIV

	newDay.classList.add("card");
	newDay.classList.add("h-100");

	newSlide.insertAdjacentElement("afterbegin", newDay);	//Inserts in the container

	let now = new Date(from);			// Stores the current date (augments one day on each iteration)
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

	newTitleText.innerText = days[d] + " " + f + " " + months[m] ; 
				
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

				newStand.classList.add("card-body");	
				newStand.classList.add("stands");
							

	 			newStand.style.setProperty('--count', standsCount[r]);

	 			newStand.style.setProperty('--botOffset', botOffset);
	 			newStand.style.setProperty('--topOffset', topOffset);

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
						newTic.setAttribute("data-content", tSinceOp);
						newTic.innerHTML = "";
						newTic.setAttribute("data-bs-toggle", "modal");
		 				newTic.setAttribute("data-bs-target", "#staticBackdrop");
 				 				
		 				newTic.addEventListener('click', sched);
		 				newTic.addEventListener('mouseover', popOver);
		 				newTic.addEventListener('mouseout', popOver);

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

let id = this.id;
let pHolder = document.getElementById("modUserDay");
let modUser = document.getElementById('modUser');
let modAdmin = document.getElementById('modAdmin');


if (modUser.classList.contains("hideThis")){
modAdmin.classList.add("hideThis");
modUser.classList.remove("hideThis")
}



pHolder.innerText = id;

}



function popOver(){

let content = parseInt(this.dataset.content);
content /= 1000
let hours = parseInt(content / 60);
let mins = ((content - (hours * 60)) / 60) * 60;
let output;
if (mins < 10) {
output = " " + hours + ":0" + mins;
}
else {
output = " " + hours + ":" + mins;
}

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
										

										let log = "length = " + length + " q = " + q + "  lengths[l] = " + lengths[l] + " l = " + l;

										console.log(log);

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