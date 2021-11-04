import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-text-output',
  templateUrl: './text-output.component.html',
  styleUrls: ['./text-output.component.scss']
})
export class TextOutputComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  //The subscription object is used to manage the subscription- when we have multiple pages
  // &c, we want to make sure that we're not holding data when we're not putting anything
  // on the DOM, as otherwise this could cause a memory leak. This is when Subscription
  // helps manage
  private postsSub: Subscription = new Subscription;

  //By adding the 'public' keyword, you are creating a shortcut equivalent for :
  //   postsService: PostsService;
  //   constructor(postsService: PostsService){
  //     this.postsService = postsService;
  //    }
  constructor(public postsService: PostsService){}

  // This function is automatically executed by angular when this compenent is created
  // It is where you should do basic initialisation tasks
  ngOnInit() {
    this.posts = this.postsService.getPost();
    //here we are subscribing to the listener
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
          this.posts = posts;
      });
  }

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy(){
      //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
      this.postsSub.unsubscribe();
  }
}
