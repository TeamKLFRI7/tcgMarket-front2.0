import React from 'react'

export const IcXMark = ({color}) => {

    return (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 5.91L6 18.09" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 5.91L18 18.09" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
