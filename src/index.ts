import { init } from './api';
import { defaultConverter } from './converter';

export default init(defaultConverter, { path: '/' });
