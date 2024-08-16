
import { html, LitElement } from "lit";
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
        `
    }
}

customElements.define("root-element", Root);