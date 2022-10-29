export default interface MessageItem {
    id?: string,
    text: string,
    author: string | null,
    timeStamp: Date
}