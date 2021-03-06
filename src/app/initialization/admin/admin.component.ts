import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { WorkflowService } from '../../layout/workflow/workflow.service';
import { InitializationService } from '../initialization.service';
import { AppConstants } from '../../app.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  // private readonly pattern_email: RegExp = AppConstants.REGEX.EMAIL;
  // private readonly pattern_password: RegExp = AppConstants.REGEX.PASSWORD;
  // readonly popoverContent: string = AppConstants.USER.PASSWORD_CRITERIA;
  superAdminForm: FormGroup;
  currentStep: number;
  formSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private initService: InitializationService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.currentStep = data.step;
    });
  }
  goToNext() {
    this.registerSuperAdmin();
  }
  private registerSuperAdmin() {
    this.formSubmitted = true;
    const payload = this.superAdminForm.value;
    this.initService
      .registerAdmin(payload)
      .finally(() => (this.formSubmitted = false))
      .subscribe(res => {
        // this.initService.setAdminData(payload);
        this.toastr.success(res.message, AppConstants.INIT.REGISTER_ADMIN_TITLE);
        this.superAdminForm.reset();
        this.workflowService.validateStep(this.currentStep, true);
      });
  }
  private buildForm() {
    this.superAdminForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      contact: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }
  get firstName() {
    return this.superAdminForm.get('firstName');
  }
  get lastName() {
    return this.superAdminForm.get('lastName');
  }
  get contact() {
    return this.superAdminForm.get('contact');
  }
  get email() {
    return this.superAdminForm.get('email');
  }
  get password() {
    return this.superAdminForm.get('password');
  }
  get confirmPassword() {
    return this.superAdminForm.get('confirmPassword');
  }
}
