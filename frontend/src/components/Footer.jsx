//rfc
import React from 'react'

export default function Footer(props) {

    //date
    const nowDate=new Date().getFullYear();
    
        return (
            <>
                <div style={
                    {
                        backgroundColor: "black",
                        color: "white",
                        minHeight: "10rem",
                        marginTop:"40rem"
                    }
                }>
                    {props.special}
                    <br/>
                    {nowDate}
                </div>
            </>
        )
    }
