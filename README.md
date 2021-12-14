# AmplifyForm

[![npm](https://img.shields.io/npm/v/amplify-form.svg?style=flat-square)](https://www.npmjs.com/package/amplify-form)
[![npm](https://img.shields.io/npm/dt/amplify-form.svg?style=flat-square)](https://www.npmjs.com/package/amplify-form)
[![GitHub last commit](https://img.shields.io/github/last-commit/sicamois/amplify-form.svg?style=flat-square)](https://github.com/sicamois/amplify-form)

**Automatically create Form for your GaphQL API in [AWS Amplify](https://github.com/aws-amplify/amplify-js)**

This React component automatically reads the GraphQL schema of your Amplify API and creates a form for creating new items in your database.

**Functionalities:**

- Create a form for any of your [AWS Amplify GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/)
- Generate `values` that can be directly passed to grapql
- Create automatically `<select>` for your enums
- Customize Form name ([here](#Add-a-label-to-the-form))
- Customize fields label and messages + localization ([here](#Customize-fields-label-and-messages-localization))
- Customize Form branding ([here](#Customize-form-branding))
- Add `<textarea>` for long text ([here](#Add-a-textarea))
- Change field size ([here](#Change-field-size))
- Typescript friendly

<!-- - Add files or images, they are automaticcaly uploaded to your [AWS Amplify Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/)
- Add relationship between items
- Customize form apperance
- Customize field apperance -->

**Note:**

- **This plugin requires [AWS Amplify](https://github.com/aws-amplify/amplify-js) with a GraphQL API configured**

## Installation

```console
npm install amplify-form
```

or

```console
yarn add amplify-form
```

## Usage

Import the component into your file. Pass the JSON representation of the GraphQL API that Amplify has generated for you and the name of the entity you want to edit.

- Example page : `create-todo-page.ts`:

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values (see below for example code)
import addTodo from '../utilities/add-todo';

export default Home = () => {
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
      />
    </div>
  );
};
```

### Required props

- `entity`: The name of the entity you want to create a new record of.  
  In this example, the _entity_ is named _Todo_. Thus, the prop you need to pass is `entity='Todo'`.

- `graphQLJSONSchema`: The JSON representation of the GraphQL schema. It's a file generated by Amplify when you execute the `Amplify push` command.  
  By default located in the `graphql` folder (itself located on the project root or in the `src` folder). Look for the `schema.json` file if you have any trouble.

- `onSubmit: async (values: FormValues) => void`: A callback function to retieves the form values. This object can directly be passed to Amplify `API.graphql()` function to add a new record.  
  The function can be asynchronous.

  Example function : `utilities/add-todo.ts`

  ```js
  // Import Amplify
  import Amplify, { API } from 'aws-amplify';
  import awsExports from '../aws-exports';
  import { createTodo } from '../graphql/mutations';
  import { CreateTodoMutation, ListTodosQuery, Todo } from '../API';
  import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

  // Import type for Typescript
  import { FormValues } from 'amplify-form'

  // Import NextJS router
  import { useRouter } from 'next/router';


  export default addTodo: async (values: FormValues) => {
    Amplify.configure({...awsExports});
    const router = useRouter();
    try {
      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
        query: createTodo,
        variables: {
          input: values,
        },
      })) as { data: CreateTodoMutation; errors: any[] };
      router.push(`/todo/${request.data.createTodo.id}`);
    } catch (response) {
      if (response instanceof Error) {
        const error = response as Error
        throw error
      } else {
        const { errors } = response
        console.error(...errors);
        throw new Error(errors[0].message);
      }
    }
  }

  ```

**Note:** It is a rather simplified version. In the real world, creation in the GraphQL API shouldn't be allowed with API_KEY:

- `@auth` authorization rules should be properly set on your GraphQL schema (see [here](https://docs.amplify.aws/cli/graphql/authorization-rules/))
- `authMode` should be set to `GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS`
- Your page (or entire app) should be wrap with AWS Authenticator, like [`withAuthenticator`](https://ui.docs.amplify.aws/components/authenticator)

## Add a `label` to the form

By default, the form is named after the entity name (the string passed to `entity` prop).  
You can set a custom name by stting the `label`prop.

**Example:**

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values
import addTodo from '../utilities/add-todo';

export default Home = () => {
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        label='To do'
      />
    </div>
  );
};
```

## Customize fields label and messages, localization

By default, the fields are named after the name of the fields in the GraphQL schema.  

If you want to use custom labels for some fields, use this prop:

- `labelMap`: This takes a [`Map<string, string>`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map) as argument, linking field name and its label.

**Example:**

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values (see below for example code)
import addTodo from '../utilities/add-todo';

export default Home = () => {
  const labelMap: Map<string, string> = new Map([
    ['name', 'Enter a name'],
    ['description', 'Enter a description'],
  ]);
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        labelMap={labelMap}
      />
    </div>
  );
};
```

### Customize Error/Feedback messages

You can add _special names_ in the `labelMap` to customize Error or Feedback messages :

- `message:invalidError`: Gives feedback to the user signaling that some fields are invalid. It appears next to the `submit button`. _Default_: `'Some fields are invalid'`
- `message:required`: Gives feedback to the user signaling that a required field is empty. It appears under the field as _'${fieldname} ${required}'_ (for example _'name required'_). _Default_: `'required'`
- `message:select`: Text that appears in all `<select>`. Warning : this apply to single and multi select_Default_: `'Select'`
- `message:submitAction`: The text of the `submit button`. _Default_: `'Create'`

**Example:**

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values (see below for example code)
import addTodo from '../utilities/add-todo';

export default Home = () => {
  const labelMap: Map<string, string> = new Map([
    ['message:invalidError', 'Check invalid fields before submitting'],
    ['message:required', 'is required'],
    ['message:select', 'Choose'],
    ['message:submitAction', 'Create To do !'],
  ]);
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        labelMap={labelMap}
      />
    </div>
  );
};
```

### Localization

You can use `labelMap` prop for localization.

## Customize Form branding

The form comes with default color scheme.

For a better branding, you use the `theme` prop with 2 props :

- `color? = Color`: Set the `Color` scheme of the form.  
  As `AmplifyForm` uses [Tailwind CSS](https://tailwindcss.com) under the hood, it is based on Tailwind colors (as defined [here](https://tailwindcss.com/docs/customizing-colors)).  
  `Type Color = 'black' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'`

- `branding? = 'basic'| 'full'`: Set the level of branding you want to apply.  
  Default is `'basic'`

**Example:**

```js
// Import AmplifyForm and FormTheme
import AmplifyForm from 'amplify-form';
import { FormTheme } from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values (see below for example code)
import addTodo from '../utilities/add-todo';

export default Home = () => {
  const theme: FormTheme = {
    color: 'lime',
    branding: 'full',
  }
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        theme={theme}
      />
    </div>
  );
};

## Add a `<textarea>`

By default, strings in GraphQL model are transformed into `<input type='text'>`. This is generally ok, but some strings are meant "long" text, like `description`, `content`, `text`, etc.

AmplifyForm has a simple solution for that :

- `textAreas` : A prop where you pass an array containing all the string fields that need to be displayed as `<textarea>`.

**Example:**

Let's say your GraphQL model `schema.grapql` is a simple Todo list :

```graphql
type Todo
@model {
  id: ID!
  name: String!
  description: String
}
```

If you want `description` to be a `<textarea>` you simple pass its name to the `textAreas` prop like so :

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values
import addTodo from '../utilities/add-todo';

export default Home = () => {
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        textAreas={['description']}
      />
    </div>
  );
};
```

**Notes:**

- If you have multiples fields to display as `<textarea>`, you pass them all in a single array.  
  e.g. `textAreas=['description', 'annotations', 'seo_summary']`

- Names are compatible with dotted notation.  
  e.g. `textAreas=['details.description']`

### Advanced usage

For finer control over the `<textarea>`, you can pass `HTMLTextAreaElement` props to `textAreas`.  

For this, you should pass an object to `textAreas` (not an array, which is reserved for the simpler form). The fields to display as `<textarea>` are the keys, and the value for each key is an object containing the `HTMLTextAreaElement` props you want to set.

⚠️ some `HTMLTextAreaElement` props might not work has they may be overwritten somewhere else in the code... Use at your own risks !

**Example:**

```js
// Import AmplifyForm and TextAreas
import AmplifyForm from 'amplify-form';
import { TextAreas } from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values
import addTodo from '../utilities/add-todo';

export default Home = () => {
  const textAreasConfig: TextAreas = {
    'description': {
      readOnly: true,
      col: 4
    }
  };
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        textAreas={textAreasConfig}
      />
    </div>
  );
};
```

## Change field size

Each field, depending on its type, has a default width.  
If you want to change this default behaviour and set a particular size on some fields, set this prop:

- `fieldsSize`: Pass an object with the fieldname as key and a `FieldSize` as value

*Note:* `Type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'max' | 'screen'`

**Example:**

```js
// Import AmplifyForm and FieldsSize
import AmplifyForm from 'amplify-form';
import { FieldsSize } from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values
import addTodo from '../utilities/add-todo';

export default Home = () => {
  const fieldsSizeConfig: FieldsSize = {
    name: 'lg',
    description: '3xl'
  };
  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        fieldsSize={fieldsSizeConfig}
      />
    </div>
  );
};
```

<!-- ## Add images or files

### File field declaration

### Amplify storage props -->

<!-- ## Relationship -->

<!-- ## Theming -->

<!-- ## Field customisation -->

---

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

## Acknowledgement

This library relies heavily on the tremendous work of others :

- [React](https://fr.reactjs.org) by [Meta](https://github.com/facebook)
- [TailwindCSS](https://tailwindcss.com) by [Tailwind Labs](https://github.com/tailwindlabs)
- [Formik](https://formik.org) by [Jared Palmer](https://github.com/jaredpalmer)
- [Yup](https://github.com/jquense/yup) by [Jason Quense](https://github.com/jquense)
- [React-Select](https://react-select.com/home) by [Jed Watson](https://github.com/JedWatson)
- [React Dropzone](https://react-dropzone.js.org) by [react-dropzone](https://github.com/react-dropzone)
- [Lodash](https://lodash.com) by [lodash](https://github.com/lodash)

## License

Under [MIT License](LICENSE)
