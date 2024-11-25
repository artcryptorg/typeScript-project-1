class Post {
    constructor(public id: number, public date: Date, public title: string) { }
}

class PostList {
    private posts: Post[] = [];

    public sortBy(sortField: "id" | "date", sortOrder: "increase" | "decrease"): void {
        const param = sortOrder === "increase" ? 1 : -1;

        this.posts = this.posts.sort((a, b) => {
            let comparison = 0;

            if (sortField === "id") {
                comparison = a.id - b.id;
            } else if (sortField === "date") {
                comparison = a.date.getTime() - b.date.getTime();
            }

            return comparison * param;
        });
    }
    public addPost(post: Post) {
        this.posts.push(post);
    }

    public getPosts() {
        return this.posts;
    }

    public count() {
        return this.posts.length;
    }

    public getIterator(sortField: "id" | "date", sortOrder: "increase" | "decrease") {
        return new UserItearator(sortField, sortOrder, this);
    }
}
interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

class UserItearator implements IIterator<Post> {
    private position: number = 0;

    constructor(sortField: "id" | "date", sortOrder: "increase" | "decrease", private userList: PostList) {
        this.userList = userList;
        this.userList.sortBy(sortField, sortOrder);
    }

    current(): Post | undefined {
        return this.userList.getPosts()[this.position];
    }
    next(): Post | undefined {
        this.position += 1;
        return this.userList.getPosts()[this.position];
    }
    prev(): Post | undefined {
        this.position -= 1;
        return this.userList.getPosts()[this.position];
    }
    index(): number {
        return this.position;
    }
}

