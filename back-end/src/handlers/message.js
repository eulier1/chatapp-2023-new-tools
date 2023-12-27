import { postMessage } from "../models/message";

export const createMessage = (io) => async ({text, user}) => {
    console.log('create messsage', text, user )
    const messageData = {
        data: text,
        userId: user.id
    }
    const message = await postMessage(messageData)
    io.emit('create_message', {text, user});
}