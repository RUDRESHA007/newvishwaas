const msg=document.querySelector('.msg')
const thanks=document.querySelector('.thanks-container')
const open=document.querySelector('.toggle-bar1')
const close=document.querySelector('.toggle-bar2')
const navbar=document.querySelector('.nav-tabs')


open.addEventListener('click',
()=>{
    open.style.display='none'
    close.style.display='block'
    navbar.style.top='5.2rem'
    console.log('open');
})

close.addEventListener('click',
()=>{
    close.style.display='none'
    open.style.display='block'
    console.log('close');
    navbar.style.top='-18.2rem'

})






// slider

var index = 0;
var slides = document.querySelectorAll(".slides");
var dot = document.querySelectorAll(".dot");

function changeSlide() {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index > slides.length - 1) {
        index = 0;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        // dot[i].classList.remove("active");
    }

    slides[index].style.display = "block";
    // dot[index].classList.add("active");

    index++;

    setTimeout(changeSlide, 4000);

}
changeSlide();