import {
  analyze,
} from './function-analyzer.js';
import isCallable from 'is-callable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const include = async(path: string,): Promise<any> => {
  let val = await import(path.replace(/\/\//ug, '/',),);
  if (typeof val === 'object' && val.default) {
    val = val.default;
  }
  if (isCallable(val,)) {
    const parameters = analyze(val,);
    return val(...parameters.map((x,) => x.value,),);
  }
  return val;
};

export default include;
