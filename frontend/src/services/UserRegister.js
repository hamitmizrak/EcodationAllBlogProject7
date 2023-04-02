//Javadan gelen Api burada saklamak
import axios from "axios";

//Sabit
const REGISTER_URL = "/api/v1/";

class UserRegisterServices {
    // CREATE
    // http://localhost:4444/api/v1/register
    createRegister(userRegisterDto) {
        return axios.post(REGISTER_URL, userRegisterDto)
    }

    // LIST
    // http://localhost:4444/api/v1/list
    getAllRegisters() {
        return axios.get(REGISTER_URL)
    }

    // FIND
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/-1
    // http://localhost:4444/api/v1/register/1
    getFindByRegister(id) {
        return axios.get(REGISTER_URL + "/register" + "/" + id);
    }

    // DELETE
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/1
    deleteRegister(id) {
        return axios.delete(REGISTER_URL + "/register" + "/" + id);
    }

    // UPDATE
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/1
    updateRegister(id, userRegisterDto) {
        return axios.put(REGISTER_URL + "/register" + "/" + id, userRegisterDto)
    }
}  //end UserRegisterServices

export default new UserRegisterServices();



