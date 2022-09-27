import { CreateWorkPageOtherImageList } from "@/app/unit/pages/newCreateWorkPage/CreateWorkPage.model";
import { ProductRepository } from "@/core/repository/product.repository";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { CustomProduct, PropGetModel } from "@/data/city/product/product.model";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class InPersonCustomProductState {
    product = null;
    route = useRoute();
    continue = false;
    childrenOfCategory = [];
    postData = <CustomProduct>{};
    propData = <PropGetModel>{};
    currencyList = [
        {label:i18n.global.tc('toman') , value:1}
    ]
    imageTabData = {
        mainImage:<CreateWorkPageOtherImageList>{},
        otherImage:<CreateWorkPageOtherImageList[]>[]
    };
    station = {
        type: false,
        show: false,
        images: <CreateWorkPageOtherImageList[]>[],
        docImages: []
    }
    
    getProductDetails(){
        ProductRepository.getInstance().getProductById({
            body:{
                productId: this.route.query.pId,
                workPageId: this.route.query.wId,
                myPageId: getSelectedPageId()
              },onReceive:(res)=>{
                this.product = res;
                this.imageTabData.mainImage.link = res.result.mainImageUrl;
                this.postData.name = res.result.name;
                this.postData.description = res.result.description;
                this.postData.currencyId = 1;
                res.result.otherImages.forEach(item => {
                    this.imageTabData.otherImage.push({
                        base64:null,
                        progress:0,
                        link:item
                    })
                })
      
                for (let i = 1; i < 5; i++) {
                    const obj = res.result.parentcategories[0];

                    if (!obj['id'+i]) return
                    const item = {
                        id: obj['id'+i],
                        title:obj['title'+i],
                        objectNameId:obj['objectNameId'+i]
                    };

                    this.childrenOfCategory.push(item);
                }
                ProductRepository.getInstance().PropGetPropById({
                    body:{
                        productId: Number(this.route.query.pId),
                        propId: Number(this.route.query.proId)
                    },onReceive:(res:PropGetModel)=>{
                        this.propData = res;
                        this.postData.workPageId = Number(this.route.query.wId);
                        this.postData.buyerPageId = Number(getSelectedPageId());
                        this.postData.buyerCreator = true;
                        this.postData.productType =  this.product.result.productType;
                        this.postData.prepareTime = res.prepareTime;
                        this.postData.currencyId = res.currencyId;
                        this.postData.price =  res.currencyId == 0 ? res.uperPrice  :  res.defaultPrice ;
                        this.postData.name = this.product.result.name;
                        this.postData.description = this.product.result.description;
                        this.postData.categoryId = this.product.result.categoryId;
                        this.postData.mainImageUrl = this.product.result.mainImageUrl;
                        this.postData.otherImages = this.product.result.otherImages;
                        this.postData.cargoType = this.product.result.productType == 1 ? this.product.result.cargoType  :  1;
                        this.postData.isOriginal =  this.product.result.productType == 1 ;
                        this.postData.returnedPercent = res.returnedPercent;
                        this.postData.weight = res.weight;
                    }
                })
              },onError:(err)=>{
                  console.log(err);
              }
        })
    }

    callbackImage(event) {
        let list = [];
        console.log(event);
        
        return 
        event.list.oderList.forEach(item => {
          const image = <CreateWorkPageOtherImageList>{
            base64: item.file,
            progress: 0,
            link: "",
          };
          list.push(image);
        });
  
        console.log(list);
        
  
      }



    getCategory(item) {
        console.log(item);
        
        // egoryId = item.selectedLevel.categoryId;
        // showGroupBotton.value = true;
        // category.value = item;
        // let ads = false;
        // let consult = false;
        // if (state.value.productType == 2) ads = true;
        // props.model.productType = getProductTypeById(
        //     item.postData.catName1.categoryId,
        //     ads,
        //     consult
        // );
        // categoryTiltles.value[0] = item.postData.catName1.title;
        // categoryTiltles.value[1] = item.postData.catName2.title;
        // categoryTiltles.value[2] = item.postData.catName3.title;
        // categoryTiltles.value[3] = item.postData.catName4.title;
        // if (item.postData.catName5 != null)
        //   categoryTiltles.value[4] = item.postData.catName5.title;
        // state.value.showDialog = true;
        // state.value.generalProductGetAll(item.selectedLevel.categoryId);
      }

      beforeContinue() {
          if (!this.postData.name  || !this.postData.description) return ToastService.getInstance().error(i18n.global.tc('pleaseCompliteValues'));
          this.continue = true;
      }

      onSubmit() {
          console.log('here');
          
      }

      showRolls(){
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: 'https://uper-me.com/rules' ,
        }).click();
      }
}