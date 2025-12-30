const STORAGE_KEY = 'JarvisJrChats'

export { saveChatToLS, loadChatFromLS, getAllChatsFromLS, removeChatFromLS }

const saveChatToLS = (chatName, chat) => {
    if (!chat.length) return false

    const allCurrentChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    allCurrentChats[chatName] = chat
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentChats))
    return true
}

const loadChatFromLS = (chatName) => {
    const allCurrentChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return allCurrentChats[chatName] || []
}

const getAllChatsFromLS = () => {
    const chats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return Object.keys(chats)
}

const removeChatFromLS = (chatName) => {
    const allCurrentChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    delete allCurrentChats[chatName]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentChats))
}
