import { useState, useEffect } from "react";
/**
 * 判断是否Falsy值
 * @param value 需要判断的值
 * @returns {boolean} true | false
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 清除没有值的对象并返回
 * @param {Object} obj 传入对象
 * @returns {Object} result 返回新对象
 */
export const cleanObject = (obj: any) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 模仿Mount生命周期Hook
 * @param cb 回调函数
 */
export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * 防抖hook 泛型使用
 * @param value 传入需要防抖的值
 * @param delay 防抖时间间隔
 * @returns 防抖完成后的值
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化后, 设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout); // 每次在上一个useEffect处理完后执行,清理上一次定时器
  }, [value, delay]);
  return debouncedValue;
};
