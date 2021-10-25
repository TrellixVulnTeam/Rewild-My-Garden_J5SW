import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  formInput = '';

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {}

  saveForm(form: NgForm){
    //If the entered content is invalid, don't submit
    if(form.invalid){
      return;
    }
    //A post can be composed of the results from mutliple text boxes!
    this.postsService.addPost(form.value.ourInput);
    form.resetForm();
  }
}
