import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {OrderComponent} from './order.component';
import {Observable} from 'rxjs/Observable';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

  canDeactivate(component: OrderComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!component.isOrderCompleted()) {
      return window.confirm('Deseja desistir da compra?')
    } else {
      return true;
    }

  }

}
