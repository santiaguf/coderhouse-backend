import fs from 'fs'

class Todos {

    constructor() {
        this.todos = []
    }

    list() {
        return this.todos
    }

    add(title) {
        const todo = {
            title,
            complete: false
        }
        this.todos.push(todo)
    }

    complete(title) {
        if (this.todos.length === 0) {
            throw new Error('No hay tareas')
        }

        const todoFound = this.todos.find(t => t.title === title)

        if (!todoFound) { throw new Error('Tarea no encontrada') }

        todoFound.complete = true
    }

    saveToFileCb(cb) {
        let fileContents = ''
        this.todos.forEach(todo => {
            fileContents += `${todo.title},${todo.complete}`
        })
        fs.writeFile('todos.txt', fileContents, cb)
    }

    saveToFilePromise() {
        let fileContents = ''
        this.todos.forEach(todo => {
            fileContents += `${todo.title},${todo.complete}`
        })

        return fs.promises.writeFile('todos.txt', fileContents)
    }

}

export default Todos