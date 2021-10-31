
const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul")
const nickNameForm = document.querySelector("#nickname")
const messageForm = document.querySelector("#message")

function makeMessage(type, payload){
    const message = {type, payload}
    return JSON.stringify(message);
}
socket.addEventListener("open ",() =>{
    console.log("Connected");
});

socket.addEventListener("message", (message) =>{
    parsedMessage = JSON.parse(message.data)
    const li = document.createElement("li")
    li.innerText += `${parsedMessage.nickname}: ${parsedMessage.payload}`;
    messageList.append(li);
})

socket.addEventListener("close",() =>{
    console.log("Disconnected Server")
})

nickNameForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const input = nickNameForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value));
    input.value = "";
})

messageForm.addEventListener("submit", (event) => {
    
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("message", input.value));
    input.value = "";
})