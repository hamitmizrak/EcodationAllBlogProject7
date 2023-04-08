// rcc ==> TAB
//classlar state bir yapıdadır. state yazarız: statefull
// unutma: classta return vardır.
// JSX => JS  almak istiyorsanız {} eklemelisiniz.
// JSX => CSS almak istiyorsanız {{}} eklemelisiniz.
// JSX ==> Fonkiyonlarda ve props başına mutlaka this yazmalısınız.
import React, { Component } from 'react'
import UserRegister from '../../services/UserRegister';

// life cycle 
// 1-) constructor 
// 2-) render
// 3-)CDM
export default class RegisterList extends Component {
    constructor(props) {
        super(props);

        //STATE 
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
        UserRegister.getAllRegisters().then(
            (response) => {
                this.setState({
                    registerList: response.data
                });
            }
        )
    }

    //FUNCTION 
    //ADD
    addRegister() {
        this.props.history.push("/add-register/")
    }

    //UPDATE
    updateRegister(id) {
        //this.props.history.push("/add-register/"+id);
        this.props.history.push(`/add-register/${id}`);
    }

    //VIEW
    viewRegister(id) {
        //this.props.history.push("/view-register/"+id);
        this.props.history.push(`/view-register/${id}`);
    }

    //DELETE
    deleteRegister(id) {
        UserRegister.deleteRegister(id).then(
            (response) => {
                this.setState({
                    registerList: this.state.registerList.filter(
                        registerList => registerList.id != id
                    )
                });
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
                                            <td>{temp.username}</td>
                                            <td>{temp.email}</td>
                                            <td>{temp.password}</td>
                                            <td>{temp.isActive}</td>
                                            <td>{temp.createdDate}</td>
                                            <td><i class="fa-solid fa-pen-to-square text-primary" onClick={() => this.updateRegister(temp.id)}></i></td>
                                            <td><i class="fa-solid fa-binoculars text-success" onClick={() => this.viewRegister(temp.id)}></i></td>
                                            <td><i class="fa-solid fa-trash text-danger" onClick={() => {
                                                if (window.confirm("Silmek istiyor musunuz ?")) {
                                                    this.deleteRegister(temp.id)
                                                }
                                            }}></i></td>
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

