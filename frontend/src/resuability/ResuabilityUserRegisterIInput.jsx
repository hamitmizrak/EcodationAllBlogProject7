// rfc
import React from 'react'

//function
export default function ResuabilityUserRegisterIInput(props) {
    //object destructing 
    const { type, name, id, placeholder, onChange,value, error, focus } = props;
    // Valid için 
    const className = name ? "is-invalid form-control mb-3" : "form-control mb-3";

    //RETURN
    return (
        <React.Fragment>
            <div className="form-group mb-3">
                <label htmlFor={id}>{id}</label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={className}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    autoFocus={focus} />
                <div className="invalid-feedback">{error}</div>
            </div>
        </React.Fragment>
    )
}

