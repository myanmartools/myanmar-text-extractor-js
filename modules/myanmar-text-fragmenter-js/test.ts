// tslint:disable: no-implicit-dependencies no-import-side-effect


// tslint:disable: no-any
// tslint:disable-next-line: no-reserved-keywords
declare const require: any;

// Then we find all the tests.
// tslint:disable-next-line: no-unsafe-any
const context = require.context('./', true, /\.spec\.ts$/);

// And load the modules.
// tslint:disable-next-line: no-unsafe-any
context.keys().map(context);
