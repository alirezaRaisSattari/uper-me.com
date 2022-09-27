import {UserRepository} from "@/core/repository/user.repository";
import {getSelectedPageId} from "@/core/service/utils.service";

export class activitiesState {
    supporterPageId: Number
    scores: {}

    SupervisorScore() {
        UserRepository.getInstance().SupervisorScore({
            body: {
                agencyPageId: getSelectedPageId() < 0 ? Math.abs(getSelectedPageId()) : null,
                supporterPageId: this.supporterPageId
            },
            onReceive: (res) => {
                this.scores = res
            }
        })
    }
}
