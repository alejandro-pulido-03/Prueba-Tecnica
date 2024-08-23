import { LitElement, css, html } from "lit";
import { editIcon } from "../assets/icons";
import "./modal/form-modal";
import "./modal/modal";

class PokemonEvolutionCard extends LitElement {
    get properties() {
        return {
            evolution: { type: Object },
            openModal: { type: Boolean },
            is_repeated: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.openModal = false;
    }

    static styles = css`
        :host{
            width: 100%;
        }

        .pokemon-evolution__container{
            position: relative;
            margin: 0 auto;
            max-width: 300px;
        }

        .pokemon-evolution__container button{
            position: absolute;
            right: 12%;
            top: 10px;
            z-index: 1;

            width: 30px;
            height: 30px;
            padding: 5px;

            border: none;
            border-radius: 50%;

            background-color: transparent;

            cursor:pointer;
        }

        .pokemon-evolution__container button:hover{
            background-color:#5b5b5b;
            fill:#dadada;
        }

        .pokemon-evolution__container svg{
            fill:#c5c5c5;
        }
    `;

    _toggle_modal() {
        this.openModal = !this.openModal;

        this.requestUpdate();
    }

    render() {

        return html`
            ${this.openModal ?
                html`
                <pokemon-modal @toggleModal=${this._toggle_modal}>
                    <form-modal .evolution=${this.evolution} .is_repeated=${this.is_repeated}></form-modal>
                </pokemon-modal>
                ` : ""
            }
            <div class="pokemon-evolution__container">
                <button @click=${this._toggle_modal} >${editIcon}</button>
                <pokemon-card 
                    .name=${this.evolution?.name} 
                    .type=${this.evolution?.type} 
                    .img_name=${this.evolution?.image} 
                    .pokemon_id=${this.evolution?.id}>
                </pokemon-card>
            </div>
        `
    }

}

customElements.define('pokemon-evolution-card', PokemonEvolutionCard);