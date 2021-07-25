import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import orderBy from "../utils/orderBy";


class Tierlist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'tierlist': [],
            'isLoaded': false,
            'exists': true
        }
    };

    

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getTierlist(id);
    }

    async getTierlist(id) {
        
        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({'exists': exists});
            return false;
        }
        let tierlist;

        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${id}/tierlist`).then((response) => {
            tierlist = response.data.data;
        })
        tierlist = orderBy(tierlist, 'tier');
        tierlist = Object.entries(tierlist);
        let tierlistBak = tierlist.slice();
        tierlist[0] = tierlistBak[1];
        tierlist[1] = tierlistBak[3];
        tierlist[2] = tierlistBak[5];
        tierlist[3] = tierlistBak[4];
        tierlist[4] = tierlistBak[6];
        tierlist[5] = tierlistBak[0];
        tierlist[6] = tierlistBak[2];
        console.log(tierlist);
        this.setState({'tierlist' : tierlist});
        this.setState({'isLoaded' : true});
    }
    

    getTierlistHTML() {
        let tierlistHTML = [];
        this.state.tierlist.forEach( (tier, index) => {
            if (tier == undefined) {
                tier = [index, []];
            }
            let pokemons = [];
            tier[1].forEach(pokemon => {
                pokemons.push((
                    <tr key={pokemon.idPokemon}>
                        <th className="row"> <img src={sessionStorage.getItem("apiURL") + "/public/images/pokemon/" + pokemon.idPokemon + ".png"} className="img-fluid" style={{ width: "50%" }} /> {pokemon.name} </th>
                        <td>
                            <p style={{textTransform: "capitalize"}}> {pokemon.tier} </p>
                        </td>
                    </tr>
                ));
            });

            tierlistHTML.push((
                <div className="col-md-1" key={tier[0].tier}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">Pokémon</th>
                                <th className="col">Tier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemons}
                        </tbody>
                    </table>
                </div>
            ));
        });
        return tierlistHTML;
    }

    render() {
        let tierlist;
        if (!this.state.exists) {
            return <div><h1 style={{ textAlign: "center" }}>This League doesn't exists</h1></div>
        }
        if (this.state.isLoaded == false) {
            return <div>Loading</div>;
        } else {
            tierlist = this.getTierlistHTML();
            let tiers = (
                <div className="container-fluid mt4">
                        <div className="row seven-cols">
                            {tierlist}
                        </div>
                </div>
                
                
            );

            return tiers;
        }

    }
}

export default withRouter(Tierlist);