const state = {
  room: {"hello": "world"},
  messages: {}
}

const roomUid = "123456";

const newMessage = {createdAt: "12121", message: "12121", roomUid: "123456"}

const newState = {
  ...state,
  messages: {
    [roomUid]: [...state.messages[roomUid], newMessage]
  }
}

console.log("NEW STATE: ", newState.messages)