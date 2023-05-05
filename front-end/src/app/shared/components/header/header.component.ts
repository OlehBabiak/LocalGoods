import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../store';
import { UserState } from '../../../store/user.reducer';
import { AuthService, CartItem } from '../../../core';
import { User } from '../../../pages/auth/models/user.model';
import { AutoUnsubscribe } from '../../utils/decorators';
import { NAV_ITEMS } from '../../constants/constants';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface HeaderNavItem {
  role: string;
  routerLink: string;
  title: string;
}

const keyframesSpecific = keyframes([
  style({ transform: 'scale(1)', offset: 0 }),
  style({ transform: 'scale(0.9)', offset: 0.1 }),
  style({ transform: 'scale(1.1)', offset: 0.3 }),
  style({ transform: 'scale(1.15)', offset: 0.5 }),
  style({ transform: 'scale(1)', offset: 1 }),
]);

@AutoUnsubscribe('authSubs')
@AutoUnsubscribe('userSubs')
@AutoUnsubscribe('cartSubs')
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('bumpState', [
      state('normal', style({})),
      state('highlighted', style({})),
      transition(
        'normal => highlighted',
        animate('0.5s ease-out', keyframesSpecific)
      ),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isUserAuth = false;
  user!: User;
  cartCounter = 0;
  // btnIsHighlighted = false;
  @ViewChild('menu', { read: ViewContainerRef }) menu!: ViewContainerRef;
  navItems: HeaderNavItem[] = NAV_ITEMS;
  state = 'normal';
  private authSubs = new Subscription();
  private userSubs = new Subscription();
  private cartSubs = new Subscription();

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private store: Store<fromShop.AppState>
  ) {}

  ngOnInit(): void {
    this.authSubs.add(
      this.authService.user.subscribe((user) => {
        if (user) {
          this.user = user;
        }
        this.isUserAuth = !!user;
      })
    );

    this.userSubs.add(
      this.store.select('userData').subscribe((state: UserState) => {
        if (state.user) {
          this.user = state.user;
        }
        this.isUserAuth = !!state.user;
      })
    );

    this.cartSubs.add(
      this.cartService.cartContent.subscribe({
        next: (value: CartItem[]) => {
          // this.btnIsHighlighted = true;
          this.state = 'highlighted';
          setTimeout(() => {
            // this.btnIsHighlighted = false;
            this.state = 'normal';
          }, 300);
          this.cartCounter = value.length;
        },
      })
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
