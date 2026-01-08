import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Document {
  id: number;
  title: string;
  type: 'request' | 'warning' | 'certificate';
  date: string;
}

@Component({
  selector: 'app-document',
  templateUrl: './document.html',
  styleUrls: ['./document.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  public documents = signal<Document[]>([
    { id: 1, title: 'Leave Request', type: 'request', date: '2023-10-27' },
    { id: 2, title: 'Performance Warning', type: 'warning', date: '2023-10-26' },
    { id: 3, title: 'Training Certificate', type: 'certificate', date: '2023-10-25' },
    { id: 4, title: 'Sick Leave Request', type: 'request', date: '2023-10-24' },
    { id: 5, title: 'Equipment Return Warning', type: 'warning', date: '2023-10-23' },
  ]);

  public selectedType = signal<'all' | 'request' | 'warning' | 'certificate'>('all');

  public filteredDocuments = computed(() => {
    if (this.selectedType() === 'all') {
      return this.documents();
    }
    return this.documents().filter((doc) => doc.type === this.selectedType());
  });

  filterByType(type: 'all' | 'request' | 'warning' | 'certificate') {
    this.selectedType.set(type);
  }

  downloadDocument(doc: Document) {
    console.log('Downloading document:', doc.title);
  }
  viewDocument(doc: Document) {
    console.log('Viewing document:', doc.title);
  }
}
