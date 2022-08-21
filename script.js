const form = document.querySelector('#form'),
    username = document.querySelector('#username'),
    email = document.querySelector('#email'),
    password = document.querySelector('#password'),
    password2 = document.querySelector('#password2');

//Add funtion show error
function showError(input, massege) {
    const form__control = input.parentElement;
    
    form__control.className = 'form-control error';
    const small = form__control.querySelector('small');
    small.innerText = massege;
}

//Add function show success
function showSuccess(input) {
    const form__control = input.parentElement;
    form__control.className = 'form-control success';
}

//Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `${getFieldName(input)} is not valid`);
    }
}

//Check required fields
function checkRequired(input__arr) {
    input__arr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//Trim function
function checkTrim(input__arr) {
    input__arr.forEach(input => {
        const trim__value = input.value.trim();
        input.value = trim__value;
    });
}

//Check input  length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

//Check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `${getFieldName(input2)} do not match`);
    } else if(input1.value !== '' && input2.value !=='' && input1.value == input2.value) {
        showSuccess(input1);
        showSuccess(input2);
    }
}

//Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkTrim([username, email, password, password2]);
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 16);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});