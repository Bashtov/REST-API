const express = require('express')
const app = express()
const path = require('path') //для работы с файловой системой
const {v4} = require('uuid')

let CONTACTS = [
    {id: v4(), name: 'Bla', value: '1234', marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() =>{
        res.status(200).json(CONTACTS)
    }, 1000)
})

// POST создает данные
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Contact deleted'})
})

// PUT меняет модель
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})




app.use(express.static(path.resolve(__dirname, 'client'))) //определяем статическую папку
app.get('*', (req, res) => { //get по любым запросам
    res.sendFile(path.resolve(__dirname, 'client', 'index.html')) //возвращаем путь к интересующему файла, отправляем index на frontend
})

app.listen(3000, ()=>console.log('Server has been started on port 3000...'))