import {el, mount} from "redom";

export class RegistrationForm {
    #dom;
    #header;
    #emailInput;
    #passwordInput;
    #repeatPasswordInput;
    #btn;

    #emailValidState;
    #emailValidContainer;

    #passwordValidState;
    #passwordValidContainer;

    #repeatPasswordValidState;
    #repeatPasswordValidContainer;

    constructor(){
        this.#dom = el("div#container", "RegistrationForm");
        this.#header = el("h2#header", "Create account");
        this.#emailInput = el("input#emailInput");
        this.#emailValidContainer = el("div.validationInfo", this.#emailValidState);
        this.#passwordInput = el("input#passwordInput");
        this.#passwordValidContainer = el("div.validationInfo", this.#passwordValidState);
        this.#repeatPasswordInput = el("input#repeatPasswordInput");
        this.#repeatPasswordValidContainer = el("div.validationInfo", this.#repeatPasswordValidState);
        this.#btn = el("button#createAccount", {disabled: true}, "Create account");

        mount(this.#dom, this.#header);
        mount(this.#dom, this.#emailInput);
        mount(this.#dom, this.#emailValidContainer)
        mount(this.#dom, this.#passwordInput);
        mount(this.#dom, this.#passwordValidContainer)
        mount(this.#dom, this.#repeatPasswordInput);
        mount(this.#dom, this.#repeatPasswordValidContainer)
        mount(this.#dom, this.#btn);

        this.#btn.addEventListener('click', this.createAccount);
        this.#emailInput.addEventListener('keyup', this.checkEmailValidation);
        this.#passwordInput.addEventListener('keyup', this.checkPassword);
        this.#repeatPasswordInput.addEventListener('keyup', this.checkRepeatPass);
        this.#dom.addEventListener('keyup', this.toAbleBtn);

    }

    get dom () {
        return this.#dom;
    }

    get emailState(){
        return this.#emailValidState;
    }
    set emailState(state){
        return this.#emailValidState = state;
    }

    get passwordState(){
        return this.#passwordValidState;
    }
    set passwordState(state){
        return this.#passwordValidState = state;
    }

    get repeatPasswordState(){
        return this.#repeatPasswordValidState;
    }
    set repeatPasswordState(state){
        return this.#repeatPasswordValidState = state;
    }

    get emailInput () {
        return this.#emailInput;
    }
    get passwordInput () {
        return this.#passwordInput;
    }

    get emailValue() {
        return this.#emailInput.value;
    }
    set emailValue (em) {
        this.#emailInput.value = em;
    }

    get passwordValue() {
        return this.#passwordInput.value;
    }
    set passwordValue (pas) {
        this.#passwordInput.value = pas;
    }

    get repeatPasswordValue() {
        return this.#repeatPasswordInput.value;
    }
    set repeatPasswordValue (pas) {
        this.#repeatPasswordInput.value = pas;
    }

    createAccount(){
        this.user = {
            email: this.emailValue,
            password: this.passwordValue,
        }
        alert(`User with email ${this.user.email} is successfully created`);
        this.emailValue = "";
        this.passwordValue = "";
        this.repeatPasswordValue = "";
    }

    checkEmailValidation() {
       let emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(emailRegExp.test(this.emailValue)){
           this.emailState = 'Your email is valid';
           return true;
       } else {
          this.emailState = 'Your email is not valid';
          return false;
       }
    }

    checkPassword(){
        let answer = "";
        if(this.passwordValue.length < 8) {
            answer += "Your password should not be less, than 8 symbols. </br>";
        }
        let checkNumber = /\d/;
        if(!checkNumber.test(this.passwordValue)) {
            answer = answer +  ' Your password should contain a number. </br>'
        }
        let checkLowerCase = /[a-z]/;
        if(!checkLowerCase.test(this.passwordValue)){
            answer = answer +  ' Your password should contain english symbol lowercase. </br>'
        }

        let checkUpperCase = /[A-Z]/;
        if(!checkUpperCase.test(this.passwordValue)){
            answer = answer +  ' Your password should contain english symbol uppercase. </br>'
        }

        let specialSymb = /[!@#$%^&*]/;
        if(!specialSymb.test(this.passwordValue)){
            answer = answer +  ' Your password should contain special symbol. </br>'
        }

        if(answer.length < 2) {
            answer = 'Your password is acceptable';
            this.passwordState = answer;
            return true;
        } else {
            this.passwordState = answer;
            return false;
        }
    }

    checkRepeatPass() {
        if(this.passwordValue!== this.repeatPasswordValue){
            this.repeatPasswordState = 'Passwords do not match';
            return false;
        } else {
            return true;
        }
    }

    toAbleBtn(){
        if(this.checkEmailValidation() === true && this.checkPassword() === true && this.checkRepeatPass() === true) {
            this.#btn.disabled = false;
        }
    }
}
