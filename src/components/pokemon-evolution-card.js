import { LitElement, css, html } from "lit";
import { closeIcon, editIcon } from "../assets/icons";

class PokemonEvolutionCard extends LitElement {
    get properties() {
        return {
            evolution: { type: Object },
            openModal: { type: Boolean },
            warning_trigger: { type: Boolean },
            checked: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.openModal = false;
    }

    static styles = css`
        .pokemon-evolution__container{
            position: relative;

            width: min-content
        }

        .pokemon-evolution__container button{
            position: absolute;
            right: 10px;
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
            background-color:#dadada;
        }

        .pokemon-evolution__container svg{
            fill:#585858;
        }

        .modal-shadow {
            position: fixed;
            top: 0; 
            z-index:2;

            display:flex;
            justify-content: center;
            align-items: center;

            width: 100vw;
            height: 100vh;


            background-color: #00000025;
        }

        
        .modal {
            background: white;
            padding: 50px 20px 20px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
            position: relative;
        } 

        .modal button {
            background-color: #ececec;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
        }

        .modal .closeIcon {
            background-color: transparent;
            position: absolute;
            top:0;
            right: 0;
        }

        .modal form {
            display: flex;
            flex-direction: column;
            
            gap: 15px;
        }

        .modal input {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            font-size: 16px;
        }

        .modal input[type="checkbox"] {
            margin: 0;
            align-self: flex-start;
            width: 20px;
            height: 20px;
        }

        .input-group{
            display:flex;
            flex-direction: column;
        }

        .warn-modal{
            position: relative;
        }

        .modal-header{
            position: absolute;
            top:0;
            left:0;
            padding: 20px;
            font-weight: 800;
        }
    `;

    modal() {
        return html`
        <div class="modal-shadow">
            <div class="modal">
                <button @click=${this._switch_modal} class="closeIcon">${closeIcon}</button>
                <form>
                    <div class="input-group">
                    <label>Nombre</label>
                        <input value="${this.evolution?.name}">
                    </div>
                    <div class="input-group">
                        <label>Tipo</label>
                        <input value="${this.evolution?.type}">
                    </div>
                    <div class="input-group">
                        <label>Está repetido</label>
                        <input 
                            type="checkbox"
                            ?checked="${this.checked}"
                            @change="${this._handleCheckboxChange}"
                        >
                    </div>
                    <button @click=${this._send_form}>Enviar</button>
                </form>
            </div>
        </div>
    `
    }

    warningModal() {
        return html`
        <div class="modal-shadow">
            <div class="modal warn-modal">
                <div class="modal-header">
                    <span>Pokemon repetido</span>
                </div>
                <button @click=${(e) => this._switch_modal(e, false)} class="closeIcon">${closeIcon}</button>
                <p>Puede cambiarlo en el punto mas cercano</p>
            </div>
        </div>
        `
    }

    _handleCheckboxChange(e) {
        this.checked = e.target.checked;
    }

    _switch_modal(e, isFormModal = true) {
        if (isFormModal) {
            this.openModal = !this.openModal;
        } else {
            this.warning_trigger = !this.warning_trigger;
        }

        this.requestUpdate();
    }

    _send_form() {
        this._switch_modal(null, true);
        if (this.checked) {
            this._switch_modal(null, false);
        }
    }

    render() {

        return html`
        ${this.openModal ? this.modal() : ""}
        ${this.warning_trigger ? this.warningModal() : ""}
            <div class="pokemon-evolution__container">
                <button @click=${this._switch_modal} >${editIcon}</button>
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