import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  visibility = 'shown';

  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
      'author': '',
      'comment': ''
  };

  validationMessages = {
      'author': {
          'required':    'Author is required',
          'minlength':   'Author must be at least 2 characters long.'
      },
      'comment': {
          'required':    'Comment is required'
      },
  };

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {

      this.createForm();
  }

  ngOnInit() {
      this.dishService.getDishIds().subscribe(
          dishIds => this.dishIds = dishIds,
          errmess => this.errMess = <any>errmess);
    this.route.params
      .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); } ))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
         errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  createForm() {
      this.commentForm = this.fb.group({
          author: ['', [ Validators.required, Validators.minLength(2) ] ],
          rating: 5, 
          comment: ['', [ Validators.required ] ]
      });

      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onSubmit() {
      this.comment = this.commentForm.value;
      console.log(this.comment);
      this.commentForm.reset({
          author: '',
          rating: 5,
          comment: ''
      });

      // Add the comment to the list of comments
      var now = new Date();
      var nowISO = now.toISOString();
      this.comment.date = nowISO;
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
          .subscribe(dish => { this.dish = dish; console.log(this.dish); });
      this.comment = null;
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
        return;
    }

    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  goBack(): void {
      this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
}
