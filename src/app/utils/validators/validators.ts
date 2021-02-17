import { AbstractControl } from '@angular/forms';

export class MyValidators {

    /**
     * Método estático para validación de texto. Obtiene el valor del formulario de búsqueda y lo compara con 3 palabras.
     * @param control Es de tipo AbstractControl, En este caso proporcionara los valores del formulario de búsqueda.
     * @returns {boolean} true si el valor que paso el usuario coincide con una de las 3 palabras, es decir, un texto invalido y null si no coinciden,
     * es decir, sera un texto valido.
     */
    static isTextValid(control: AbstractControl): {text_invalid: boolean} {
        const value = control.value;
        if (value === 'TaxiaLife' || value === 'taxialife' || value === 'TAXIALIFE') {
            return {text_invalid: true};
        }
        return null;
    }
}
