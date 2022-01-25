const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgGray('Here is the list of all notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    if (notes.findIndex(elem => elem.id === id) !== -1) {
        await saveNotes(notes.filter((elem => elem.id !== id)))
        console.log(chalk.bgGreen(`Note with id ${id} has been deleted!`))
    } else {
        console.log(chalk.bgRed(`Note with id ${id} not found!`))
    }
}

module.exports = {
    addNote, printNotes, removeNote
}