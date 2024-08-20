import { css, html, LitElement } from "lit";
import { pokeball } from "../assets/icons";

export class Header extends LitElement {

    static styles = css`
        header{
            position: relative;
            padding: 30px 0 0 50px;
        }

        h1{
            margin: 0;

            font-size:4rem;

            color: black
        }

        svg{
            position: absolute;
            top: -10vw;
            left: -10vw;
            z-index: -1;

            width: 40vw;
            height: 40vw; 

            transform: rotate(120deg);
        }

        path{
            opacity: 0.20 !important;
        }
    `

    render() {
        return html`
            <header>
                <h1>Pokedex</h1>
                ${pokeball}
            </header>
        `
    }
}

customElements.define('header-app', Header);