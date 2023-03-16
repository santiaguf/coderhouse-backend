'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/sin-controller', async ({request, view} ) => {
    const {palabras} = request.get()
    console.log('sin controller: ', palabras)
    let arrayPalabras = palabras.split(' ')
    let arrayPalabrasInvertidas = [...arrayPalabras].reverse()

    return view.render('palabras', {titulo: 'Sin controller', arrayPalabras, arrayPalabrasInvertidas})

})