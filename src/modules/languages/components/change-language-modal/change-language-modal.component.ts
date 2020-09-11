import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Models
import { Language } from '@modules/languages/models';

//Services
import { LanguageService} from '@modules/languages/services';
import { NotificationService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';


@Component({
  selector: 'sb-change-language-modal',
  templateUrl: './change-language-modal.component.html',
  styleUrls: ['./change-language-modal.component.scss']
})
export class ChangeLanguageModalComponent implements OnInit {

  public languages: Array<Language> = [];
  public locale: string = '';

  constructor(
    private languageService: LanguageService,
    private notificationService: NotificationService,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  )
  { }

  ngOnInit(): void {
    this.getLanguages();
    this.setBrowserLanguage();
  }

  getLanguages() {

    this.languageService.get().subscribe(response => {

      if (response.status) {
        this.languages = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  change(){
    console.log('you change the language');
    this.authService.setLocale(this.locale);
    this.activeModal.close(false);

  }

  setBrowserLanguage(){
    this.locale = this.authService.getLocale();
  }

}
