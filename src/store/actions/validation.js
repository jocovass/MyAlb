export const required = value => value ? null : 'Required!';
export const emailCheck = value => {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
            ? null
            : 'Invalid email address!');

};
export const minLength = min => value => value.length < min ? `Must be ${min} characters or more!` : null;
export const minValue = minLength(8);
export const requiredNum = value => /[0-9]+/.test(value) ? null : 'Must contain atleast one number!';