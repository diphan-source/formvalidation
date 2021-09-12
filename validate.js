let form = document.forms['contact']
let Uname = document.forms['contact']['name']
let emailEl = document.forms['contact']['email']
let ageEl = document.forms['contact']['age']
let tele = document.forms['contact']['tel']
let passwordEl = document.forms['contact']['password']
let confirmPasswordEl = document.forms['contact']['password2']



const checkUsername = () => {
    let valid = false;
    const username = Uname.value.trim();

    if (!isRequired(username)) {
        showError(Uname, 'Username cannot be blank.');
    } else {
        showSuccess(Uname);
        valid = true;
    }
    return valid;
};

const checktel = ()=>{
    let valid = false;
    const telephone = tele.value.trim();

    if(!isRequired(telephone)){
        showError(tele, "telephone is required");
    }else if(!isValidTel(telephone)){
        showError(tele,"Telephone should be valid");
    }else{
        showSuccess(tele);
        valid = true;
    }

    return valid;
};

const checkAge = () => {
    let valid =  false
    const age = ageEl.value.trim()
    if(!isRequired(age)) {
        showError(ageEl, 'Age field cannot be blank')
    } else if(!isValidAge(age)) {
        showError(ageEl, 'Age can only be a number')
    }else{
        showSuccess(age);
        valid = true;
    }
    return valid;
}


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password should have at least one numeric digit &uppercase &lowercase letter');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isValidTel = (telephone) =>{
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/ ;
    return re.test(telephone);
};

const isEmailValid = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
};

const isValidAge = (age) => {
    const re = /^[0-9]*$/;
    return re.test(age)
}

const isRequired = value => value === '' ? false : true;




const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();


    // validate forms
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isTelValid = checktel();

    let isFormValid = isUsernameValid 

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
// 
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'telephone':
            checktel();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));