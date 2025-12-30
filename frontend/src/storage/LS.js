const STORAGE_KEY = 'JarvisJrChats'

export { saveChatToLS, loadChatFromLS, getAllChatsFromLS, removeChatFromLS, renameChatInLS };

const renameChatInLS = (oldChatName) => {
    const allCurrentChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (!allCurrentChats[oldChatName]) return false
    let newChatName = "";
    while (newChatName?.length === 0 || allCurrentChats[newChatName]) {
        newChatName = prompt("Enter the new name for the chat:", oldChatName)
    }
    allCurrentChats[newChatName] = allCurrentChats[oldChatName]
    delete allCurrentChats[oldChatName]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentChats))
    return true
}

const saveChatToLS = (chatName, chat) => {
    if (!chatName?.length) return false
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
    if (!(chatName in allCurrentChats)) return false
    delete allCurrentChats[chatName]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentChats))
    return true
}
