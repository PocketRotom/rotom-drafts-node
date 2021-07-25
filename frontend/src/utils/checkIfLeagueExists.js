import axios from "axios";

async function checkIfLeagueExists(id){
    let leagues;
    await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/`).then((response) => {
        leagues = response.data.data;
    });
    
    let found = leagues.find(league => league.idLeague == id);
    if (!found) {
        return false;
    } else {
        return true;
    };
    
}

export default checkIfLeagueExists;