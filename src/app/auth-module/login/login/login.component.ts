import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../../../payloads/login-request";
import {AuthService} from "../../services/auth.service";
import {GlobalService} from "../../../services/global.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  loginRequest: LoginRequest = new LoginRequest();
  isLoading = false;
  errorMessage: string;
  isShowError = false;

  constructor(private fb: FormBuilder, public authService: AuthService, public globalService: GlobalService, public router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.setMessage("All fields must be filled in.");
      return;
    }
    this.isLoading = true;

    this.authService.login(this.loginRequest).subscribe({
      next: response => {
        if (response.success) {
          this.router.navigateByUrl('/').then();
        }
      },
      error: err => {
        this.setMessage(this.globalService.getError(err))
      }
    })
  }

  setMessage(message: string) {
    this.isShowError = true;
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = "";
      this.isShowError = false;
    }, 5000)
  }
}
