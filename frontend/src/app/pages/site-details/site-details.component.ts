import { DomainServiceService } from './domain-service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css'],
})
export class SiteDetailsComponent implements OnInit {
  pageLimit = 10;
  pageLimitOptions = [10, 25, 30, 100];
  domainList: any[] = [];
  originalDomainList: any[] = [];
  searchTerm: string = '';
  showModal = false;
  sortOptionStorage = 'unsorted';
  addDomainForm: FormGroup = new FormGroup({});
  constructor(private DS: DomainServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this._getDomainList();
    this._initForm();
  }

  private _getDomainList() {
    this.DS.getDomainList().subscribe((res) => {
      this.domainList = res;
      this.originalDomainList = res;
    });
  }

  filterresult() {
    this.domainList = this.originalDomainList.filter((domain: any) => {
      return domain.domain.includes(this.searchTerm);
    });
    this.sortOptionStorage = 'unsorted';
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  private _initForm() {
    this.addDomainForm = this.fb.group({
      domain: ['', Validators.required],
      storage: ['', Validators.required],
      monthlyVisitorCapacity: ['', Validators.required],
      subdomain: this.fb.array([new FormControl()]),
    });
  }
  getSubdomain() {
    return this.addDomainForm.get('subdomain') as FormArray;
  }
  add() {
    this.getSubdomain().push(new FormControl());
  }
  remove(i: number) {
    this.getSubdomain().removeAt(i);
  }

  submit() {
    let subdomainNames = this.addDomainForm.value.subdomain.filter(
      (sd: string) => sd != null
    );
    let subdomain = subdomainNames.map((SDN: string) => {
      return {
        name: SDN,
        usedStorage: '0gb',
        montlyVisitor: 0,
        domainTag: 'Add On',
      };
    });
    const domainToAdd = {
      domain: this.addDomainForm.value.domain,
      storage: this.addDomainForm.value.storage + 'gb',
      usedStorage: '0gb',
      domainTag: 'Primary',
      availableDomains: 5,
      usedDomains: 1 + subdomain.length,
      monthlyVisitorCapacity: this.addDomainForm.value.monthlyVisitorCapacity,
      montlyVisitor: 0,
      subdomain: subdomain,
    };
    this.DS.addDomain(domainToAdd).subscribe(() => {
      this._initForm();
      this.toggleModal();
      this._getDomainList();
    });
  }

  greenPartMontlyVisitor(a: any, b: any) {
    return (a * 100) / b + '%';
  }
  whitePartMontlyVisitor(a: any, b: any) {
    return 100 - (a * 100) / b + '%';
  }
  greenPartStorage(a: any, b: any) {
    let numA = a.slice(0, -2);
    let numB = b.slice(0, -2);
    return (numA * 100) / numB + '%';
  }

  whitePartStorage(a: any, b: any) {
    let numA = a.slice(0, -2);
    let numB = b.slice(0, -2);
    return 100 - (numA * 100) / numB + '%';
  }

  onSortClick(option: string) {
    this.sortOptionStorage = option;
    if (option === 'sortUp') {
      this.domainList = this.domainList.sort((a, b) =>
        parseInt(a.usedStorage.slice(0, -2)) >
        parseInt(b.usedStorage.slice(0, -2))
          ? 1
          : parseInt(a.usedStorage.slice(0, -2)) <
            parseInt(b.usedStorage.slice(0, -2))
          ? -1
          : 0
      );
    } else {
      this.domainList = this.domainList.sort((a, b) =>
        parseInt(a.usedStorage.slice(0, -2)) >
        parseInt(b.usedStorage.slice(0, -2))
          ? -1
          : parseInt(a.usedStorage.slice(0, -2)) <
            parseInt(b.usedStorage.slice(0, -2))
          ? -1
          : 0
      );
    }
  }
}
