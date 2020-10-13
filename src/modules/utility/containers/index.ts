import { VersionComponent } from './version/version.component';
import { FormValidationsComponent } from './i18n/form-validations/form-validations.component';
import { ButtonsComponent } from './i18n/buttons/buttons.component';
import { MessagesComponent } from './i18n/messages/messages.component';

export const containers = [
    VersionComponent,
    FormValidationsComponent,
    ButtonsComponent,
    MessagesComponent
];

export * from './version/version.component';
export * from './i18n/form-validations/form-validations.component';
export * from './i18n/buttons/buttons.component';
export * from './i18n/messages/messages.component';
