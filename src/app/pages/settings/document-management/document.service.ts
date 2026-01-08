import { Injectable, signal } from '@angular/core';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents = signal<Document[]>([]);

  constructor() {
    // Mock data
    this.documents.set([
      { id: '1', name: 'Driver\'s License' },
      { id: '2', name: 'Passport' },
      { id: '3', name: 'Social Security Card' }
    ]);
  }

  getDocuments() {
    return this.documents();
  }

  addDocument(name: string) {
    const newDocument: Document = {
      id: new Date().getTime().toString(),
      name
    };
    this.documents.set([...this.documents(), newDocument]);
  }

  updateDocument(id: string, name: string) {
    this.documents.set(
      this.documents().map(doc => (doc.id === id ? { ...doc, name } : doc))
    );
  }

  deleteDocument(id: string) {
    this.documents.set(this.documents().filter(doc => doc.id !== id));
  }
}
