import type { CodegenConfig } from '@graphql-codegen/cli';
import { glob } from 'glob';
import path from 'path';

const documents = glob.sync('src/**/*.graphql');

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  generates: Object.fromEntries(
    documents.map((docPath: string) => {
      const dirname = path.dirname(docPath);
      const filename = path.basename(docPath, '.graphql');
      const outputPath = path.join(dirname, '_generated', `${filename}.generated.ts`);

      return [
        outputPath,
        {
          documents: docPath,
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-react-apollo',
          ],
          config: {
            withHooks: true,
            avoidOptionals: true,
          },
        },
      ];
    })
  ),
  ignoreNoDocuments: true,
};

export default config;
