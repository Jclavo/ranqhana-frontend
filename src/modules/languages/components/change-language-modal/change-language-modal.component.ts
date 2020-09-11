import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
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
    @Inject(LOCALE_ID) public localeId: string,
    private languageService: LanguageService,
    private notificationService: NotificationService,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  )
  { }

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages() {

    this.languageService.get().subscribe(response => {

      if (response.status) {
        this.languages = response.result;
        
        //Set locale 
        for (let index = 0; index < this.languages.length; index++) {
          if(this.localeId.includes(this.languages[index].locale)){
            this.locale = this.languages[index].locale;
          }
        }
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  change(){
    
  }

}
