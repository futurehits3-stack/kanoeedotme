import { defineStore } from "pinia";
export const useBookMarkStore = defineStore('bookmarkStore', {
    state: () => ({
        bookmarks: [],
        bookmarksCount : 0,
        bookmarkFound : false
    }),
    actions : {
        getAllBookmarks(){
            const bookMarkStorage = localStorage.getItem('wordBookMarks')
            if(typeof bookMarkStorage === 'string'){
                const parsed = JSON.parse(bookMarkStorage)

                if(parsed.length > 0){
                    this.bookmarks = parsed
                    this.bookmarksCount = parsed.length
                    // for (let index = 0; index < parsed.length; index++) {
                    //     const e = parsed[index];
                    //     console.log(e)
                    // }
                }
            }
            

        },
        getBookmarks (id) {
            const bookMarkStorage = localStorage.getItem('wordBookMarks')
            if(bookMarkStorage === null){
                return this.bookmarks
            }else{
                const bookmarks = JSON.parse(bookMarkStorage)
                let found = false
                if(bookmarks.length > 0){

                    for (let index = 0; index < bookmarks.length; index++) {
                        const e = bookmarks[index];
                        if(e.id === id){
                            found = true
                            this.bookmarkFound = true
                            return
                        }
                        if(!found){
                            this.bookmarkFound = false
                        }
                        
                    }
                    this.bookmarks = bookmarks
                    
                }
            }
        },
        addToBookmarks (title, exercpt, slug,dateWordPublished, id, timetoread, author){
            const bookMarkStorage = localStorage.getItem('wordBookMarks')
            const obj = {
                title,
                exercpt,
                slug: slug.current,
                dateWordPublished,
                id,
                timetoread,
                author
            }
            if(bookMarkStorage === null){
                localStorage.setItem('wordBookMarks',JSON.stringify([obj]))
                this.bookmarksCount = 1
                this.bookmarks.push(obj)
                this.bookmarkFound = true
                return 
            }else{
                const bookmarkData = JSON.parse(bookMarkStorage)
                let found = false
                if(bookmarkData.length > 0){
                    for (let index = 0; index < bookmarkData.length; index++) {
                        const e = bookmarkData[index];
                        if(e.id === id){
                            found = true
                        }
                    }
                    if(!found){
                        let newArr = bookmarkData
                        newArr.push(obj)
                        localStorage.setItem('wordBookMarks',JSON.stringify(newArr))
                        this.bookmarksCount = newArr.length
                        this.bookmarks = newArr
                        this.bookmarkFound = true
                        return 
                    }
                }
            }
            

        },
        removeBookmark(id) {
            const bookMarkStorage = localStorage.getItem('wordBookMarks')
            const parsed = JSON.parse(bookMarkStorage)
            let found = false
            let newArr = []
            if(parsed.length > 0){
                for (let index = 0; index < parsed.length; index++) {
                    const el = parsed[index];
                    if(el.id === id){
                        found = true
                    }else{
                        newArr.push(el)
                    }
                }
                if(found){
                    localStorage.setItem('wordBookMarks',JSON.stringify(newArr))
                    this.bookmarksCount = newArr.length
                    this.bookmarks = newArr
                    this.bookmarkFound = false
                }
            }
        }
    }   
})