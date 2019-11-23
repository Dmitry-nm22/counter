import React from 'react';


function Button (props) {

    return(
        <div>
            <button onClick={props.onClick}
                    disabled={props.disabled}
            >{props.title}</button>
        </div>
    );
}

export default Button