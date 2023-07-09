
addTransClick();



function addTransClick(elem){

let trigs = document.getElementsByClassName("transTrigger")
let i=0;
	while( trigs[i] != null)
	{

		trigs[i].addEventListener("click", trans);
		i++;
	}
}

let transT, transS;


/* We gotta rewrite this, so if last click was the same element than the current we take things back to how they were 
	instead of taking it back to the main windows ok?


*/



function trans(){
	let t = this.dataset.target;
	let targets = document.getElementsByClassName("transTarget");
	let target = document.getElementById(t);
	let main = document.getElementById("header");

	switch (this.dataset.trigger){
	case "demo":
		demoTogg();
		break;
	case "demoSelect":
		demoSelect(this.dataset.id);
		break;
	case "back":
		backAndRestore();
		break;
	}


	if( target.style.display != 'none'){
		transS = main
	}
	else {
		transS= target;
	}

	for(q = 0; targets[q] != null; q++){
		if( targets[q].style.display != 'none'){

			targets[q].classList.add("vanish")
			transT = targets[q];
			}else{
			targets[q].style="display:none;";
			}
		
	}
	

	
	setTimeout(stepOne, 550)
}

function stepOne(){

	transT.style="display:none;";
	transT.classList.remove("vanish");
	transS.style="display:flex;";
	transS.classList.add("appear");
	
	setTimeout(stepTwo, 550)
	
}
function stepTwo(){

	transS.classList.remove("appear");
	
}


let mainHead;

let cDown = document.getElementById("countdown");


function demoSelect(id){

	/*
	
	ORIGINAL APPROACH: Call ajax data request on server using ID
		
		On response -> parseData (renderDays)

	  change the demo (now "atras") button trigger
	  to run function "cancel" before returning to its original state
	
	NEW APPROACH: LOAD DATA SAMPLE (N)


	*/
	document.getElementById("demoBtn").setAttribute("data-trigger", "back"); //So the demo btn now is a "back" btn

	getData();
}

function backAndRestore(){

	document.getElementById("demoBtn").setAttribute("data-trigger", "demo");

}




function demoTogg(){
	let demoCont = document.getElementsByClassName("ribbonCont");
	let h1 = demoCont[0].getElementsByTagName("h1");

	if (h1[0].innerHTML != "Atrás"){
		demoCont[0].style = "top:-100px";
		h1[0].innerHTML ="Atrás"
		h1[0].style ="margin-top: -50%"
	}
	else{
		demoCont[0].style = "top:-20px";
		h1[0].innerHTML ="Ver <br> demo"
		h1[0].style ="margin-top: -90%"

	}
}

function loadPref(){
/*
	mainHead = document.getElementById("header");
	mainRepl = document.getElementById("mainRepl");
    let loading = document.getElementById("loading");
    loading.style = "display:none;";
    mainHead.style = "display:flex;";
*/




var checkReplace = document.querySelector('.replace-me');

if (checkReplace !== null) { 
	var replace = new ReplaceMe(document.querySelector('.replace-me'), {
		animation: 'animated fadeIn',                       // Animation class or classes
		speed: 2000,                                        // Delay between each phrase in miliseconds
		separator: ',',                                     // Phrases separator
		hoverStop: false,                                   // Stop rotator on phrase hover
		clickChange: false,                                 // Change phrase on click
		loopCount: 'infinite',                              // Loop Count - 'infinite' or number
		autoRun: true,                                      // Run rotator automatically
		onInit: false,                                      // Function
		onChange: false,                                    // Function
		onComplete: false                                   // Function
	});
}

var checkReplace2 = document.querySelector('.replace-me2');

if (checkReplace2 !== null) {

	var replace2 = new ReplaceMe(document.querySelector('.replace-me2'), {
		animation: 'animated fadeInLeft',                       // Animation class or classes
		speed: 2000,                                        // Delay between each phrase in miliseconds
		separator: ',',                                     // Phrases separator
		hoverStop: false,                                   // Stop rotator on phrase hover
		clickChange: false,                                 // Change phrase on click
		loopCount: 'infinite',                              // Loop Count - 'infinite' or number
		autoRun: true,                                      // Run rotator automatically
		onInit: false,                                      // Function
		onChange: false,                                    // Function
		onComplete: false                                   // Function
	});


}
          

}






let apiUrl="http://192.168.1.31:3000/demo/"


async function getData(){

	const response = await fetch(apiUrl);
	data = await response.json();
	gotData();


}


function gotData(){

	let body = document.getElementsByTagName("body");
	let newScript = document.createElement("script");
	newScript.setAttribute("src", "assets/js/parseData.js");
	body[0].insertAdjacentElement('beforeend', newScript);


	setTimeout(runStuff, 3000);

	/*Move progress bar */

	alert(JSON.stringify(data))
}

function runStuff(){
		
	let testNow = new Date();
	renderDays(testNow,15);
}