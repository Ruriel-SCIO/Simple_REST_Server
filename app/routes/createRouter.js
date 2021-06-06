const glob = require('glob')
const Router = require('express').Router
/**
 * Reads the current folder and creates a router with all the defined endpoints.
 * @returns The mapped router.
 */
module.exports = () => glob
    .sync('**/*.js', { cwd: `${__dirname}/` })
    .map(filename => require(`./${filename}`))
    .filter(router => Object.getPrototypeOf(router) == Router)
    .reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true }))