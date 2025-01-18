import React from 'react'
import PropTypes from 'prop-types'

function Bubble(props) {
    const class_name = props.user ? "justify-end" : "justify-start"
    const color = props.user ? "bg-white" : "bg-slate-900"
    const textColor = props.user ? "text-black" : "text-white"
    return (
        <div className={`flex mt-4 ${class_name}`}>
            <div className={`inline  p-4 rounded-md ${color} ${textColor}`}>
                {props.children}
            </div>
        </div>
    )
}

Bubble.propTypes = {
    user: PropTypes.bool
}

export default Bubble
