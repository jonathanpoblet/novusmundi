import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Gallery from '../screens/Gallery/Gallery';
import Home from '../screens/Home/Home';
import Post from '../screens/Post/Post';
import User from '../screens/User/User';

const Stack = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path='/'
                        element={ <Home /> }
                    />
                    <Route
                        path='/gallery'
                        element={ <Gallery /> }
                    />
                    <Route
                        path='/post'
                        element={ <Post /> }
                    />
                    <Route
                        path='/user'
                        element={ <User/> }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default Stack;