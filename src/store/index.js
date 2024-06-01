import useBaseStore from './base'

// 统一导出baseStore方法
export default function baseStore() {
  return {
    base: useBaseStore(),
    // counter: useCounterStore(),
  }
}