const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

   await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse("Note text was added"))
}

 async function getNotes(){
     const notes =  await fs.readFile(notesPath, {encoding:"utf-8"})
     return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []

}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue("all list:"))
    notes.forEach(note => {
        console.log(chalk.blue(note.id,note.title))
    })
}
// node index remove --id=1648592048596
async function removeNote(id){
    const notes = await getNotes()
    const updatedNotes = notes.filter((n)=> n.id !==id)

    if(updatedNotes.length !== notes.length){
        await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
        console.log(chalk.green(`note with id: "${id}" was deleted`))
    }else{
        console.log(chalk.green(`note with id: "${id}" no exist`))
    }

}
async function updateNote(data) {
    const notes = await getNotes()
    const noteIndex = notes.findIndex(n => n.id === data.id)
    if(noteIndex) {
        notes[noteIndex] = { ... notes[noteIndex], ...data }
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.bgBlue(`note with id: "${data.id}" was changed`))
    }
}
module.exports = {
    addNote, getNotes, removeNote, updateNote
}