import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DocumentService } from './document.service';
import { Document, DocumentType } from './document.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.html',
  styleUrls: ['./document-management.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentManagementComponent {
  private documentService = inject(DocumentService);
  private userService = inject(UserService);

  public documents = signal<Document[]>([]);
  public selectedFile = signal<File | null>(null);
  public editingDocument = signal<Document | null>(null);
  selectedDocumentType = signal<DocumentType>(DocumentType.REQUEST);
  public documentTypes = [
    DocumentType.REQUEST,
    DocumentType.WARNING,
    DocumentType.CERTIFICATE,
    DocumentType.OTHER,
  ];

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
      const currentUser = this.userService.currentUser();
      const params = {
        title: file.name,
        type: this.selectedDocumentType(),
        lastUpdate: new Date(new Date().getTime()).toISOString().split('T')[0],
        updatedBy: currentUser?.name,
      } as Document;
      this.documentService.addDocument(params);
      this.documents.set([...this.documentService.getDocuments()]);
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
    const type = element.value as DocumentType;
    if (type === null) {
      this.selectedDocumentType.set(DocumentType.REQUEST);
    } else {
      this.selectedDocumentType.set(type);
    }
  }

  selectedType() {
    return this.selectedDocumentType();
  }
}
