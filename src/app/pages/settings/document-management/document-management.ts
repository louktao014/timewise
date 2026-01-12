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
  selectedDocumentType = signal<'request' | 'warning' | 'certificate' | 'orther'>('request');
  public documentTypes = ['request', 'warning', 'certificate', 'orther'];

  constructor() {
    this.documents.set([...this.documentService.getDocuments()]);
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
      this.documentService.updateDocument(
        this.editingDocument()!.id,
        this.editingDocument()!.title
      );
      this.editingDocument.set(null);
      this.documents.set(this.documentService.getDocuments());
    } else {
      this.documents.set(this.documentService.getDocuments());
    }
  }

  cancelEdit() {
    this.editingDocument.set(null);
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id);
    this.documents.set(this.documentService.getDocuments());
  }
  selectDocumentType(event: Event) {
    const element = event.target as HTMLSelectElement;
    const type = element.value as 'request' | 'warning' | 'certificate' | 'orther';
    console.log('Selected document type:', type);
    if (type === null) {
      this.selectedDocumentType.set('request');
    } else {
      this.selectedDocumentType.set(type);
    }
  }

  selectedType() {
    return this.selectedDocumentType();
  }
}
