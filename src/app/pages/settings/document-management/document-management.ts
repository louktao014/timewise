import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './document.model';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.html',
  styleUrls: ['./document-management.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentManagementComponent {
  private documentService = inject(DocumentService);

  public documents = signal<Document[]>([]);
  public selectedFile = signal<File | null>(null);
  public editingDocument = signal<Document | null>(null);

  constructor() {
    this.documents.set([...this.documentService.getDocuments()]);
    console.log('this.documents', this.documents());
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  uploadDocument() {
    const file = this.selectedFile();
    if (file) {
      this.documentService.addDocument(file.name);
      this.documents.set(this.documentService.getDocuments());
      this.selectedFile.set(null);
    }
  }

  editDocument(document: Document) {
    this.editingDocument.set(document);
  }

  updateDocument() {
    if (this.editingDocument()) {
      this.documentService.updateDocument(this.editingDocument()!.id, this.editingDocument()!.name);
      this.editingDocument.set(null);
      this.documents.set(this.documentService.getDocuments());
    } else {
      this.documents.set(this.documentService.getDocuments());
    }
  }

  cancelEdit() {
    this.editingDocument.set(null);
  }

  deleteDocument(id: string) {
    this.documentService.deleteDocument(id);
    this.documents.set(this.documentService.getDocuments());
  }
}
