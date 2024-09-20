import Func "mo:base/Func";
import Text "mo:base/Text";

import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Array "mo:base/Array";

actor {
    // Data structure for a blog post
    public type Post = {
        id: Nat;
        title: Text;
        body: Text;
        author: Text;
        timestamp: Time.Time;
    };

    // Stable variable to store posts
    stable var posts: [Post] = [];

    // Function to add a new post
    public func addPost(title: Text, body: Text, author: Text) : async Nat {
        // Generate a new post ID
        let id = if (Array.size(posts) == 0) {
            1;
        } else {
            posts[0].id + 1;
        };
        // Create a new post
        let newPost: Post = {
            id = id;
            title = title;
            body = body;
            author = author;
            timestamp = Time.now();
        };
        // Prepend the new post to the list
        posts := Array.append([newPost], posts);
        return id;
    };

    // Function to get all posts
    public query func getPosts() : async [Post] {
        return posts;
    };
};
