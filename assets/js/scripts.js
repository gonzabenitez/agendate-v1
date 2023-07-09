
var modalSlider;
var cardSlider;
function startSliders() {

	/* Card Slider - Swiper */
	cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 999999999,
		disableOnInteraction: true
	},
	loop: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 3,
	spaceBetween: 20,
	breakpoints: {
		// when window is <= 767px
		767: {
			slidesPerView: 1
		},
		// when window is <= 991px
		991: {
			slidesPerView: 2,
			spaceBetween: 10
		}
	}
});

	modalSlider = new Swiper('.mod-slider', {
	grabCursor: false,
	allowTouchMove: false,
	noSwipingClass: 'noswipe',
	loop: false,
	navigation: {
		nextEl: '.mod-button-next',
		prevEl: '.mod-button-prev'
	},
	slidesPerView: 1,
	spaceBetween: 0,

});

modalSlider.update();

}

let questions = document.getElementsByClassName("question");
for (let q = 0; questions[q] != null ; q++){
	questions[q].addEventListener("click", answer);
} 

function answer(){
	
	let answerPH = document.getElementById("answerPH");
	let [q, id] = this.id.split("_")
	let targetID = "a_" + id;
	let questions = document.getElementsByClassName("question");
	for (let q = 0; questions[q] != null ; q++){
		if (questions[q].classList.contains("opSelected")){
			questions[q].classList.remove("opSelected");
		};
		questions[q].firstElementChild.innerHTML = "+"
	} 
	if (answerPH.innerHTML == document.getElementById(targetID).innerHTML){
		answerPH.innerHTML = "";

	}
	else{
		answerPH.innerHTML = document.getElementById(targetID).innerHTML;
		this.firstElementChild.innerHTML = "-"
	}

}