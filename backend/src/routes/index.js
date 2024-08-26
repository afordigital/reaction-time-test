import express from 'express';
import user from './user.js';

// This function returns a router that contains all the routes
export default () => {
    const router = express.Router();
    // Add the routes to the router
    user(router);

    return router;
}