import { LitElement, css, html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import type_colors from "../utils/type_color_mapper";
import "./type-badge";
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
        };
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
                padding-bottom: 20px;

                display: flex;
                justify-content: center;
                align-items: center;
                
                border-radius: 10px;
                background-color: #303030;
                box-shadow: 0px 0px 10px 1px #ffffff30;
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

            .pokemon-id__float{
                position: absolute;
                top: 10px;
                left: 15px;

                color: #a2a2a2;
            }

        `
    ];

    connectedCallback() {
        super.connectedCallback();
        this.types = type_colors(this.type);

        const main_type = this.types.find(t => !t.is_default) ?? this.types[0];

        this._styles.filter = `drop-shadow(2px 1px 20px ${main_type.color})`;
        this._styles.color = `${main_type.color}`;
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
                ${this.types.map(t => html`<type-badge .type_obj=${t}></type-badge>`)}
                <span class="pokemon-id__float">
                    ${this.pokemon_id}
                </span>
            </div>
        </div>
        `;
    }

};

customElements.define('pokemon-card', PokemonCard);