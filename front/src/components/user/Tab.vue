<template>
  <div @click="search_city">
    <div>
      <van-index-bar
        highlight-color="#fb6463"
        :index-list="list"
        :sticky-offset-top="54"
        ref="scroll"
      >
        <div v-for="(cityname, index) in city" :key="index">
          <van-index-anchor :index="list[index]" :title="list[index]">
          </van-index-anchor>
          <van-cell
            v-for="(item, cindex) in cityname.list"
            :key="cindex"
            :id="`#${item.name}`"
          >
            {{ item.name }}
          </van-cell>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      city: [],
      search: "",
      list: [],
    };
  },

  mounted() {},
  created() {
    this.axios.get("mock/city.json").then((res) => {
      // console.log(res);
      this.city = res.data.city;
      res.data.city.map((item) => {
        this.list.push(item.initial);
      });
      // console.log(this.list);
    });
  },
  methods: {
    search_city(e) {
      let cn = e.target;
      if (cn.classList[0] == "van-cell__value") {
        this.$store.state.city = cn.innerHTML;
        this.$emit('hide');
        
      }
    },
  },
};
</script>


