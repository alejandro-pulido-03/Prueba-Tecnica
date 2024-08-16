import { html, LitElement } from "lit";
import "../components/pokemon-card";

class PokemonList extends LitElement {

    static properties = {
        pokemon_data: { type: Array }
    }

    async _get_data() {
        await fetch("http://localhost:3002/pokemon").then(
            (res) => res.json()
        ).then((pokemons) => this.pokemon_data = pokemons);
    }

    connectedCallback() {
        super.connectedCallback()
        this._get_data();
    }

    render() {
        return html`<h1>Pokemon list</h1>
        ${this.pokemon_data?.map((pokemon => html`
            <pokemon-card 
                .name=${pokemon.name} 
                .type=${pokemon.type} 
                .img_name=${pokemon.image} 
                .pokemon_id=${pokemon.id}>
            </pokemon-card>`))}
        `
    }


}

customElements.define('pokemon-list', PokemonList);