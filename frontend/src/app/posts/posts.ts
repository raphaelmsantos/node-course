import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { Post } from '../models';

@Component({
  selector: 'app-posts',
  imports: [FormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts implements OnInit {
  private api = inject(Api);

  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  editingId = signal<string | null>(null);
  draft: Partial<Post> = {};

  newPost: Omit<Post, '_id'> = { name: '', description: '', age: 0 };

  ngOnInit() {
    this.load();
  }

  isNewValid(): boolean {
    const name = this.newPost.name?.trim();
    const description = this.newPost.description?.trim();
    const age = this.newPost.age;
    return !!name && !!description && age != null && age >= 1 && age <= 150;
  }

  create() {
    if (!this.isNewValid()) return;
    this.api.createPost(this.newPost).subscribe({
      next: () => {
        this.newPost = { name: '', description: '', age: 0 };
        this.load();
      },
      error: () => this.error.set('Failed to create post')
    });
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getPosts().subscribe({
      next: (res) => {
        this.posts.set(res.posts);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load posts');
        this.loading.set(false);
      }
    });
  }

  startEdit(post: Post) {
    this.editingId.set(post._id);
    this.draft = { name: post.name, description: post.description, age: post.age };
  }

  cancelEdit() {
    this.editingId.set(null);
    this.draft = {};
  }

  isDraftValid(): boolean {
    const name = this.draft.name?.trim();
    const description = this.draft.description?.trim();
    const age = this.draft.age;
    return (
      !!name &&
      !!description &&
      age != null &&
      age >= 1 &&
      age <= 150
    );
  }

  saveEdit(id: string) {
    this.api.updatePost(id, this.draft).subscribe({
      next: () => {
        this.cancelEdit();
        this.load();
      },
      error: () => this.error.set('Failed to update post')
    });
  }

  remove(post: Post) {
    if (!confirm(`Delete "${post.name}"?`)) return;
    this.api.deletePost(post._id).subscribe({
      next: () => this.posts.update((list) => list.filter((p) => p._id !== post._id)),
      error: () => this.error.set('Failed to delete post')
    });
  }
}
