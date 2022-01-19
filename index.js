const express = require('express')
const path = require('path')
const socketIo = require('socket.io')
const PORT = process.env.PORT
const app = express()

app.use('/grupo1', express.static(path.join(__dirname, 'public')))
app.use('/grupo2', express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT, ()=>{
    console.log('Server Running')
})

let messages = {grupo1: [], grupo2: []}

const io = socketIo(server);

const grupo1 = io.of('/grupo1').on('connection', (socket)=>{
    console.log('New connection')
    socket.emit('update_messages', messages.grupo1)

    socket.on('new_message', (data)=>{
        messages.grupo1.push(data)
        
        grupo1.emit('update_messages', messages.grupo1)
    })
})

const grupo2 = io.of('/grupo2').on('connection', (socket)=>{
    console.log('New connection')
    socket.emit('update_messages', messages.grupo2)

    socket.on('new_message', (data)=>{
        messages.grupo2.push(data)

        grupo2.emit('update_messages', messages.grupo2)
    })
})



// io.on('connection', (socket) =>{

//     console.log('New connection!')
//     socket.emit('update_messages', messages)

//     socket.on('new_message', (data)=>{
//         messages.push(data)

//         io.emit('update_messages', messages)
//     })

// })
