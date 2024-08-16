import { Router } from "@vaadin/router";

export let router;

export function initRouter() {
    router = new Router(this.shadowRoot);

    router.setRoutes([
        {
            path: "/",
            component: "pokemon-list",
        },
        {
            path: "/:pokemon",
            component: "pokemon-detail"
        }
    ]);
}