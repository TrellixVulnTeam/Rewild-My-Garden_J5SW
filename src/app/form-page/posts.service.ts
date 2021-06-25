import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

// This syntax is a shortcut equivalent of adding postsService to the 'providers' 
// section of app.module.ts
@Injectable({providedIn: 'root'})
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPost(){
        // This sytax allows us to remove the elements from posts and add them 
        // to a new array- we are not sending the array itself
        // We need the concept of 'observables' in conjunction with this, because
        // when create the copy of the array, we would naturally copy the 'original' array-
        // i.e the one that is empty
        return [...this.posts];
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(ourInput: string){
        const post: Post = {ourInput: ourInput};
        this.posts.push(post);
        //This is the equivalent of .emit- it sets a copy of the posts after they have been updated
        //The three methods that can be called on our observable are .next(), .error() and .complete()
        this.postsUpdated.next([...this.posts]);
    }
}