import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromShop from '../store';
import * as UserActions from '../store/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { ResponseData, SellerInfo, User } from '../core';
import { API_PATH, PATH_GET_PROFILE } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog
  ) {}

  updateUser() {
    return this.http
      .get<ResponseData<User>>(`/${API_PATH}/${PATH_GET_PROFILE}`)
      .subscribe(({ data }) => {
        this.updateUserInStore(data);
      });
  }

  updateUserInStore(data: User) {
    const updatedUserData: SellerInfo = {
      address: {
        postCode: '',
        country: '',
        city: '',
        area: '',
      },
      basicInfo: {
        name: '',
        mobile: '',
        certification: {
          qualityCertificateTitle: '',
          qualityCertificateDescription: '',
          qualityCertificateLink: '',
          taxNumber: '',
        },
      },
    };

    if (data.certification !== null) {
      this.updateSellerData(data, updatedUserData);
      updatedUserData.basicInfo.certification.qualityCertificateTitle =
        data?.certification.qualityCertificateTitle;
      updatedUserData.basicInfo.certification.qualityCertificateDescription =
        data?.certification.qualityCertificateDescription;
      updatedUserData.basicInfo.certification.qualityCertificateLink =
        data?.certification.taxNumber;
      updatedUserData.basicInfo.certification.taxNumber =
        data?.certification.taxNumber;
    } else {
      this.updateSellerData(data, updatedUserData);
    }
    this.store.dispatch(new UserActions.UpdateUser(updatedUserData));
  }

  private updateSellerData(data: User, updatedUserData: SellerInfo) {
    updatedUserData.address.area = data?.address?.area;
    updatedUserData.address.postCode = data?.address?.pinCode;
    updatedUserData.address.country = data?.address?.country;
    updatedUserData.address.city = data?.address?.city;
    updatedUserData.basicInfo.name = data?.name;
    updatedUserData.basicInfo.mobile = data?.mobile;
  }
}
