import { v4 as createUuid } from "uuid";
import { Tweet, TweetType } from "./tweet.model";
import { replies } from "../database/replies";
import { tweets } from "../database/tweets";

export class User {
    private _id: string;
    private _followers: User[];

    constructor(private _name: string, private _username: string, private _email: string, private _password: string) {
        this._id = createUuid();
        this._followers = [];
    }

    public get id(): string {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get tweets(): Tweet[] {
        return tweets.filter((tweet) => tweet.user.id === this.id);
    }

    public sendTweet(content: string, type: TweetType = TweetType.Normal) {
        const tweet = new Tweet(this, content, type);
        tweets.push(tweet);
    }

    public follow(user: User) {
        this._followers.push(user);
    }

    public showTweets() {
        const userTweets = tweets.filter((tweet) => tweet.user.id === this.id);

        userTweets.forEach((tweet) => tweet.show());
    }

    public showFeed() {
        this._followers.forEach((user) => {
            user.showTweets();
        });
    }

    public toJson() {
        return {
            id: this._id,
            name: this._name,
            username: this._username,
            email: this._email,
        };
    }
}
