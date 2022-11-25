import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class SubmitFormComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      title: [''],
      name: [''],
      email: [''],
      body: [''],
    });
  }

  ngOnInit() {}

  submitForm() {
    var formData: any = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('name', this.form.get('name').value);
    formData.append('email', this.form.get('email').value);
    formData.append('body', this.form.get('body').value);
    console.log(formData);
    var testsend = {
      title: this.form.get('title').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      body: this.form.get('body').value,
    };
    console.log(testsend);
    this.http.post('http://localhost:4000/api/send', testsend).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
}
