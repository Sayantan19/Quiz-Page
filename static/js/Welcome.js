let tname = document.getElementsById('exampleFormControlInput1').value;
console.log(tname);
let lphone = document.getElementsById('exampleFormControlInput2').value;
console.log(lphone);

function myFunction() {

    if (tname.length == 0 || lphone.length == 0)
        alert("Please fill out the necessary details!!!");
    else
        window.location.assign('/rule');
}