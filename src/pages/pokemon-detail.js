import { LitElement, html } from "lit";
import "../components/pokemon-evolution-card";
import { router } from "../utils/router";
class PokemonDetail extends LitElement {
    static properties = {
        img_name: { type: String, state: true },
        name: { type: String, state: true },
        pokemon_id: { type: String, state: true },
        type: { type: String, state: true },
        evolutions: { type: Array, state: true }
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
        <a href="/">Back</a>
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
            <pokemon-evolution-card .evolution=${pokemon}></pokemon-evolution-card>`))}
        `
    }

}

customElements.define('pokemon-detail', PokemonDetail);