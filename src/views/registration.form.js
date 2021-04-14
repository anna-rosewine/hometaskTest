import {el, mount} from "redom";

export class RegistrationForm {
    #dom;
    #header;
    #emailInput;
    #passwordInput;
    #repeatPasswordInput;
    #btn;
    #errors;
    #matchError;
    constructor(){
        this.#dom = el("div#container", "RegistrationForm");
        this.#header = el("h2#header", "Create account");
        this.#emailInput = el("input#emailInput");
        this.#passwordInput = el("input#passwordInput");
        this.#repeatPasswordInput = el("input#repeatPasswordInput");
        this.#btn = el("button#createAccount", {disabled: true}, "Create account");

        this.#matchError = 'Passwords do not match';

        mount(this.#dom, this.#header);
        mount(this.#dom, this.#emailInput);
        mount(this.#dom, this.#passwordInput);
        mount(this.#dom, this.#repeatPasswordInput);
        mount(this.#dom, this.#btn);

        this.#btn.addEventListener('click', this.createAccount);
        this.#emailInput.addEventListener('keyup', this.checkEmailValidation);
        this.#passwordInput.addEventListener('keyup', this.checkPassword);
        this.#repeatPasswordInput.addEventListener('keyup', this.checkRepeatPass);

    }

    get dom () {
        return this.#dom;
    }

    set errors (err) {
        this.#errors = err;
    }

    get errors() {
        return this.#errors;
    }

    get matchError() {
        return this.#matchError;
    }

    get email () {
        return this.#emailInput;
    }

    get password () {
        return this.#passwordInput;
    }

    createAccount(){
        alert(`User with email ${this.email} is successfully created`);
    }

    checkEmailValidation(email) {
       let emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(emailRegExp.test(email)){
           return true;
       } else {
          return 'Your email is not valid';
       }
    }

    checkPassword(pass){
        let answer = "";
        if(pass.length < 8) {
            answer += "Your password should not be less, than 8 symbols. ";
        }
        let checkNumber = /\d/;
        if(!checkNumber.test(pass)) {
            answer = answer +  ' Your password should contain a number.'
        }
        let checkLowerCase = /[a-z]/;
        if(!checkLowerCase.test(pass)){
            answer = answer +  ' Your password should contain english symbol lowercase.'
        }

        let checkUpperCase = /[A-Z]/;
        if(!checkUpperCase.test(pass)){
            answer = answer +  ' Your password should contain english symbol uppercase.'
        }

        let specialSymb = /[!@#$%^&*]/;
        if(!specialSymb.test(pass)){
            answer = answer +  ' Your password should contain special symbol.'
        }

        if(answer.length < 2) {
            answer = 'Your password is acceptable'
        }
        this.errors = answer;
        return answer;
    }

    checkRepeatPass(password) {
        if(this.password !== password){
            return this.matchError;
        }
    }

}
