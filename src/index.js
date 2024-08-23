
import { css, html, LitElement } from "lit";
import "./components/header";
import "./pages/pokemon-detail";
import "./pages/pokemon-list";
import { initRouter } from "./utils/router";
class Root extends LitElement {

    firstUpdated() {
        super.firstUpdated();
        initRouter.call(this);
    }

    static styles = css`
        :host{
            display:flex;
            flex-direction: column;
            min-height: 100vh;
        }

        #outlet{
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    `

    render() {
        return html`
            <header-app></header-app>
            <main id="outlet">

            </main>

        `
    }
}

customElements.define("root-element", Root);