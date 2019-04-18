import { FormControl } from '@angular/forms';

export class UsernameValidator {
    static usernameTaken(formControl: FormControl) {
        //todo: check if username is already exist with firebase
        return {
            usernameTaken: false,
        };
    }
}
