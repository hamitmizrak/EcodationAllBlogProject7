// rcc ==> TAB
// classlar state bir yapıdadır. state yazarız: statefull
// classlar this çok sever
// unutma: classta return vardır.
// JSX => JS  almak istiyorsanız {} eklemelisiniz.
// JSX => CSS almak istiyorsanız {{}} eklemelisiniz.
// JSX ==> Fonkiyonlarda ve props başına mutlaka this yazmalısınız.

// life cycle 
// 1-) constructor 
// 2-) render
// 3-) CDM
import React, { Component } from 'react'
import UserRegisterApiServices from '../../services/UserRegisterApiServices';

//class
export default class RegisterList extends Component {
    constructor(props) {
        super(props);

        //STATE :default value
        this.state = {
            registerList: [],
        }

        //BİND
        this.addRegister = this.addRegister.bind(this);
        this.updateRegister = this.updateRegister.bind(this);
        this.viewRegister = this.viewRegister.bind(this);
        this.deleteRegister = this.deleteRegister.bind(this);
    }//end constructor

    //CDM : api verisi hazırlayacak
    componentDidMount() {
        UserRegisterApiServices.getAllRegisters().then(
            (response) => {
                this.setState({
                    registerList: response.data
                });
            }
        ).catch(error => {
            console.log("List wrong")
        });
    }

    //FUNCTION 
    //ADD  this => php
    addRegister() {
        this.props.history.push("/register_add/create") // this => PHP
    }

    //UPDATE this => php
    updateRegister(id) {
        //this.props.history.push("/add-register/"+id);
        this.props.history.push(`/register_add/${id}/`);
    }

    //VIEW this => php
    viewRegister(id) {
        //this.props.history.push("/view-register/"+id);
        this.props.history.push(`/register_view/${id}`);
    }

    //DELETE REDIRECT 
    deleteRegister(id) {
        UserRegisterApiServices.deleteRegister(id).then(
            (response) => {
                this.setState({
                    registerList: this.state.registerList.filter(
                        registerList => registerList.id != id
                    )
                });
            }).catch(error => {
                console.log("Delete wrong")
            });
    }

    //RENDER
    render() {
        return (
            <React.Fragment>
                <h1 className="text-center text-uppercase">Register List</h1>
                <div className="container">
                    <div className="row">
                        <div className="mx-auto">
                            <button className="btn btn-primary" onClick={this.addRegister}>EKLE</button>
                        </div>
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USERNAME</th>
                                    <th>EMAİL</th>
                                    <th>PASSWORD</th>
                                    <th>ACTIVE</th>
                                    <th>DATE</th>
                                    <th>UPDATE</th>
                                    <th>VIEW</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.registerList.map(temp =>
                                        <tr key={temp.id}>
                                            <td>{temp.id}</td>
                                            <td>{temp.uname}</td>
                                            <td>{temp.email}</td>
                                            <td>{temp.passwd.substring(0,5)}</td>
                                            <td>{temp.check}</td>
                                            <td>{temp.createdDate}</td>
                                            <td><i style={{ cursor: "pointer" }} className="fa-solid fa-pen-to-square text-primary" onClick={() => this.updateRegister(temp.id)}></i></td>
                                            <td><i style={{ cursor: "pointer" }} className="fa-solid fa-binoculars text-success" onClick={() => this.viewRegister(temp.id)}></i></td>
                                            <td><i style={{ cursor: "pointer" }} className="fa-solid fa-trash text-danger" onClick={() => {
                                                if (window.confirm("Silmek istiyor musunuz ?")) {
                                                    this.deleteRegister(temp.id)
                                                }
                                            }}></i>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> {/* row  */}
                </div>{/* container  */}
            </React.Fragment>
        )
    } //end render
} //end RegisterList

