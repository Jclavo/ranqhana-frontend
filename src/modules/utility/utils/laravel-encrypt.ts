import { Injectable } from '@angular/core';

//models
// import { Mask } from '../models';
// import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class LaravelEncrypt {

    static encrypt(data: any) {

        // let laravelKEY = 'I4Sbr8hMimSxpmRG7GtTbcnjUC/+d7Q4haqrTFgJNB8=';
        // let iv : any;
        // let encrypted : any;
        // iv = CryptoJS.lib.WordArray.random(16);
        // // key = CryptoJS.enc.Utf8.parse(laravelKEY);
        // laravelKEY = CryptoJS.enc.Base64.parse(laravelKEY);
        // let options = {
        //     iv: iv,
        //     mode: CryptoJS.mode.CBC,
        //     padding: CryptoJS.pad.Pkcs7
        // };
        // encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), laravelKEY, options);
        // encrypted = encrypted.toString();
        // iv = CryptoJS.enc.Base64.stringify(iv);

        // let result = {
        //     iv: iv,
        //     value: encrypted,
        //     mac: CryptoJS.HmacSHA256(iv + encrypted, laravelKEY).toString()
        // }

        // let finalResult = JSON.stringify(result);
        // finalResult = CryptoJS.enc.Utf8.parse(finalResult);
        // return CryptoJS.enc.Base64.stringify(finalResult);



    //     let laravelKEY = 'I4Sbr8hMimSxpmRG7GtTbcnjUC/+d7Q4haqrTFgJNB8=';
    //     let iv: any;
    //     let encrypted: any;

    //     iv = CryptoJS.lib.WordArray.random(16),
    //     // laravelKEY = CryptoJS.enc.Utf8.parse(laravelKEY);
    //     laravelKEY = CryptoJS.enc.Base64.parse(laravelKEY);
    //     let options = {
    //         iv: iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     };
    //     encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), laravelKEY, options);
    //     encrypted = encrypted.toString();
    //     iv = CryptoJS.enc.Base64.stringify(iv);
    //     let result = {
    //         iv: iv,
    //         value: encrypted,
    //         mac: CryptoJS.HmacSHA256(iv + encrypted, laravelKEY).toString()
    //     }
    //     let finalResult = JSON.stringify(result);
    //     finalResult = CryptoJS.enc.Utf8.parse(finalResult);
    //     return CryptoJS.enc.Base64.stringify(finalResult);
    };


}