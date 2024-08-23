import { css, html, LitElement } from "lit";
import { closeIcon } from "../../assets/icons";


class PokemonModal extends LitElement {

    static styles = css`
        .modal-shadow {
            position: fixed;
            top: 0; 
            left: 0;
            z-index:9999;

            display:flex;
            justify-content: center;
            align-items: center;

            width: 100vw;
            height: 100vh;


            background-color: #00000075;
        }

        
        .modal {
            position: relative;

            max-width: 500px;
            width: 100%;
            padding: 50px 20px 20px 20px;
            
            border-radius: 8px;
            background: #303030;
            color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .modal .closeIcon {
            position: absolute;
            top:15px;
            right: 15px;

            border: none;
            
            background-color: transparent;
            cursor: pointer;
        }

        .modal .closeIcon path{
            fill: white;
        }
    `;

    _switch_modal() {
        const options = {
            bubbles: true,
            composed: true
        }

        this.dispatchEvent(new CustomEvent('toggleModal', options));
    }

    render() {
        return html`
            <div class="modal-shadow">
                <div class="modal">
                    <button @click=${this._switch_modal} class="closeIcon">${closeIcon}</button>
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('pokemon-modal', PokemonModal);