import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  user: any;
  private endSubscription: Subject<void> = new Subject();
  constructor(private postsService: PostsService,private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserSubject() 
    this.getPosts();
  }

  getPosts() {
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.endSubscription))
      .subscribe({
        next: (res: any[]) => {
          this.posts = res;
        },
      });
  }

  getUserSubject() { 
    this.authService
      .getUserSubject()
      .pipe(takeUntil(this.endSubscription))
      .subscribe({
        next: (res) => { 
          this.user = res;
        },
      });
  } 

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }
}
