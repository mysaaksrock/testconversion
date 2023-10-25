/**
 * @author Dmitry Malakhov
 */

'use strict';

import development from './development.config';
import production from './production.config';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

export default NODE_ENV === 'development'
  ? development
  : production;