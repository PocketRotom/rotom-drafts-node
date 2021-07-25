import axios from "axios";
import checkToken from "./checkToken";


async function checkIfUserHasLogin() {

    let user = await checkToken();
    

    if (user == true) {
        return sessionStorage.getItem("userData");
    } else {
        window.location.href = "/login";
        return false;
    }   
}


export default checkIfUserHasLogin;