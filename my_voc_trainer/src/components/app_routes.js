import React from 'react';
import {Route, Routes} from 'react-router';
import { publicRoutes } from '../routers';
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
        return (
            <Routes>
                {publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        );
});
 
export default AppRouter;