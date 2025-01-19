import React from 'react'
import PropTypes from 'prop-types'

function Bubble(props) {
    const class_name = props.user ? "justify-end" : "justify-start"
    const color = props.user ? "bg-white" : "bg-[#222222]"
    const textColor = props.user ? "text-black" : "text-white"
    return (
        <div className={`flex mt-4 ${class_name}`}>
            <div className={`inline max-w-[56rem] p-4 rounded-2xl ${color} ${textColor}`}>
                {props.children}
            </div>
        </div>
    )
}

Bubble.propTypes = {
    user: PropTypes.bool
}

export default Bubble
