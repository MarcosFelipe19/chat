const room = window.location.pathname.replace(/\//g,'')

const socket = io(`https://projects-chat1-portfolio.herokuapp.com/${room}`)

let user = null


socket.on('update_messages', (messages)=>{

    updateMessageOnScreen(messages)

})

function updateMessageOnScreen(messages){
    const div_message = document.querySelector('#messages')

    let list_messages = '<ul>'
    messages.forEach(message => {
        list_messages += `<li>${message.user}: ${message.msg}</li>`
    });
    list_messages += '</ul>'

    div_message.innerHTML = list_messages   
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#message_form')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()

        if(!user){
            alert('Defina um usuário!')
            return
        }
        const message = document.forms['message_form_name']['msg'].value
        document.forms['message_form_name']['msg'].value = ''

        socket.emit('new_message', {user:user, msg:message})
    })


    const userform = document.querySelector('#user_form')

    userform.addEventListener('submit', (e)=>{
        e.preventDefault()
        user = document.forms['user_form_name']['user'].value

        userform.parentNode.removeChild(userform)
       
    })
})