import {UserRepository} from "@/core/repository/user.repository";
import {getSelectedPageId} from "@/core/service/utils.service";

export class selectSupporterState {
    supporters = []

    getSupporterInfo() {
        UserRepository.getInstance().GetSupporterForAgency({
            body: {
                skip: 0,
                take: 10,
                agencyPageId: Math.abs(getSelectedPageId())
            },
            onReceive: (res) => {
                this.supporters = res
            }
        })
    }
}
