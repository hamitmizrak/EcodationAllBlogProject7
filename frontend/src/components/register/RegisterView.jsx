// rcc ==> TAB
// classlar state bir yapıdadır. state yazarız: statefull
// unutma: classta return vardır.
// JSX => JS  almak istiyorsanız {} eklemelisiniz.
// JSX => CSS almak istiyorsanız {{}} eklemelisiniz.
// JSX ==> Fonkiyonlarda ve props başına mutlaka this yazmalısınız.

// life cycle 
// 1-) constructor 
// 2-) render
// 3-) CDM

import React, { Component } from 'react'
import UserRegister from '../../services/UserRegisterApiServices';

export default class RegisterView extends Component {
    //constructor 
    constructor(props) {
        super(props);

        //STATE :default value
        this.state = {
            id: this.props.match.params.id,
            registerDto: {} //içi boş
        }

        //BIND
    } //end constructor

    //CDM 
    componentDidMount() {
        UserRegister.getFindByRegister(this.state.id).then(
            (response) => {
                this.setState({
                    registerDto: response.data
                })
            }
        ).catch(error => {
            console.error("is not find")
            window.alert("Api Find")
        });
    }

    //FUNCTION

    //RENDER
    render() {
        return (
            <>
            <div className="container">
                <div className="row">
                <div className="card mt-5 shadow" style={{padding:"2rem"}}>
                     <div className="card-body">
                        <h4 className="card-title">{this.state.registerDto.id}</h4>
                        <p className="card-text">{this.state.registerDto.username}</p>
                        <p className="card-text">{this.state.registerDto.email}</p>
                        <p className="card-text">{this.state.registerDto.isActive}</p>
                        <p className="card-text">{this.state.registerDto.createdDate}</p>
                    </div>
                </div>
            </div>
            </div>
            </>
        ) //end return
    } //end render
} //end class


