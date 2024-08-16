import { LitElement, html } from "lit";

import { router } from "../utils/router";
class PokemonDetail extends LitElement {
    static properties = {
        img_name: { type: String },
        name: { type: String },
        pokemon_id: { type: String },
        type: { type: String },
        evolutions: { type: Array }
    }

    async _get_data() {
        const pokemon_name = router.location.params.pokemon;
        await fetch("http://localhost:3002/pokemon?name=" + pokemon_name).then(
            (res) => res.json()
        ).then((pokemons) => {
            const { name, image: img_name, id: pokemon_id, type, evolutions } = pokemons[0];
            this.name = name;
            this.img_name = img_name;
            this.pokemon_id = pokemon_id;
            this.type = type;
            this.evolutions = evolutions;
        });
    }

    connectedCallback() {
        super.connectedCallback()
        this._get_data();
    }

    render() {
        return html`
        ${this.name &&
            html`
        <pokemon-card 
                .name=${this.name} 
                .type=${this.type} 
                .img_name=${this.img_name} 
                .pokemon_id=${this.pokemon_id}>
        </pokemon-card>`
            }
        ${this.evolutions?.map((pokemon => html`
            <pokemon-card 
                .name=${pokemon.name} 
                .type=${pokemon.type} 
                .img_name=${pokemon.image} 
                .pokemon_id=${pokemon.id}>
            </pokemon-card>`))}
        `
    }

}

customElements.define('pokemon-detail', PokemonDetail);