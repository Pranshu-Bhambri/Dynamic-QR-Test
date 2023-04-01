btn= document.getElementById("btn");
welcomeScreen= document.querySelector(".welcome-screen");
setupScreen= document.querySelector(".setup-screen");
randomCode= document.getElementById("random-code");

let qrcode= new QRCode(document.getElementById("qrcode"));

let toReset= document.querySelector(".to-reset");

myForm= document.querySelector("#myForm");

// console.log(versions.node());

// function Submit(e){
//     e.preventDefault();
//     console.log("submitted !");
// }

myForm.addEventListener('submit', function(e){

    // setTimeout(() => {
    //     e.preventDefault();
    // }, 1000);

    let form = e.target;
    e.preventDefault();
    form.submit();
    console.log("Prevented");
});

btn.addEventListener("click", () => {

    welcomeScreen.style.display= "none";
    setupScreen.style.display= "flex";

    randomCode.value= Math.floor((Math.random() * 1000000) + 1);

    generateQR();

    // myForm.submit();

    // document.forms["myForm"].submit(function(event){
    //     event.preventDefault(); 
    // });
});

//reloads a fresh QR code after clicking
toReset.addEventListener("click", () => {

    toReset.style.display= "none";

    randomCode.value= Math.floor((Math.random() * 1000000) + 1);

    generateQR();

})

function generateQR(){
    let data= randomCode.value;
    qrcode.makeCode(data);

    // myForm.submit();

    //Asks to reload a fresh QR code after a speciefied time
    setTimeout(() => {

        let qrImg = document.getElementById("qrcode").childNodes[4];
        qrImg.style.display="none";
        // document.getElementById("qrcode").style.pointerEvents= "none";
    
        toReset.style.display= "flex";

        console.log("Interval");
    
    }, 10000);

}

// generateQR();
