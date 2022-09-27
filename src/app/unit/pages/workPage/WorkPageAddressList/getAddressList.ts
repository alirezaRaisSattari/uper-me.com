import {BASE_TAKE} from "@/core/constant/constant";
import {UserRepository} from "@/core/repository/user.repository";
import {getSelectedPageId} from "@/core/service/utils.service";

export class AddressListState {
    skipNum = 0;
    loadingAddress = false
    addressIsFinished = false
    reftreshList = true
    isNull: Boolean
    allAddress = []

    getAddress(body) {

        if (this.addressIsFinished) return;
        body.skip = this.skipNum
        if (this.reftreshList) this.allAddress = []
        UserRepository.getInstance().getAddressByPageId({
            body: body,
            onLoadChange: (load) => {
                this.loadingAddress = load
            },
            onReceive: (res) => {
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allAddress.push(...res);

                    if (BASE_TAKE > res.length)
                        this.addressIsFinished = true;
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }

                }

            }
        })
    }

    deleteAddressFavorite(id, deleted: Function) {
        UserRepository.getInstance().deleteAddressFavorite({
            urlContent: `${getSelectedPageId()}/${id}`,
            onReceive: (res) => {
                deleted()
            }
        })
    }
}
