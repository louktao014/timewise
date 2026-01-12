import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Document, DocumentType } from '../settings/document-management/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.html',
  styleUrls: ['./document.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  public documents = signal<Document[]>([
    { id: 1, title: 'Leave Request', type: DocumentType.REQUEST, lastUpdate: '2023-10-27' },
    { id: 2, title: 'Performance Warning', type: DocumentType.WARNING, lastUpdate: '2023-10-26' },
    {
      id: 3,
      title: 'Training Certificate',
      type: DocumentType.CERTIFICATE,
      lastUpdate: '2023-10-25',
    },
    { id: 4, title: 'Sick Leave Request', type: DocumentType.REQUEST, lastUpdate: '2023-10-24' },
    {
      id: 5,
      title: 'Equipment Return Warning',
      type: DocumentType.WARNING,
      lastUpdate: '2023-10-23',
    },
  ]);
  public enumDocumentType = DocumentType;

  public selectedType = signal<DocumentType>(DocumentType.ALL);

  public filteredDocuments = computed(() => {
    if (this.selectedType() === DocumentType.ALL) {
      return this.documents();
    }
    return this.documents().filter((doc) => doc.type === this.selectedType());
  });

  filterByType(type: DocumentType) {
    this.selectedType.set(type);
  }

  downloadDocument(doc: Document) {
    console.log('Downloading document:', doc.title);
  }
  viewDocument(doc: Document) {
    console.log('Viewing document:', doc.title);
  }
}
