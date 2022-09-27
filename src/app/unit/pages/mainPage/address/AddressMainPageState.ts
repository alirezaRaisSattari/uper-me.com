import { UserRepository } from "@/core/repository/user.repository";
import { getSelectedPageId } from "@/core/service/utils.service";

export class AddressMainPageState {

    listAddress: any;

    getAddressFavorite() {
        UserRepository.getInstance().getAddressByPageId({
            body: {
                skip: 0,
                take: 1000,
                pageId: getSelectedPageId()
            },
            onReceive: res => {
                this.listAddress = res;
                this.listAddress.forEach(e => {
                    let x = e.location.replace('POINT(', '').replace(')', '').split(' ')
                    e.lan = x[0]
                    e.lat = x[1]

                });
            }
        })
    }

    deleteItem(deleteItem) {
        UserRepository.getInstance().deleteAddressFavorite({
            urlContent: `${getSelectedPageId()}/${deleteItem.addressId}`,
            onReceive: res => {
                if (Array.isArray(this.listAddress)) {
                    this.listAddress.splice(deleteItem.index, 1);
                }
            }
        })
    }
}
