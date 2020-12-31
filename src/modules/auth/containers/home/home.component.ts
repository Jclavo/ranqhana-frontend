import { Component, OnInit } from '@angular/core';

// SERVICE
import { UtilityService, NotificationService, LanguageService } from '../../../utility/services';
import { AuthService } from '../../services';

@Component({
  selector: 'sb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
