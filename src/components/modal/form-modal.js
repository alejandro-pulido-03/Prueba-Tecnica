import { css, html, LitElement } from "lit";

class FormModal extends LitElement {

    static properties = {
        evolution: { type: Object },
        warning_trigger: { type: Boolean, state: true },
        is_repeated: { type: Boolean, state: true },
        image_url: { type: String, state: true }
    }

    connectedCallback() {
        super.connectedCallback();
        this.image_url = "src/assets/pokemon/" + this.evolution?.image;
    }

    static styles = css`
        .form-modal button {
            background-color: #3e3e3e;
            color: white;
            border: none;
            padding: 10px 0;
            margin-top: 10px;
            font-size: 16px;
            border-radius: 4px;
            width: 20%;
            cursor: pointer;
        }
        .form-modal form {
            display: flex;
            flex-direction: column;
            
            gap: 15px;
        }

        .form-modal input {
            border: none;
            border-radius: 4px;
            padding: 10px;
            font-size: 16px;

            background-color: #3e3e3e;
            color: white;
        }

        .form-modal input[type="checkbox"] {
            margin: 0;
            align-self: flex-start;
            width: 20px;
            height: 20px;

            cursor: pointer;
        }

        .form-modal input[type="file"]{
            display: none;
        }

        .input-group{
            display:flex;
            flex-direction: column;
        }

        .modal-header{
            position: absolute;
            top:0;
            left:0;
            padding: 20px;
            font-weight: 800;
        }

        .img-input{
            position: relative;

            width: min-content;
        }

        .img-input:hover{
            filter: opacity(0.5);
        }

        .img-input:hover::before{
            content: "";
            position: absolute;
            width:100%;
            height: 100%;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g><path fill='none' d='M0 0h24v24H0z'/><path d='M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z'/></g></svg>");
            background-size: 40px 40px;
            background-position: center;
            background-repeat: no-repeat;
        }
    `;

    modal() {
        return html`        
            <form class="form-modal">
                <div class="input-group">
                <label>Imagen</label>
                <label for="img-file" class="img-input">
                    <img src=${this.image_url || ""} height="100px" style=" width: fit-content;" />
                </label>
                    <input id="img-file" type="file" @change=${this._img_name}>
                </div>
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
                        ?checked="${this.is_repeated}"
                        @change="${this._handleCheckboxChange}"
                    >
                </div>
                <button type="button" @click=${this._send_form}>Enviar</button>
            </form>
        
    `
    }

    warningModal() {
        return html`        
        <div class="modal-header">
            <span>Pokemon repetido</span>
        </div>
        <p>Puede cambiarlo en el punto mas cercano</p>
        `
    }

    _img_name(e) {
        const input = e.target;
        if (input.files?.length) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.image_url = reader.result;
            };

            reader.readAsDataURL(file);
        }
        this.requestUpdate();
    }

    _send_form() {
        if (this.is_repeated) {
            this.warning_trigger = !this.warning_trigger;
            this.requestUpdate();
        } else {
            this.warning_trigger = false;
            this.dispatchEvent(new CustomEvent('toggleModal', { bubbles: true, composed: true }));
        }
    }

    _handleCheckboxChange(e) {
        this.is_repeated = e.target.checked;
    }

    render() {
        return html`
            ${this.warning_trigger ? this.warningModal() : this.modal()}
        `
    }
}

customElements.define('form-modal', FormModal);