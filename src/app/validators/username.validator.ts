import { FormControl } from '@angular/forms';

export class UsernameValidator {
    static validateUnique(formControl: FormControl) {
        //todo: check if username is already exist with firebase
        return {
            validateUnique: true,
        };
    }
}
