import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ICanDeactivateComponent{
  canExit: () => Observable<boolean> | Promise<boolean> | boolean
}
@Injectable({
  providedIn: 'root'
})


export class CanDeactivateGaurdLoginService implements CanDeactivate<ICanDeactivateComponent> {

  constructor() { }

  canDeactivate(component: ICanDeactivateComponent,
     currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
     nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canExit();
  }
}
