import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//SERVICES
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';
import { ImageService } from "../../services";

//Models
import { Image } from "@modules/utility/models";

@Component({
  selector: 'sb-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @ViewChild('inputcamera', { static: false })
  cameraInput!: ElementRef;

  // public newImage = new Image('',new File,'','');
  public image: any;
  public imageFileBase64: any;

  constructor(
    public activeModal: NgbActiveModal,
    private notificationService: NotificationService,
    private authService: AuthService,
    private imageService: ImageService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
  }

  openSelectPicture() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  selectPicture(event: any) {

    if (event.target.files.length > 0) {
      // let image = new ImageModel(null, event.target.files[0], this.constantService.APP_NAME, null);
      // this.newImage = new Image('newImage', event.target.files[0], '', '');
      this.image = event.target.files[0]

      this.getBase64(this.image).then(
        data => this.imageFileBase64 = data
      );
    }
  }

  save(){
    if(this.image){
      this.saveImage(this.image);
    }else{
      this.notificationService.error(this.languageService.getI18n('imageModal.selectImage'));
    }
  }

  async saveImage(image: any) {

    // it can be send like an object from a class
    const formImage = new FormData();
    formImage.append('image', image);
    // formImage.append('image', image.image, image.image.name);
    // formImage.append('path', image.path);

    this.imageService.create(formImage).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message)
        this.activeModal.close({ status: true, image: response.result});
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
