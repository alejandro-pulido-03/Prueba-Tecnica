import { LitElement, css, html, unsafeCSS } from "lit";
import type_colors from "../utils/type_color_mapper";


class PokemonCard extends LitElement {
    get properties() {
        return {
            img_name: { type: String },
            name: { type: String },
            pokemon_id: { type: String },
            type: { type: String }
        };
    }

    static styles =
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
                
                box-shadow: 0px 0px 2px 1px #00000017;
                border-radius: 10px;
                
            }

            .pokemon-card__img img{
                width: var(--image-side);
                height: var(--image-side);
                object-fit: contain;
                filter: drop-shadow(2px 1px 5px ${unsafeCSS(type_colors(this.type)[0].color)});
            }

            .pokemon-card__img {
                position: absolute;
                top: -50px;
            }

        `;



    render() {
        return html`
        <a href=${"/" + this.name}>
        <div class="pokemon-card__container">
            <div class="pokemon-card__img">
                <img src=${"src/assets/pokemon/" + this.img_name}/>
            </div>
            <div class="pokemon-card__body">
                <h1>${this.name}</h1>
                <p>${this.type}</p>
                <p>${this.pokemon_id}</p>
            </div>
        </div>
        </a>
        `
    }

}

customElements.define('pokemon-card', PokemonCard);