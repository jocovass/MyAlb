import React from 'react';

const renderClasses = ( value ,touched, error ) => {
    const inputClass = ['form__input'];
    const labelClass = ['form__label'];
    if(!touched) {
        return [ inputClass, labelClass ];
    } else if(touched && value.trim() === "") {
        inputClass.push('empty__input error');
        labelClass.push('empty__label error');
    } else if(touched && error) {
        inputClass.push('filled__input error');
        labelClass.push('filled__label error');
    } else if(touched && !error) {
        inputClass.push('filled__input valid');
        labelClass.push('filled__label valid');
    }
    return [ inputClass, labelClass ];
};

export const renderInput = ({ input, type, label, meta: { touched, error }}) => {
    const [inputClass, labelClass] = renderClasses(input.value, touched, error);
    return (
        <div className="form__row mb-small">
            <input className={inputClass.join(' ')}
                   {...input} 
                   type={type}
                   autoComplete="off" />
            <label htmlFor={input.name}
                   className={labelClass.join(' ')}>{label}</label>
            {touched && error ? <span className="validation-error">{error}</span> : null}
        </div>
    );
};