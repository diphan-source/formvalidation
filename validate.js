
const form = document.querySelector('.form');
let username = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let age = document.getElementById('age');
const btn = document.querySelector('.submit');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    //create a method to check
     checkInputs();
     
});


function checkInputs(){
    var nameValue = username.value.trim();
    var emailValue = email.value.trim();
    var ageValue = age.value.trim();
    var passwordValue = password.value.trim();
    var password2Value = password2.value.trim();

    //check the name

    if(nameValue == ""){
       
        setError(username ,"Name is required");

    }else{
        setSuccess(username);
        
    }

    // check the email

    if(emailValue == ""){
        setError(email,"Please Enter Your Email");
    }else if(!isEmail(email)){
            setError(email,"Enter a Valid Email");
        }else {
            setSuccess(email);
        }
    

        //check for the age
        if(ageValue == "" ){
            setError(ageValue,"Age is required");
        }else if(!ageCheck(ageValue) && ageValue > 10 && ageValue < 35 ){
            setError(ageValue,"age should be number 0 to 100");
        }else{
            setSuccess(ageValue);
        }
           
        
    //check the password
    if(passwordValue == ''){
        setError(password,"Password required ");
    }else if(!isValidPassword(password)){
        setError(password,"Password should have at least one numeric digit &uppercase &lowercase letter");
    }else{
        setSuccess(password);
    }

     //rechecking the password
    if(password2Value == ""){
        setError(password2,"confirm Your password please");
    }else if(password2Value !== passwordValue){
        setError(password2,"Password2 doesnt much password1");
    }else{
        setSuccess(password2);
    }
}

 function setError(input,message){

    let parent = input.parentElement;
    let messageUI= parent.querySelector(".error");
    console.log(messageUI);
    messageUI.style.visibility = "visible";
    messageUI.innerText = message;
     setTimeout(()=>{
        messageUI.style.visibility = "hidden";
    },2000);
    
}

function setSuccess(input){
   
    var parent = input.parentElement;
    var messageUI = parent.querySelector(".error");
     messageUI.style.visibility = "hidden";
     parent.classList.add("success");
     setTimeout(()=>{
         parent.classList.remove("success");
     },1000)
}

function isEmail(email){
    
    return /^\S+@\S+\.\S+$/.test(email);
    
}

function ageCheck(ageValue){

   return  /^[0-9]*$/.test(ageValue);

}

function isValidPassword(password){
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
}