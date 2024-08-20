
import { html, LitElement } from "lit";
import "./components/header";
import "./pages/pokemon-detail";
import "./pages/pokemon-list";
import { initRouter } from "./utils/router";
class Root extends LitElement {

    firstUpdated() {
        super.firstUpdated();
        initRouter.call(this);
    }



    render() {
        return html`
            <header-app></header-app>
            <main id="outlet">

            </main>

        `
    }
}

customElements.define("root-element", Root);