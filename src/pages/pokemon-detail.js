import { LitElement, css, html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { backIcon } from "../assets/icons";
import "../components/pokemon-evolution-card";
import { router } from "../utils/router";
import type_colors from "../utils/type_color_mapper";
class PokemonDetail extends LitElement {
    static properties = {
        img_name: { type: String, state: true },
        name: { type: String, state: true },
        pokemon_id: { type: String, state: true },
        type: { type: String, state: true },
        is_repeated: { type: Boolean, state: true },
        evolutions: { type: Array, state: true },
        _styles: { type: Object, state: true }
    }

    constructor() {
        super();
        this._styles = {
            filter: "drop-shadow(2px 1px 20px #a2a3a0)",
            color: "black"
        }
    }

    static styles = css`
        :host{
            display: flex;
            flex-direction: column;
            justify-content: start;
            flex: 1;
        }

        .backBtn{
            margin-left: 30px;
        }

        .backBtn svg{
            width: 40px;
            height: 40px;
        }

        .pokemon-detail__main{
            display: flex;
            width: 95%;
            margin: 0 auto; 
            align-items: center;
            flex: 1;
            flex-wrap: wrap;
        }

            section{
            display: grid;
            max-width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            justify-items: center;
            align-items: center;
            padding: 30px 0px 50px 0px;
            gap: 20px 20px;
            margin: 0 auto;

        }

        .pokemon-detail__container{
            display: flex;
            justify-content: center;
            gap: 30px;  
        }

        img{
            width: clamp(280px, 50%, 350px );
            height: fit-content;
        }

        .pokemon-detail__body h1{
            font-size: 3rem;
        }
    `

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
            this.is_repeated = pokemons.length > 1;

            this.types = type_colors(this.type);
            const main_type = this.types.find(t => !t.is_default) ?? this.types[0];
            this._styles.filter = `drop-shadow(2px 1px 20px ${main_type.color})`
            this._styles.color = `${main_type.color}`
        });
    }

    connectedCallback() {
        super.connectedCallback()
        this._get_data();

    }



    render() {
        return html`
        <div>
            <a class="backBtn" href="/">${backIcon}</a>
        </div>
        <div class="pokemon-detail__main">
        ${this.name &&
            html`
                <div class="pokemon-detail__container">
                    <img src=${"src/assets/pokemon/" + this.img_name} style=${styleMap({ filter: this._styles.filter })}/>
                    <div 
                        class="pokemon-detail__body"
                        style=${styleMap({ color: this._styles.color })}
                    >
                        <h1>${this.name}</h1>
                        <p>${this.type}</p>
                        <p>${this.pokemon_id}</p>
                    </div>
                </div>
                `
            }
            <section>
                ${this.evolutions?.map((pokemon => html`
                <pokemon-evolution-card .evolution=${pokemon} .is_repeated=${this.is_repeated}></pokemon-evolution-card>`))}

                </section>
        </div>
        `

    }

}

customElements.define('pokemon-detail', PokemonDetail);