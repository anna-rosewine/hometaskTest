import {el, mount} from "redom";

export class RegistrationForm {
    #dom;
    #header;
    #emailInput;
    #passwordInput;
    #repeatPasswordInput;
    #btn;
    constructor(){
        this.#dom = el("div#container", "RegistrationForm");
        this.#header = el("h2#header", "Create account");
        this.#emailInput = el("input#emailInput");
        this.#passwordInput = el("input#passwordInput");
        this.#repeatPasswordInput = el("input#repeatPasswordInput");
        this.#btn = el("button#createAccount", {disabled: true}, "Create account");

        mount(this.#dom, this.#header);
        mount(this.#dom, this.#emailInput);
        mount(this.#dom, this.#passwordInput);
        mount(this.#dom, this.#repeatPasswordInput);
        mount(this.#dom, this.#btn);

        this.#btn.addEventListener('click', this.createAccount);
    }

    get dom () {
        return this.#dom;
    }

    get email () {
        return this.#emailInput;
    }

    createAccount(){
        alert(`User with email ${this.email} is successfully created`);
    }
}
