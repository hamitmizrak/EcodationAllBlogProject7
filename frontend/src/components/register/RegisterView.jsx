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
import UserRegister from '../../services/UserRegister';

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
        });
    }

    //FUNCTION

    //RENDER
    render() {
        return (
            <>
            <div className="row">
                <div class="card">
                     <div class="card-body">
                        <h4 class="card-title">{this.state.registerDto.id}</h4>
                        <p class="card-text">{this.state.registerDto.username}</p>
                        <p class="card-text">{this.state.registerDto.email}</p>
                        <p class="card-text">{this.state.registerDto.isActive}</p>
                        <p class="card-text">{this.state.registerDto.createdDate}</p>
                    </div>
                </div>
            </div>
            </>
        )
    }
}


