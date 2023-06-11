<template>
  <div>
    <div class="work-header">
      <a-avatar src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" :size="72"></a-avatar>
      <div class="center">
        <p>早安, Hrsass Admin, 开始您一天的工作吧</p>
        <p>今日晴, 20℃ - 32℃</p>
      </div>
      <div class="right">
        <p>待办</p>
        <p>2/10</p>
      </div>
      <div class="right">
        <p>项目</p>
        <p>8</p>
      </div>
      <div class="right">
        <p>团队</p>
        <p>300</p>
      </div>
    </div>
    <a-row style="padding: 16px">
      <a-col class="gutter-row" :span="16">
        <a-card title="最新动态" style="margin-right: 16px">
          <template #extra>
            <a-button type="link" size="small">更多</a-button>
          </template>
          <a-list item-layout="horizontal" :data-source="dynamicInfoItems">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #description>
                    {{ item.date }}
                  </template>
                  <template #title> {{ item.name }} <span v-html="item.desc"> </span> </template>
                  <template #avatar>
                    <a-avatar :src="item.avatar" :size="30" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card>
          <img src="https://vvbin.cn/next/assets/illustration.8e82152d.svg" alt="" />
        </a-card>
        <a-card title="部门分布" style="margin-top: 16px">
          <div id="radar" style="height: 340px"></div>
        </a-card>
      </a-col>
    </a-row>
    <div class="work-dynamic"></div>
  </div>
</template>
<script setup>
import { list as dynamicInfoItems } from './data'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
onMounted(() => {
  const radar = echarts.init(document.getElementById('radar'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '技术部' },
          { value: 735, name: '营销部' },
          { value: 580, name: '后勤部' },
          { value: 484, name: '总裁办' },
          { value: 300, name: '客服部' }
        ]
      }
    ]
  }
  radar.setOption(option)
})
</script>
<style lang="less" scoped>
.work-header {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e4e4e4;
  align-items: center;
  .center {
    flex: 1;
    padding-left: 20px;
    p {
      &:first-child {
        font-size: 20px;
      }
      &:last-child {
        color: #666;
      }
    }
  }
  .right {
    width: 80px;
    padding: 10px;
    text-align: right;
    p {
      &:first-child {
        color: #666;
      }
      &:last-child {
        font-size: 20px;
      }
    }
  }
  p {
    margin: 0;
  }
}
.work-dynamic {
  display: flex;
}
</style>
