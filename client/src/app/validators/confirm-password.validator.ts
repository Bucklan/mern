import {FormGroup} from "@angular/forms";

export const confirmPasswordValidator = (controlName: string, controlNameTOMatch: string) => {
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[controlName];
        const confirmPassword = formGroup.controls[controlNameTOMatch];
        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ confirmPasswordValidator: true });
        }
        else {
            confirmPassword.setErrors(null);
        }
    };
}
