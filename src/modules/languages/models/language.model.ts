export class Language {
    id: number = 0;
    name: string = '';
    locale: string = '';

    static getLocales(): Array<string>{
        return ['en','es','pt'];
    }
}