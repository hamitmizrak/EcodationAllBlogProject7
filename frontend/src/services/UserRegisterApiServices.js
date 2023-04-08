//Javadan gelen Api burada saklamak
import axios from "axios";

//Sabit
const REGISTER_URL = "/api/v1/";

class UserRegisterApiServices {
    // CREATE
    // http://localhost:4444/api/v1/register
    createRegister(userRegisterDto) {
        console.log(userRegisterDto)
        return axios.post(REGISTER_URL+"register", userRegisterDto)
    }

    // LIST
    // http://localhost:4444/api/v1/list
    getAllRegisters() {
        // return axios.get(REGISTER_URL.concat("/list"))
        // return axios.get(REGISTER_URL+"/list")
        return axios.get(`${REGISTER_URL}/list`)
    }

    // FIND
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/-1
    // http://localhost:4444/api/v1/register/1
    getFindByRegister(id) {
        //return axios.get(REGISTER_URL + "register" + "/" + id);
        return axios.get(`${REGISTER_URL}register/${id}`);
    }

    // DELETE
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/1
    deleteRegister(id) {
        //return axios.delete(REGISTER_URL + "/register" + "/" + id);
        return axios.delete(`${REGISTER_URL}register/${id}`)
    }

    // UPDATE
    // http://localhost:4444/api/v1/register
    // http://localhost:4444/api/v1/register/0
    // http://localhost:4444/api/v1/register/1
    updateRegister(id, userRegisterDto) {
        return axios.put(REGISTER_URL + "/register" + "/" + id, userRegisterDto)
        //return axios.put(`${REGISTER_URL}register/${id},${userRegisterDto}`)
    }
}  //end UserRegisterServices

export default new UserRegisterApiServices();



