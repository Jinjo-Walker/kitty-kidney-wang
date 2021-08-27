<template>
  <div class="htmls">
    <van-nav-bar
      class="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #0baff0"
    />
    <van-address-edit
      class="address_add"
      :area-list="areaList"
      :address-info="AddressInfo"
      show-search-result
      save-button-text="确定"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      ref="alist"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { addressAdd } from "@/api/user_axios.js";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      AddressInfo: this.$store.state.AddressInfo,
    };
  },
  methods: {
    onClickLeft() {
      this.$store.state.AddressInfo = {
        name: "",
        tel: "",
        addressDetail: "",
        areaCode: "",
      };
      sessionStorage.removeItem("AddressInfo");
      this.$router.push({ path: "/addressList" });
    },
    onSave(val, index) {
      addressAdd(
          `name=${val.name}&tel=${val.tel}&address=${val.city}${val.county}${val.addressDetail}&uid=${this.$store.state.uid}`
        ).then((res) => {
        });
      // console.log(val);
      this.$router.push({
        path: `/addressList?address=${val.city}${val.county}${val.addressDetail}&name=${val.name}&tel=${val.tel}`,
      });
      //新增地址
      this.$store.state.list.push({
        id: '',
        name: `${val.name}`,
        tel: `${val.tel}`,
        address: `${val.city}${val.county}${val.addressDetail}`,
      });
      this.$store.state.AddressInfo = {
        name: "",
        tel: "",
        addressDetail: "",
        areaCode: "",
      };
    },

    confirmParse() {
      let newAddressS = AddressParse.parse(this.Address);
      let newAddress = newAddressS[0];
      this.AddressInfo = {
        name: newAddress.name,
      };
    },
  },

  mounted() {
    var cy = this.$store.state.AddressInfo.areaCode.slice(4);
    var value2 = "";
    for (var key in areaList.county_list) {
      if (areaList.county_list[key] === cy) {
        value2 = key;
        break;
      }
    }
    this.$store.state.AddressInfo.areaCode = value2;
    this.$nextTick(() => {
      this.$refs.alist.$children[3].$el.addEventListener("click", () => {
        this.$store.state.AddressInfo = {
          name: this.$refs.alist.$children[0].$el.children[1].children[0]
            .children[0].value,
          tel: this.$refs.alist.$children[1].$el.children[1].children[0]
            .children[0].value,
          areaCode:
            this.$refs.alist.$children[2].$el.children[1].children[0]
              .children[0].value,
          addressDetail:
            this.$refs.alist.$children[3].$el.children[0].children[0]
              .children[1].children[0].children[0].value,
        };
        sessionStorage.setItem(
          "AddressInfo",
          JSON.stringify(this.$store.state.AddressInfo)
        );
        this.$router.push("/amap");
      });
    });
  },
};
</script>

<style>
.address_add .van-cell__title {
  height: 50px;
}
.address_add .van-field__control {
  font-size: 15px;
}
.address_add .van-address-edit__fields .van-field__label {
  width: 5em;
}
.address_add .van-cell__title span {
  font-size: 16px;
  font-weight: 550;
  color: black;
}
.address_add .van-radio {
  border-bottom: 1px solid black;
}
</style>