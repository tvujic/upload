const scrollButtons= document.querySelectorAll('.scrollButton');
const scrollButtonsBox=document.getElementById('scrollButtonsBox');
const mainPageImage=document.getElementById('picture0');
const mainPageImages=['/pictures/homepage-images/image0.jpg','/pictures/homepage-images/image1.jpg','/pictures/homepage-images/image2.jpg','/pictures/homepage-images/image3.jpg'];
let i=0;

const arrayText1=['CREATE AND PREVIEW YOUR WALLET', 'SHOP PRODUCTS', 'MEET THE MAKER', 'CONTACT US'];
const arrayText2=['EXPLORE OUR 3D CUSTOMIZATION.', 'TAKE A LOOK AT OUR CATALOGUE','ABOUT ME','FEEL FREE TO REACH OUT'];
const arrayButtonText=['START CRAFTING', 'VISIT STORE', 'GO TO PAGE', 'SEND A MESSAGE'];
const buttonHref=['customazationPage.html', 'shop.html', 'meetTheMaker.html', 'contact.html'];
const text1Box=document.getElementById('text1');
const text2Box=document.getElementById('text2');
const buttonText=document.getElementById('button2');
scrollButtons.forEach((scrollButton) =>{
scrollButton.index=i;
scrollButton.addEventListener("click", function() { changeMainPagePicture(scrollButton); });
i++;
});
i=0;

const nextImageButton=document.getElementById("nextImageArrow");
const previousImageButton=document.getElementById("previousImageArrow");

nextImageButton.addEventListener("click", function() { nextMainPageImage(); });
previousImageButton.addEventListener("click", function() { previousMainPageImage(); });

function changeMainPagePicture(pressedButton){
    scrollButtons[i].classList.remove('fa-solid');
    scrollButtons[i].classList.add('fa-regular');
    i=pressedButton.index;
    text1Box.innerHTML=arrayText1[i];
    text2Box.innerHTML=arrayText2[i];
    buttonText.innerHTML=arrayButtonText[i];
    buttonText.href=buttonHref[i];
    mainPageImage.src=mainPageImages[i];
    scrollButtons[i].classList.add('fa-solid');
    scrollButtons[i].classList.remove('fa-regular');

}

function nextMainPageImage(){
    scrollButtons[i].classList.remove('fa-solid');
    scrollButtons[i].classList.add('fa-regular');
    if (i==3){ 
        i=0;
    }
    else{
        i++;
    }
    scrollButtons[i].classList.remove('fa-regular');
    scrollButtons[i].classList.add('fa-solid');
    mainPageImage.src=mainPageImages[i];
    text1Box.innerHTML=arrayText1[i];
    text2Box.innerHTML=arrayText2[i];
    buttonText.innerHTML=arrayButtonText[i];
    buttonText.href=buttonHref[i];
    

}


function previousMainPageImage(){
    scrollButtons[i].classList.remove('fa-solid');
    scrollButtons[i].classList.add('fa-regular');
    if (i==0){
        i=3;
    }
    else{
        i--;
    }
    scrollButtons[i].classList.remove('fa-regular');
    scrollButtons[i].classList.add('fa-solid');
    mainPageImage.src=mainPageImages[i];
    text1Box.innerHTML=arrayText1[i];
    text2Box.innerHTML=arrayText2[i];
    buttonText.innerHTML=arrayButtonText[i];
    buttonText.href=buttonHref[i];
    
}