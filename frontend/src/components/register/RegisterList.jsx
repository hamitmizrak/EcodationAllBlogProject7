// rcc ==> TAB
// unutma: classta return vardır.
// JSX => JS  almak istiyorsanız {} eklemelisiniz.
// JSX => CSS almak istiyorsanız {{}} eklemelisiniz.
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


    //RENDER
    render() {
        return (
            <>
                <h1 className="text-center text-uppercase">Register List</h1>
                <div className="container">
                    <div className="row">
                        <div className="mx-auto">
                            <button className="btn btn-primary">EKLE</button>
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
                                            <td><button>UPDATE</button></td>
                                            <td><button>VIEW</button></td>
                                            <td><button>DELETE</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> {/* row  */}
                </div>{/* container  */}
            </>
        )
    } //end render
} //end RegisterList

