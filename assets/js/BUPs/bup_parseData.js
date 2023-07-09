/* Description: Parses the data stored in the varible 'data' (embeded by EJS on rendering) to build the HMTL DOM */
/* If i could add a loading gif on that block, it would be great */



let admBtn = document.getElementById('admBtn');

admBtn.addEventListener('click', admin);

let testNow = new Date();


renderDays(testNow,15);



sWrapper = document.getElementById('sWrapper');

function renderDays(from, amount = 15)

{


let days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'];


let standsCount = [];

let earOpTime = [];
let latClTime = [];

 

for (let r = 0 ; r < amount; r++){								//Repeats the cycle 'amount' times								

	let newSlide = document.createElement('div');				//Creates a new slide and add classees				
	newSlide.classList.add("swiper-slide");
	standsCount[r] = 0;

	earOpTime.push(0);
	latClTime.push(0);




do {





	let now = new Date(from);
	let d = now.getDay();
	let m = now.getMonth();
	let n = now.getDate();
	let y = now.getFullYear();

	//here we can create a loop to re-write this div data if there are no shifts available 
	//so the program will only display days THAT contain data. 

	let tempId = "id_" + d + m + y;

		let newDay = document.createElement('div');				//Creates a container DIV

		newDay.classList.add("card");
		newDay.classList.add("h-100");

		newSlide.insertAdjacentElement("afterbegin", newDay);	//Inserts in the container

		newDay.setAttribute("id", tempId);


	
			let newTitle = document.createElement('div');		//Creates the container for the title

			newTitle.classList.add("card-body");

			newDay.insertAdjacentElement("afterbegin", newTitle);		//inserts it

	
				let newTitleText = document.createElement('p');				//Creates de p tag for title, and assigns class
				newTitleText.classList.add("testimonial-author");


				newTitleText.innerText = days[d] + " " + n + " " + months[m] ;
				
				newTitle.insertAdjacentElement("afterbegin", newTitleText);				//NOW THAT WE SETTED THE TITLE LETS LIST THE SHFTS


				// renderStands(tempId);
				
			let anotherContainer = document.createElement('div');				//Creates a container DIV

			anotherContainer.classList.add("rowCont");
			anotherContainer.classList.add("h-100");
			newDay.insertAdjacentElement("beforeend", anotherContainer);

			let lengths = [];

				for (let s = 0; data["stands"][s] != null; s++)
					{
						
						lengths.push(0);


						let daySchema = data["stands"][s]["weekSchema"][d];  //Int to be used as index to select the schema

						/* THe day of the week is stored in the -------> d <-------- variable NOT in ___ r__ ok? */						


						let selSchema = data["schemas"][daySchema] 			//Select the schema to be applied
						
					
						if (selSchema.hasOwnProperty("shifts")) {			//check if there are shift availables	



							for (let l = 0 ; selSchema["shifts"][l] != null ; l++)
							{
								let opTime =  selSchema["shifts"][l]["sTime"];
								let length = selSchema["shifts"][l]["length"];
								let clTime = opTime + lengths[s];
								lengths[s] = lengths[s] + length;

								let log = "length = " + length + "lengths[s] = " + lengths[s];

								//console.log(log);

								if(opTime < earOpTime[r] || earOpTime[r] === 0){
									earOpTime[r] = opTime;
								}
								if(clTime > latClTime[r] || latClTime[r] === 0){
									latClTime[r] = clTime;
								}	
							}
							standsCount[r] += 1;

						}
						
						
						
					}

					if (standsCount[r] < 1) {

							wasClosed = true;
							console.log (tempId);
						}
					
					else{


					for (let s = 0; data["stands"][s] != null; s++)
					{	
					
						let daySchema = data["stands"][s]["weekSchema"][d];  //Int to be used as index to select the schema

						/* THe day of the week is stored in the -------> d <-------- variable NOT in ___ r__ ok? */						


						let selSchema = data["schemas"][daySchema] 			//Select the schema to be applied
						
					
						if (selSchema.hasOwnProperty("shifts")) {

							let newStand = document.createElement('div');
							let bgCol = data["stands"][s]["color"];


							let opTime =  selSchema["shifts"][0]["sTime"];
							let clTime = opTime + lengths[s];

							let log = "optime = " + opTime + "     " + "clTime =  " + clTime;
							//console.log(log);

							log = "earOpTime = " + earOpTime[r] + "     " + "latClTime =  " + latClTime[r];
							//console.log(log);

							let topOff =  opTime - earOpTime[r] ;
							let botOff =  latClTime[r] - clTime ;

							let topOffset = topOff / lengths[s] ;
							let botOffset = botOff / lengths[s] ;

							log = "topOffset = " + topOffset + "     " + "botOffset =  " + botOffset;
							console.log(log);

							newStand.classList.add("card-body");	
							newStand.classList.add("stands");
							newStand.setAttribute("data-bs-toggle", "modal");
 				 			newStand.setAttribute("data-bs-target", "#staticBackdrop");
 				 			newStand.setAttribute("id", "test");
 				 			newStand.style.setProperty('--count', standsCount[r]);
 				 			newStand.style.setProperty('--bgColor', bgCol);
 				 			newStand.style.setProperty('--botOffset', botOffset);
 				 			newStand.style.setProperty('--topOffset', topOffset);
							newStand.addEventListener('click', sched);	//make a percent outta it
						
							anotherContainer.insertAdjacentElement("beforeend", newStand);

							for (let m = 0; m * 5000 < lengths[s]; m++){
								
							}

						}

					}





						
						wasClosed = false;
					}

				from.setDate(from.getDate() + 1)
/*

			let totTime = data[days[r]].tTime;									//get the total time

			let shifts = [];

			let currDay = data[days[r]];

			 for (let shift in currDay.shifts) { 

    		 if (currDay.shifts.hasOwnProperty(shift)){
    		 	

    		 	shifts.push(shift);


				}
 			}


			for (let s = 0; shifts[s] != null ; s++) {

				

				let newShift = document.createElement('div');

				newShift.classList.add("card-body");
				newShift.classList.add("shifts");
*/
				/*Need to calculate the height based on newDay's */
/*
 			 	let currShift = currDay["shifts"][shifts[s]];

 			 	let ava = currShift.avail;

 			 	if (ava){

 			 		let tempId = days[r] + "_" + shifts[s];
 			 		newShift.classList.add("available");
 			 		newShift.setAttribute("data-bs-toggle", "modal");
 			 		newShift.setAttribute("data-bs-target", "#staticBackdrop");
 			 		newShift.setAttribute("id", tempId);

 			 		newShift.addEventListener('click', sched);
 			 		//data-bs-target="#staticBackdrop"
 			 		//Add event listener!!


 			 	}
 			 	else{
 			 		newShift.classList.add("unavailable");
 			 	}

 			 	// console.log(currShift.tTime);

 				
														//Using the current shift
				let sTime =  currShift.tTime;			//Get the current shift time
				// console.log(sTime);

				let prop = sTime / totTime;				//Finda a roportion

				newShift.style.height = 100 * prop + "%"; 	//make a percent outta it

				newDay.insertAdjacentElement("beforeend", newShift);



				let blocks = [];

				for (let block in currShift.blocks) {
					if (currShift.blocks.hasOwnProperty(block)) blocks.push(block);
 				}


 				for (let b = 0; blocks[b] != null ; b++) {

 					let currBlock = currShift["blocks"][blocks[b]];
 					
 					let newBlock = document.createElement('div');

				newBlock.classList.add("card-body");
				newBlock.classList.add("blocks");
*/
				/*Need to calculate the height based on newShifts's */
/*

 			 	newBlock.classList.add("unavailable");
 			 	

														//Using the current shift
				let bTime =  currBlock.eTime - currBlock.sTime;			//Get the current shift time
				

				let propb = bTime / sTime;				//Finda a roportion

				newBlock.style.height = 100 * propb + "%"; 	//make a percent outta it

				newShift.insertAdjacentElement("beforeend", newBlock);
 				
 				}


			}
	*/

	sWrapper.insertAdjacentElement("beforeend", newSlide);

} while(wasClosed) //end of while


} //end of for (r) loop

} //end of renderDays


/*
function renderStands(dayId){

	console.log(dayId);
	let day = document.getElementById(dayId)
	console.log(day);
	for (let s = 0; data["stands"][s] != null; s++)
	{
		let newStand = document.createElement('div');

				newStand.classList.add("card-body");
				newStand.classList.add("shifts");
				newStand.setAttribute("data-bs-toggle", "modal");
 			 	newStand.setAttribute("data-bs-target", "#staticBackdrop");
 			 	newStand.setAttribute("id", "test");
				newStand.addEventListener('click', sched);
				newStand.style.height = "100%"; 	//make a percent outta it

				day.insertAdjacentElement("beforeend", newStand);

	}

}

*/










function sched(){

let id = this.id;
let pHolder = document.getElementById("modUserDay");
let modUser = document.getElementById('modUser');
let modAdmin = document.getElementById('modAdmin');


if (modUser.classList.contains("hideThis")){
modAdmin.classList.add("hideThis");
modUser.classList.remove("hideThis")
}


//May process it or not 

pHolder.innerText = id;



}

function admin(){

let modUser = document.getElementById('modUser');
let modAdmin = document.getElementById('modAdmin');

if (modAdmin.classList.contains("hideThis")){
modAdmin.classList.remove("hideThis");
modUser.classList.add("hideThis")
}


}

/* Navigation*/


/* Generate menu and addeventlistener */

var admTabs = document.getElementById('admTab');

tabList = admTabs.getElementsByTagName("li");

for (let i=0; tabList[i] != null; i++) {
	tabList[i].firstElementChild.addEventListener('click', toggleTabs);
}

function toggleTabs(){

	let id = this.id;
	let targetId = id.split('-')
	let target = document.getElementById(targetId[0]);
	let tabContents = document.getElementById('admTabContent');
	let tabContentsList = tabContents.getElementsByClassName('tab-pane');



	for (let i=0; tabContentsList[i] != null; i++) {

		if(tabContentsList[i].classList.contains('active')){
		tabContentsList[i].classList.remove('active')
	}

		if(tabContentsList[i].classList.contains('show')){
		tabContentsList[i].classList.remove('show')
	}

	}

	target.classList.add('active')
	target.classList.add('show')
	

	for (let i=0; tabList[i] != null; i++) {

	if(tabList[i].firstElementChild.classList.contains('active')){
		tabList[i].firstElementChild.classList.remove('active')
	};




}
	this.classList.add('active');
}