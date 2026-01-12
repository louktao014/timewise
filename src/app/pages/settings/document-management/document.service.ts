import { Injectable, signal } from '@angular/core';
import { Document, DocumentType } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // private documents = signal<Document[]>([]);
  private documents = signal<Document[]>([
    {
      id: 1,
      title: 'Leave Request',
      type: DocumentType.REQUEST,
      lastUpdate: '2023-10-27',
      updatedBy: 'John Doe',
    },
    {
      id: 2,
      title: 'Performance Warning',
      type: DocumentType.WARNING,
      lastUpdate: '2023-10-26',
      updatedBy: 'John Doe',
    },
    {
      id: 3,
      title: 'Training Certificate',
      type: DocumentType.CERTIFICATE,
      lastUpdate: '2023-10-25',
      updatedBy: 'John Doe',
    },
    {
      id: 4,
      title: 'Sick Leave Request',
      type: DocumentType.REQUEST,
      lastUpdate: '2023-10-24',
      updatedBy: 'John Doe',
    },
    {
      id: 5,
      title: 'Equipment Return Warning',
      type: DocumentType.WARNING,
      lastUpdate: '2023-10-23',
      updatedBy: 'John Doe',
    },
  ]);

  constructor() {}

  getDocuments() {
    return this.documents();
  }

  addDocument(name: string) {
    const newDocument: Document = {
      id: this.documents().length + 1,
      title: name,
      type: DocumentType.REQUEST,
      lastUpdate: new Date(new Date().getTime()).toISOString().split('T')[0],
    };
    this.documents.set([...this.documents(), newDocument]);
  }

  updateDocument(id: number, name: string) {
    this.documents.set(this.documents().map((doc) => (doc.id === id ? { ...doc, name } : doc)));
  }

  deleteDocument(id: number) {
    this.documents.set(this.documents().filter((doc) => doc.id !== id));
  }
}
