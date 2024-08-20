import { LitElement, css, html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import type_colors from "../utils/type_color_mapper";


class PokemonCard extends LitElement {
    get properties() {
        return {
            img_name: { type: String },
            name: { type: String },
            pokemon_id: { type: String },
            type: { type: String },
            types: { type: Array },
            _styles: { type: Object, state: true }
        };
    }

    constructor() {
        super();
        this._styles = {
            filter: "drop-shadow(2px 1px 20px #a2a3a0)",
            color: "black"
        }
    }

    static styles = [
        css`
            :host{
                --image-side: 100px;
            }

            .pokemon-card__container {
                position: relative;
                width: 300px;
                margin-top: calc(var(--image-side) / 2  + 10px);
                padding-top: calc(var(--image-side) / 2);

                display: flex;
                justify-content: center;
                align-items: center;
                
                border-radius: 10px;
                background-color: white;
                box-shadow: 0px 0px 2px 1px #00000017;
            }

            .pokemon-card__img img{
                width: var(--image-side);
                height: var(--image-side);
                object-fit: contain;
            }

            .pokemon-card__img {
                position: absolute;
                top: -50px;
            }

        `];

    connectedCallback() {
        super.connectedCallback();
        this.types = type_colors(this.type);

        const main_type = this.types.find(t => !t.is_default) ?? this.types[0];

        this._styles.filter = `drop-shadow(2px 1px 20px ${main_type.color})`
        this._styles.color = `${main_type.color}`
    }



    render() {

        return html`
        <div class="pokemon-card__container">
            <div 
                class="pokemon-card__img"
                style=${styleMap({ filter: this._styles.filter })}
            >
                <img src=${"src/assets/pokemon/" + this.img_name}/>
            </div>
            <div 
                class="pokemon-card__body"
                style=${styleMap({ color: this._styles.color })}
            >
                <h1>${this.name}</h1>
                <p>${this.type}</p>
                <p>${this.pokemon_id}</p>
            </div>
        </div>
        `
    }

}

customElements.define('pokemon-card', PokemonCard);