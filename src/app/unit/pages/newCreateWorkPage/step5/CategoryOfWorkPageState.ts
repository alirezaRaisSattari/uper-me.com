import { UserRepository } from "@/core/repository/user.repository";
import { WindowLoading } from "@/core/service/utils.service";

export class CategoryOfWorkPageState {
    categoryList: any[] = []
    loading = false

    GetFeatureByCategoryId(data, index) {
        UserRepository.getInstance().GetFeatureByCategoryId({
            body: [data],
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    res.forEach(element => {
                        element.answer.forEach(answer => {
                            answer['isSelected'] = false,
                                answer['isShowOuted'] = false
                        });
                        this.categoryList[index].features.push({
                            featureName: element.name,
                            featureId: element.id, answers: [...new Set(element.answer)]
                        })

                    });
                }

            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })
    }

    addFeature(data, callBack: (val: any) => void) {
        UserRepository.getInstance().CreateFeatureWithAnswers({
            body: data,
            onReceive: (res) => {
                res = res ?? {};
                let finalFeature = { ...data };
                if (res.featureId) {
                    finalFeature.featureId = res.featureId;
                    finalFeature.featureName = finalFeature.name;
                    delete finalFeature.name;
                }
                if (Array.isArray(res.answerIds)) {
                    for (let i = 0; i < finalFeature.answers.length; i++) {
                        finalFeature.answers[i]['answerId'] = res.answerIds[i];
                        finalFeature.answers[i].isSelected = false;
                        finalFeature.answers[i].isShowOuted = false;
                    }
                }
                callBack(finalFeature);
            },
            onLoadChange: (load) => WindowLoading.value = load
        })
    }

    addAnswers(data, callBack: (val: any[]) => void) {
        console.log('data', data);

        UserRepository.getInstance().CreateFeatureAnswerMulti({
            body: [data],
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    let finalAnswers = { ...data };
                    for (let i = 0; i < finalAnswers.answers.length; i++) {
                        finalAnswers.answers[i].isSelected = true;
                        finalAnswers.answers[i].isShowOuted = true;
                        finalAnswers.answers[i].id = res[i].answerId;
                    }
                    console.log('finalAnswers', finalAnswers);
                    callBack(finalAnswers.answers);
                }
            },
            onLoadChange: (load) => WindowLoading.value = load
        })
    }


}
