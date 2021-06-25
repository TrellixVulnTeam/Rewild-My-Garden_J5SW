import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";

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

  saveForm(form: NgForm){
    //If the entered content is invalid, don't submit
    if(form.invalid){
      return;
    }
    //A post can be composed of the results from mutliple text bozes!
    const post: Post = { 
      ourInput: form.value.ourInput
    };
    this.formInputCreated.emit(post);
  }
}
