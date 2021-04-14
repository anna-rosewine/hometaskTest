import {RegistrationForm} from "./registration.form";
import {beforeEach, describe, it, jest} from "@jest/globals";
let form;

beforeEach(() => {
    form = new RegistrationForm();
    document.body.innerHTML = "";
    document.body.append(form.dom);
})

describe('RegistrationForm', () => {
    describe('Layout', () => {
        it('should render div#container', () => {
            expect.assertions(1);
            const container = document.getElementById('container');
            expect(container).toBeTruthy();
        })

        it('should render h2#header', () => {
            expect.assertions(1);
            const header = document.getElementById('header');
            expect(header).toBeTruthy();
        })

        it('should render email input', () => {
            expect.assertions(1);
            const emailInput = document.getElementById('emailInput');
            expect(emailInput).toBeTruthy();
        })

        it('should render password input', () => {
            expect.assertions(1);
            const passInput = document.getElementById('passwordInput');
            expect(passInput).toBeTruthy();
        })

        it('should render repeat password input', () => {
            expect.assertions(1);
            const repeatInput = document.getElementById('repeatPasswordInput');
            expect(repeatInput).toBeTruthy();
        })

        it('should render button ', () => {
            expect.assertions(1);
            const btn = document.getElementById('createAccount');
            expect(btn).toBeTruthy();
        })
    });
    describe('Button Create Account', () => {
        it('should call createAccount() method if clicked', () => {
            expect.assertions(1);
            document.body.innerHTML = " ";
            const clickSpy = jest.spyOn(RegistrationForm.prototype, "createAccount")
            window.alert = jest.fn();
            const r = new RegistrationForm();
            document.body.append(r.dom);
            const btn = document.getElementById('createAccount');
            btn.disabled = false;
            btn.click();
            expect(clickSpy).toBeCalled();
        });
        it.only('should be disabled', () => {
            expect.assertions(1);
            const btn = document.getElementById('createAccount');
            expect(btn.disabled).toBe(true);
        })
    });
});
