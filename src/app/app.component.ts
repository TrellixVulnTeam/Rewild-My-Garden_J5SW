import { Component } from '@angular/core';
import { Post } from './form-page/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Rewild-My-Garden';

  storedPosts: Post[] = [];

  onPostAdded(post: Post){
    this.storedPosts.push(post);
  }
}

