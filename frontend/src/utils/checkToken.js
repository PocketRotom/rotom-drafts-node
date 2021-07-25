import axios from "axios";


async function checkToken() {

    if (sessionStorage.getItem("userData") != null) {
        return true;
    } else {
        let token = localStorage.getItem("userToken");
        if (token == null) {
            return false;
        } else {
            let json = JSON.stringify({ token: token});
            await axios.post(`${sessionStorage.getItem("apiURL")}/auth/verify`, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response.data);
                if (response.data.success == false) {
                    localStorage.removeItem("userToken");
                    return false;
                } else {
                    sessionStorage.setItem("userData", JSON.stringify(response.data.data.data));
                    return true;
                }
            });
        }
    }

    
}


export default checkToken;