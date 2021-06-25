import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  formInput = '';
  @Output() formInputCreated = new EventEmitter<Post>();
  constructor() { }
  ngOnInit(): void {}

  saveInfo(){
    //A post can be composed of the results from mutliple text bozes!
    const post: Post = { 
      ourInput: this.formInput 
    };

    this.formInputCreated.emit(post);
  }
}
