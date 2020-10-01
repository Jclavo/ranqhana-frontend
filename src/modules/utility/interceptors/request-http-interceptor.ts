import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestHttpInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log(btoa(JSON.stringify(req.body)));
        // console.log(JSON.parse(atob(btoa(JSON.stringify(req.body)))));
        const newReq = req.clone({ 
            // headers: req.headers.set('Accept', 'application/json'),
            // body: btoa(JSON.stringify(req.body))
        });

        return next.handle(newReq);
    };
}