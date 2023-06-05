import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from '../router';
import {IRoute} from "../router";
import Login from '../pages/Login';
import Event from '../pages/Event';

import {useTapedSelector} from "../hooks/useTapedSelector";

const AppRouter = () => {
    const {isAuth} = useTapedSelector(state => state.auth);

    return (
        isAuth ?
            <Routes>
                {privateRoutes.map((route: IRoute) =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<Event/>}
                    />
                )}
                <Route path='*' element={<Navigate to={RouteNames.EVENT}/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route: IRoute) =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<Login/>}
                    />
                )}
                <Route path='*' element={<Navigate to={RouteNames.LOGIN}/>}/>
            </Routes>
    );
};

export default AppRouter;