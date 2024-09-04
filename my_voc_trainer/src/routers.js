import { START_ROUTE, LEARN_ROUTE, WRITE_ROUTE } from "./utils/const";
import Start from "./page/start";
import Learn from "./page/learn";
import Write from "./page/write";

export const publicRoutes = [
    {
        path: START_ROUTE,
        Component: Start
    },

    {
        path: LEARN_ROUTE,
        Component: Learn
    },

    {
        path: WRITE_ROUTE,
        Component: Write
    }
];