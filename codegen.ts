import type {CodegenConfig} from '@graphql-codegen/cli';
import {pluckConfig} from '@shopify/api-codegen-preset';
import {preset} from '@shopify/hydrogen-codegen';

export default {
  hooks: {afterOneFileWrite: ['prettier --write']},
  overwrite: true,
  pluckConfig,
  generates: {
    'storefrontapi.generated.d.ts': {
      preset,
      schema: 'node_modules/@shopify/hydrogen-react/storefront.schema.json',
      documents: [
        './*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        '!./app/graphql/admin/**/*.{ts,tsx,js,jsx}',
        '!./app/graphql/customer-account/**/*.{ts,tsx,js,jsx}',
      ],
    },
  },
} as CodegenConfig;
