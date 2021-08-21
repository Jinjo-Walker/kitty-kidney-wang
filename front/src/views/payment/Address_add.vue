<template>
  <div class="htmls">
    <van-nav-bar
      class="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #e7e"
    />
    <van-address-edit
      class="address_add"
      :area-list="areaList"
      :address-info="AddressInfo"
      show-search-result
      save-button-text="确定"
      show-delete
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onArea"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      AddressInfo: {
        name: `${this.$route.query.name}`,
        tel: `${this.$route.query.tel}`,
        addressDetail: `${this.$route.query.address}`,
        areaCode: "",
      },
    };
  },
  methods: {
    onDelete(content, index) {
      this.$store.state.list.splice(this.$route.query.index, 1);
      this.$router.replace({ path: "/addressList" });
    },

    onArea(values,val) {
      // if (values[2].code != this.AddressInfo.areaCode) {
      //   this.AddressInfo.addressDetail = "";
      // }
    },
    onClickLeft() {
      this.$router.replace({ path: "/addressList" });
    },

    onSave(val, index) {
      var index = `${this.$route.query.index}`;
      
      this.$router.replace({
        path: `/addressList?address=${val.addressDetail}&name=${val.name}&tel=${val.tel}`,
      });
      //修改地址
        this.$store.state.list[index].name = `${val.name}`;
        this.$store.state.list[index].tel = `${val.tel}`;
        this.$store.state.list[index].address = `${val.addressDetail}`;
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
    var cy = this.$route.query.address.slice(3, 6);
    var value2 = "";
    for (var key in areaList.county_list) {
      if (areaList.county_list[key] === cy) {
        value2 = key;
        break;
      } else {
        this.address = "";
      }
    }
    this.AddressInfo.areaCode = value2;
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