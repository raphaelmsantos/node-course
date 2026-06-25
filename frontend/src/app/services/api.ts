import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, RegisterUser } from '../models';

@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private readonly base = '/api/v1';

  // Users
  registerUser(user: RegisterUser): Observable<unknown> {
    return this.http.post(`${this.base}/users/`, user);
  }

  // Posts
  getPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.base}/posts/`);
  }

  createPost(post: Omit<Post, '_id'>): Observable<unknown> {
    return this.http.post(`${this.base}/posts/`, post);
  }

  getPost(id: string): Observable<{ post: Post }> {
    return this.http.get<{ post: Post }>(`${this.base}/posts/${id}`);
  }

  updatePost(id: string, post: Partial<Post>): Observable<unknown> {
    return this.http.put(`${this.base}/posts/${id}`, post);
  }

  deletePost(id: string): Observable<unknown> {
    return this.http.delete(`${this.base}/posts/${id}`);
  }
}
