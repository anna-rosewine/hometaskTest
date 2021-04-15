import {RegistrationForm} from "./registration.form";
import {beforeEach, describe, it, jest} from "@jest/globals";
let form;
function triggerEvent(el, type){
    if ('createEvent' in document) {
        const e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    }
}
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
    describe('Email Input', () => {
        describe('should check if mail valid', () => {
            it('should spy on checkEmailValidation() method', () => {
                expect.assertions(1);
                document.body.innerHTML = " ";
                const keyUp = jest.spyOn(RegistrationForm.prototype, 'checkEmailValidation');
                const r = new RegistrationForm();
                document.body.append(r.dom);
                const input = document.getElementById('emailInput');
                input.focus();
                triggerEvent(input, 'keydown');
                triggerEvent(input, 'keyup');
                expect(keyUp).toBeCalled();
            })
            it('should render not valid message if email is not valid', () => {
                expect.assertions(2);
                form.emailValue = 'someNotValidEmail';
                form.checkEmailValidation()
                expect(form.checkEmailValidation()).toEqual(false);
                expect(form.emailState).toEqual(expect.stringContaining( 'Your email is not valid'));
            })
            it('should render valid message if email is valid', () => {
                expect.assertions(2);
                form.emailValue = 'jensen.ackles@gmail.com';
                form.checkEmailValidation()
                expect(form.checkEmailValidation()).toEqual(true);
                expect(form.emailState).toEqual(expect.stringContaining( 'Your email is valid'));
            })

        });
    })
    describe('Password Input', () => {

        // describe('listen to method', () => {
        //     it('should spy on checkPassword() method', () => {
        //         expect.assertions(1);
        //         document.body.innerHTML = " ";
        //         const keyUp = jest.spyOn(RegistrationForm.prototype, 'checkPassword').mockImplementation(() => {
        //             return true;
        //         });
        //         const r = new RegistrationForm();
        //         document.body.append(r.dom);
        //         const input = document.getElementById('passwordInput');
        //         input.focus();
        //         triggerEvent(input, 'keydown');
        //         triggerEvent(input, 'keyup');
        //         expect(keyUp).toBeCalled();
        //     })
        // })

        describe('password length' , () => {
            it('should render message, that length should be not less, than 8', () => {
                expect.assertions(2);
                form.passwordValue = 'anna';
                form.checkPassword()
                expect(form.checkPassword()).toBe(false);
                expect(form.passwordState).toContain('Your password should not be less, than 8 symbols');
            })

            it('should not render message about length, if its correct', () => {
                expect.assertions(1);
                form.passwordValue = 'jensenAckles';
                form.checkPassword()
                expect(form.passwordState).not.toContain('Your password should not be less, than 8 symbols');
            })
        })

        describe('password contain number', () => {
            it('should render message, that password should contain number, if its not', () => {
                expect.assertions(2);
                form.passwordValue = 'anna';
                form.checkPassword()
                expect(form.checkPassword()).toBe(false);
                expect(form.passwordState).toEqual(expect.stringContaining('Your password should contain a number'));
            })

            it('should not render message, that password should contain number, if it has got', () => {
                expect.assertions(1);
                form.passwordValue = 'anna9';
                form.checkPassword()
                expect(form.passwordState).not.toEqual(expect.stringContaining('Your password should contain a number'));
            })
        })

        describe('lowercase symbol', () => {
            it('should render message, that password should contain lowercase eng symbol, if it does not has', () => {
                expect.assertions(2);
                form.passwordValue = 'ADHIL9';
                form.checkPassword()
                expect(form.checkPassword()).toBe(false);
                expect(form.passwordState).toEqual(expect.stringContaining('Your password should contain english symbol lowercase'));
            })

            it('should not render message, that password should contain lowercase eng symbol, if it has', () => {
                expect.assertions(1);
                form.passwordValue = 'ADasdL9';
                form.checkPassword()
                expect(form.passwordState).not.toEqual(expect.stringContaining('Your password should contain english symbol lowercase'));
            })
        })

        describe('uppercase symbol', () => {
            it('should render message, that password should contain eng symb uppercase, if it does not has', () => {
                expect.assertions(2);
                form.passwordValue ='anna9';
                form.checkPassword()
                expect(form.checkPassword()).toBe(false);
                expect(form.passwordState).toEqual(expect.stringContaining('Your password should contain english symbol uppercase'));

            })

            it('should not render message, that password should contain eng symb uppercase, if it has', () => {
                expect.assertions(1);
                form.passwordValue ='aNNa9';
                form.checkPassword()
                expect(form.passwordState).not.toEqual(expect.stringContaining('Your password should contain english symbol uppercase'));

            })
        })

        describe('special symbol', () => {
            it('should render message, that password should contain special symbol if it does not has', () => {
                expect.assertions(2);
                form.passwordValue = 'anna9';
                form.checkPassword()
                expect(form.checkPassword()).toBe(false);
                expect(form.passwordState).toEqual(expect.stringContaining('Your password should contain special symbol'))
            })

            it('should not render message, that password should contain special symbol, if it has', () => {
                expect.assertions(1);
                form.passwordValue = 'ann@a9';
                form.checkPassword()
                expect(form.passwordState).not.toEqual(expect.stringContaining('Your password should contain special symbol'))
            })

        })

        it('should check if password is acceptable', () => {
            expect.assertions(2);
            form.passwordValue= "Jensen7@Ackles";
            form.checkPassword()
            expect(form.checkPassword()).toBe(true);
            expect(form.passwordState).toEqual('Your password is acceptable')
        })

        describe('listen to method', () => {
            it('should spy on checkPassword() method', () => {
                expect.assertions(1);
                document.body.innerHTML = " ";
                const keyUp = jest.spyOn(RegistrationForm.prototype, 'checkPassword').mockImplementation(() => {
                    return true;
                });
                const r = new RegistrationForm();
                document.body.append(r.dom);
                const input = document.getElementById('passwordInput');
                input.focus();
                triggerEvent(input, 'keydown');
                triggerEvent(input, 'keyup');
                expect(keyUp).toBeCalled();
            })
        })
    })
    describe('Repeat Password Input', () => {
        it('should render error message match with password input', () => {
            expect.assertions(2);
            form.passwordValue = "Ackles222@Jensen";
            form.repeatPasswordValue = "Anna";
            expect(form.checkRepeatPass()).toBe(false);
            expect(form.repeatPasswordState).toEqual(expect.stringContaining('Passwords do not match'))
        })
        it('should not render error message', () => {
            expect.assertions(2);
            form.passwordValue = "Ackles222@Jensen";
            form.repeatPasswordValue = "Ackles222@Jensen";
            expect(form.checkRepeatPass()).toBe(true);
            expect(form.repeatPasswordState).not.toEqual(expect.stringContaining('Passwords do not match'))
        })
        describe('listen to method', () => {
            it('should spy on checkRepeatPassword() method', () => {
                expect.assertions(1);
                document.body.innerHTML = " ";
                const keyUp = jest.spyOn(RegistrationForm.prototype, 'checkRepeatPass').mockImplementation(() => {
                    return true;
                });
                const r = new RegistrationForm();
                document.body.append(r.dom);
                const input = document.getElementById('repeatPasswordInput');
                input.focus();
                triggerEvent(input, 'keydown');
                triggerEvent(input, 'keyup');
                expect(keyUp).toBeCalled();
            })
        })
    })
    describe('Button Create Account', () => {

        it('should be disabled', () => {
            expect.assertions(1);
            const btn = document.getElementById('createAccount');
            expect(btn.disabled).toBe(true);
        })
        describe('createAccount()', () => {
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
            it('createAccount() message should contain information about user', () => {

            })

        })

        it('should work if email, password, repeat password inputs are valid', () => {
            expect.assertions(1);
            form.emailValue = 'jensen.ackles@gmail.com';
            form.passwordValue = "Ackles222@Jensen";
            form.repeatPasswordValue = "Ackles222@Jensen";
            form.toAbleBtn();
            const btn = document.getElementById('createAccount')
            expect(btn.disabled).toBe(false);
        })
        it('should call toAbleBtn() method after keyUp', () => {
            expect.assertions(1)
            document.body.innerHTML = " ";
            const keyUp = jest.spyOn(RegistrationForm.prototype, 'toAbleBtn').mockImplementation(() => {
                return true;
            });
            const r = new RegistrationForm();
            document.body.append(r.dom);
            const dom = document.getElementById('container');
            triggerEvent(dom, 'keyup');
            expect(keyUp).toBeCalled();
        });
    });
});
