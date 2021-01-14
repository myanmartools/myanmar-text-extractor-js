/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

declare const require: any;

const testsContext = require.context('.', true, /\.spec\.ts$/);

testsContext.keys().forEach(testsContext);
