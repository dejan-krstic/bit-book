export default class User {
    constructor(user) {
        this.name = user.name
        this.about = user.about
        this.aboutShort = user.aboutShort
        this.avatarUrl = user.avatarUrl
        this.lastPostDate = this.getDate(user.lastPostDate)
        this.postsCount = user.postsCount
        this.commentsCount = user.commentsCount
        this.id = user.id
    }
    getDate(date) {
        if (date) {
            /* date = date + 'z';
            date = new Date(date);
            date = date + 'z'; */
            date = new Date(date);
            if (date.toISOString().substring(0, 10) === (new Date().toISOString()).substring(0, 10)) {
                console.log('nas datum: ', date.toISOString(), 'new Date: ', new Date().toISOString());
                date = JSON.stringify(date);
                return date.substring(12, 17)
            } else {
                console.log(`${date.getDate()}. ${date.getMonth()+1}. ${date.getHours()}:${date.getMinutes()}`);
                return `${date.getDate()}. ${date.getMonth()+1}. ${date.getHours()}:${date.getMinutes()}`
            }
        } else {
            return 'no posts yet :('
        }
    }
}