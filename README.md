# AmplifyForm

[![npm](https://img.shields.io/npm/v/amplify-form.svg?style=flat-square)](https://www.npmjs.com/package/amplify-form)
[![npm](https://img.shields.io/npm/dt/amplify-form.svg?style=flat-square)](https://www.npmjs.com/package/amplify-form)
[![GitHub last commit](https://img.shields.io/github/last-commit/sicamois/amplify-form.svg?style=flat-square)](https://github.com/sicamois/amplify-form)

**Automatically create Form for your GaphQL API in [AWS Amplify](https://github.com/aws-amplify/amplify-js)**

This React component automatically reads the GraphQL schema of your Amplify API and creates a form for creating new items in your database.

**Functionalities:**

- Create a form for any of your [AWS Amplify GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/)
<!-- - Add files or images, they are automaticcaly uploaded to your [AWS Amplify Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/)
- Add relationship between items
- Display custom field labels
- Customize form apperance
- Customize field apperance -->
- Typescript friendly


**Notes:**

- **This plugin requires [AWS Amplify](https://github.com/aws-amplify/amplify-js) with a GraphQL API configured**

## Installation

```console
$ npm install amplify-form
```

or

```console
$ yarn add amplify-form
```

## Usage

Import the component into your file. Pass the JSON representation of the GraphQL API that Amplify has generated for you and the name of the entity you want to edit.

`create-item-page.js`:

```js
// Import AmplifyForm
import AmpliForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

export default function Home() {
  return (
    <div>
        <h1>Create a new Item</h1>

        <AmplifyForm
          graphQLJSONSchema={schema}
          entity='Item'
          />
    </div>
  )
}

```

### Notes

You need to pass the name of the entity you want to create a new record of.  
In this example, the *entity* is named *Item*. Thus, the prop you need to pass is `entity='Item'`.  

The JSON representation of the GraphQL schema is by default located in the `graphql` folder (itself located on the project root or in the `src` folder. Look for the `schema.json` file if you have any trouble.  

In order to generate the JSON representation of the GraphQL schema, you need to run Amplify codegen on the API at least once. Generally, it means that you need to have executed the `Amplify push` command at least once.

<!-- ## Add images or files

### File field declaration

### Amplify storage props -->

<!-- ## Relationship -->

<!-- ## Field labels -->

<!-- ## Theming -->

<!-- ## Field customisation -->

---

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests (`$ npm test`).

## Acknowledgement

This library relies heavily on the tremendous work of others :

- [React](https://github.com/facebook/react) by [Meta](https://github.com/facebook)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) by [Tailwind Labs](https://github.com/tailwindlabs)
- [Formik](https://github.com/jaredpalmer/formik) by [Jared Palmer](https://github.com/jaredpalmer)
- [Yup](https://github.com/jquense/yup) by [Jason Quense](https://github.com/jquense)
- [React-Select](https://github.com/JedWatson/react-select) by [Jed Watson](https://github.com/JedWatson)
- [React Dropzone](https://github.com/react-dropzone/react-dropzone) by [react-dropzone](https://github.com/react-dropzone)
  
## License

Under [MIT License](LICENSE)
