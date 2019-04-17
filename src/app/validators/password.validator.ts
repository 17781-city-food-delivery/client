import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
    static validateMatch(formGroup: FormGroup) {
        return {
            validateMatch: true,
        };
    }
}