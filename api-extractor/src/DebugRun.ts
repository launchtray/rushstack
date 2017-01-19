// NOTE: THIS SOURCE FILE IS FOR DEBUGGING PURPOSES ONLY.
//       IT IS INVOKED BY THE "Run.cmd" AND "Debug.cmd" BATCH FILES.

import * as ts from 'typescript';
import * as os from 'os';
import Analyzer from './Analyzer';
import ApiFileGenerator from './generators/ApiFileGenerator';
import ApiJsonGenerator from './generators/ApiJsonGenerator';

const analyzer: Analyzer = new Analyzer(
  (message: string, fileName: string, lineNumber: number): void => {
    console.log(`TypeScript error: ${message}` + os.EOL
      + `  ${fileName}#${lineNumber}`);
  }
);

/**
 * Debugging inheritdoc expression parser.
 * Analyzer on example2 is needed for testing the parser.
 */
analyzer.analyze({
  compilerOptions: {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    experimentalDecorators: true,
    jsx: ts.JsxEmit.React,
    rootDir: ''
  },
  entryPointFile: '',
  otherFiles: []
});

const apiFileGenerator: ApiFileGenerator = new ApiFileGenerator();
apiFileGenerator.writeApiFile('./lib/DebugRun.api.ts', analyzer);

const apiJsonGenerator: ApiJsonGenerator = new ApiJsonGenerator();
apiJsonGenerator.writeJsonFile('./lib/DebugRun.json', analyzer);
