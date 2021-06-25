import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-text-output',
  templateUrl: './text-output.component.html',
  styleUrls: ['./text-output.component.scss']
})
export class TextOutputComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}

  @Input() posts: Post[] = [];
}
