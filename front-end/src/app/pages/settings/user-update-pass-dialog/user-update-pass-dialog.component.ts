import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {CustomValidators} from "../../../validators/check-pass-validator";
import {MyErrorStateMatcherDirective} from "../../../directives/my-error-state-matcher.directive";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-user-update-pass-dialog',
  templateUrl: './user-update-pass-dialog.component.html',
  styleUrls: ['./user-update-pass-dialog.component.scss']
})
export class UserUpdatePassDialogComponent implements OnInit {
  passForm!: FormGroup;
  matcher = new MyErrorStateMatcherDirective();

  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.passForm = new FormGroup({
      existingPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passConfirm: new FormControl(null, [Validators.minLength(6)]),
    }, { validators: CustomValidators.checkPasswords })
  }

  onSubmit() {
    console.log(this.passForm.value)
    this.settingsService.changePassword(this.passForm.value)
      .subscribe(value => console.log(value))
  }
}