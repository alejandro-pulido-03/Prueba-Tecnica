import { css, html, LitElement } from "lit";
import "../components/pokemon-card";

class PokemonList extends LitElement {

    static properties = {
        pokemon_data: { type: Array }
    }

    static styles = css`
        section{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            justify-items: center;
            align-items: center;
            padding: 0px;
            gap: 20px 20px;
            margin: 0 auto;
            margin-bottom: 50px;

        }

        a{
            width: 100%;
            
            text-decoration: none;
        }
    `

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
        return html`
        <section>
            ${this.pokemon_data?.map((pokemon => html`
                <a href=${"/" + pokemon.name}>
                <pokemon-card 
                    .name=${pokemon.name} 
                    .type=${pokemon.type} 
                    .img_name=${pokemon.image} 
                    .pokemon_id=${pokemon.id}>
                </pokemon-card>
                </a>
                `))}
        </section>
        `
    }


}

customElements.define('pokemon-list', PokemonList);