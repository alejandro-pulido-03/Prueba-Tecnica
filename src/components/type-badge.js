import { css, html, LitElement } from "lit";
import { styleMap } from "lit/directives/style-map.js";


class TypeBadge extends LitElement {

    static properties = {
        type_obj: { type: Object },
        _styles: { state: true }
    }

    static styles = css`
        .badge{
            padding: 2px 8px 0px 8px;

            border-radius: 10px;
            background-color: black;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this._styles = { color: this.type_obj.color };
    }

    render() {
        return html`
            <span class="badge" style=${styleMap(this._styles)}>${this.type_obj.type}</span>
        `
    }
}

customElements.define("type-badge", TypeBadge)