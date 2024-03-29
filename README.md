# AmplifyForm

[![npm](https://img.shields.io/npm/v/amplify-form.svg)](https://www.npmjs.com/package/amplify-form)
[![npm](https://img.shields.io/npm/dt/amplify-form.svg)](https://www.npmjs.com/package/amplify-form)
[![GitHub last commit](https://img.shields.io/github/last-commit/sicamois/amplify-form.svg)](https://github.com/sicamois/amplify-form)
[![Test](https://github.com/sicamois/amplify-form/actions/workflows/test.yml/badge.svg)](https://github.com/sicamois/amplify-form/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/sicamois/amplify-form/badge.svg?branch=master)](https://coveralls.io/github/sicamois/amplify-form?branch=master)
[![gzip size](https://img.badgesize.io/https:/unpkg.com/amplify-form@latest?compression=gzip)](https://github.com/sicamois/amplify-form)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

**Automatically create Form for your GraphQL API in [AWS Amplify](https://github.com/aws-amplify/amplify-js)**

This React component automatically reads the GraphQL schema of your Amplify API and creates a form for creating new items in your database.

**Functionalities:**

- Create a form for any of your [AWS Amplify GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/)
- Generate **`values`** that can be directly passed to grapql
- Create automatically `<select>` for your **enums**
- Customize **Form name** ([here](#add-a-label-to-the-form))
- Customize **fields label** and messages + localization ([here](#customize-fields-label-and-messages-localization))
- Change **field size** ([here](#change-field-size))
- Customize Form **branding** ([here](#customize-form-branding))
- Add **`<textarea>`** for long text ([here](#add-a-textarea))
- Add drag'n'drop zone to **add images** with automatic uploads ([here](#add-dragndrop-zone-to-add-images))
- Add drag'n'drop zone to **add files** with automatic uploads ([here](#add-dragndrop-zone-to-add-files))
- Configure **Storage** ([here](#configure-storage))
- Specify **relationships** between entities ([here](#specify-relationships))
- Add **field props** (readOnly, defaultValue,...) ([here](#add-field-props))
- **Typescript** friendly

> Note: **This plugin requires [AWS Amplify](https://github.com/aws-amplify/amplify-js) with a GraphQL API configured**

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
  In this example, the *entity* is named *Todo_. Thus, the prop you need to pass is `entity='Todo'`.

- `graphQLJSONSchema`: The JSON representation of the GraphQL schema. It's a file generated by Amplify when you execute the `Amplify push` command.  
  By default located in the `graphql` folder (itself located on the project root or in the `src` folder). Look for the `schema.json` file if you have any trouble.

- `onSubmit: async (values: FormValues) => void`: A callback function to retieves the form values.  
  `values` can directly be passed to Amplify `API.graphql()` function to add a new record.  
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

>**Note:** It is a rather simplified version. In the real world, creation in the GraphQL API shouldn't be allowed with API_KEY:
>
>- `@auth` authorization rules should be properly set on your GraphQL schema (see [here](https://docs.amplify.aws/cli/graphql/authorization-rules/))
>- `authMode` should be set to `GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS`
>- Your page (or entire app) should be wrap with AWS Authenticator, like [`withAuthenticator`](https://ui.docs.amplify.aws/components/authenticator)

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

- `labelMap?`: This takes a [`Map<string, string>`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map) as argument, linking field name and its label.

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

You can add *special names* in the `labelMap` to customize Error or Feedback messages :

- `'message:invalidError'`: Gives feedback to the user signaling that some fields are invalid. It appears next to the `submit button`.  
  >_Default_: `'Some fields are invalid'`
- `'message:required'`: Gives feedback to the user signaling that a required field is empty. It appears under the field as *'${fieldname} ${required}'* (for example *'name required'_).  
  >*Default*: `'required'`
- '`message:select'`: Text that appears in all `<select>`. Warning : this apply to single and multi select  
  >*Default*: `'Select'`
- `'message:submitAction'`: The text of the `submit button`.  
  >*Default*: `'Create'`
- `'message:creating'`: The appearing while the record is created in the backend.  
  >*Default*: `'Creating Item...'`

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

## Change field size

Each field, depending on its type, has a default width.  
If you want to change this default behaviour and set a particular size on some fields, set this prop:

- `fieldsSize?`: Pass an object with the fieldname as key and a `FieldSize` as value
  
  >`Type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'max' | 'screen'`

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
    'name': 'lg',
    'description': '3xl'
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

## Customize Form branding

The form comes with default color scheme.

For a better branding, you use the `theme` prop with 2 props :

- `color? = Color`: Set the `Color` scheme of the form.  
  As `AmplifyForm` uses [Tailwind CSS](https://tailwindcss.com) under the hood, it is based on Tailwind colors (as defined [here](https://tailwindcss.com/docs/customizing-colors)).  
  *Note:* `Type Color = 'black' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'`  

- `branding? = 'basic'| 'full'`: Set the level of branding you want to apply.

  >*Default:*  `'basic'`

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
```

## Add a `<textarea>`

By default, strings in GraphQL model are transformed into `<input type='text'>`. This is generally ok, but some strings are meant "long" text, like `description`, `content`, `text`, etc.

AmplifyForm has a simple solution for that :

- `textAreas?` : A prop where you pass an array containing all the string fields that need to be displayed as `<textarea>`.

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

>**Notes:**
>
>- If you have multiples fields to display as `<textarea>`, you pass them all in a single array.  
  e.g. `textAreas=['description', 'annotations', 'seo_summary']`
>- Names are compatible with dotted notation.  
  e.g. `textAreas=['details.description']`

### Advanced usage

For finer control over the `<textarea>`, you can pass `HTMLTextAreaElement` props to `textAreas`.  

For this, you should pass an object to `textAreas` (not an array, which is reserved for the simpler form). The fields to display as `<textarea>` are the keys, and the value for each key is an object containing the `HTMLTextAreaElement` props you want to set.

>⚠️ **Warning:** some `HTMLTextAreaElement` props might not work has they may be overwritten somewhere else in the code... Use at your own risks !

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

## Add drag'n'drop zone to add images

Sometimes you want to add images to your backend. GraphQL give no direct type to reference file. So generally, images are uploaded to a S3 bucket and referenced in the API by a `string` (typically `s3_key`).

Amplify give you the tools to simplify storage in S3, via the module [AWS Amplify Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/).

But as images are only referenced in the GraphQL schema as `string`, you have to manually declare to AmplifyForm which fields are in reality images.

It is quite straightforward with this prop:

- `imageFields?`: A prop where you pass an array containing all the fields that need to be displayed as `<input type='file'>`.

>Instead of boring `<input type='file'>` *AmplifyForm* creates for you a nice drag'n'drop zone (based on [React Dropzone](https://react-dropzone.js.org)) and thumbnails.

### Images re-ordering

If you drop multiple files, you can re-order images simply by drag'n'dropping the thumbnails.

The resulting `Array` in the `values` will be ordered accordingly.

### Automatic image upload

Upon submission (when you click the **Create** button), images will automatically be uploaded to your S3 Storage configured in your Amplify backend.

>You can add configurations on the *Storage* (detailed [here](#configure-storage))

**This has 2 requierements :**

- [Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/) module must be delpoyed in your Amplify backend
- Amplify must be configured on the page containing the AmplifyForm: typically via the `Amplify.configure({...awsExports})` command on the top of the file or in `_app.tsx`

### Parsing returned values (image)

As Images are not simple fields, the `values` returned by AmplifyForm must be parsed and reworked before being sent to GraphlQL API. This is achieve via the `onSubmit: async (values: FormValues) => void` prop of AmplifyForm.

The value returned by Amplify is either a single `FieldWithStorage` (for single image) or a `FieldWithStorage[]` (for multiple images).

`FieldWithStorage` is a special type that contains all the informations you need about the image :

- `name`: the name of the image
- `storageKey`: the S3 key, typically used to download the image via `Storage.get(storageKey)` (details [here](https://docs.amplify.aws/lib/storage/download/q/platform/js/))
- `type`: the MIME type of the image
- `width`: the image width
- `height`: the image height

### Example (image)

Let's say your GraphQL model `schema.grapql` is a simple blog with Post, described in `Post`, and each Post has some images (at least one), described in `ImageFile` :

`schema.graphql`:

```graphql
type Post
@model {
  id: ID!
  title: String!
  content: String!
  gallery: [ImageFile!]!
}

type ImageFile {
  s3_key: String!
  mime_type: String!
  width: Int
  height: Int
}
```

You declare `gallery` as an *image field* (also `content` as a `<textarea>`).  
And you create 2 functions :

- `createPostInput` to put the image infos in the right place
- `addPost` to create the new Post in the backend via the GraphQL API

`pages/create-post.tsx`:

```js
// Import Amplify
import Amplify, { API } from 'aws-amplify';
import awsExports from '../aws-exports';
import { createPost } from '../graphql/mutations';
import { CreatePostMutation, ImageFileInput } from '../API';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Import AmplifyForm and types
import AmplifyForm from 'amplify-form';
import { FormValues, FileWithStorage } from 'amplify-form'

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

const CreatePost = () => {

  // Configure Amplify
  Amplify.configure({ ...awsExports });

  const imageFields = ['gallery']

  const createPostInput = (values: FormValues, imageFieldList: string[]) => {
    const postInput: FormValues = {...values};
    imageFieldList.map(imageFieldName => {
      // Retrieve the FileWithStorage array from values
      const imageValues = values[imageFieldName] as FileWithStorage[];
      // Parse every value and transform it into ImageFileType
      const imageFiles: ImageFileInput[] = imageValues.map(image => {
        return {
          s3_key: image.storageKey,
          mime_type: image.type,
          width: image.width,
          height: image.height,
        }
      });
      // Replace the value in postInput
      postInput[imageFieldName] = imageFiles;
    });
    // Return the values now in the right format
    return postInput;
  }

  const addPost (values: FormValues) => {
    const postInput = createPostInput(values);
    try {
      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createPost,
        variables: {
          input: postInput,
        },
      })) as { data: CreatePostMutation; errors: any[] };
    } catch (response) {
      if (response instanceof Error) {
        const error = response as Error;
        throw error;
      } else {
        const { errors } = response;
        console.error(...errors);
        throw new Error(errors[0].message);
      }
    }
  };

  return (
    <div>
      <h1>Create a new Post</h1>
      <AmplifyForm
        entity='Post'
        graphQLJSONSchema={schema}
        onSubmit={addPost}
        textAreas={['content']}
        imageFields={imageFields}
      />
    </div>
  );
};

export default withAuthenticator(() => CreatePost)
```

## Add drag'n'drop zone to add files

Sometimes you want to add files to your backend. GraphQL give no direct type to reference a file. So generally, files are uploaded to a S3 bucket and referenced in the API by a `string` (typically `s3_key`).

Amplify give you the tools to simplify storage in S3, via the module [AWS Amplify Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/).

But as files are only referenced in the GraphQL schema as `string`, you have to manually declare to AmplifyForm which fields are in reality files.

It is quite straightforward with this prop:

- `fileFields?`: A prop where you pass an array containing all the fields that need to be displayed as `<input type='file'>`.

>Instead of boring `<input type='file'>` *AmplifyForm* creates for you a nice drag'n'drop zone (based on [React Dropzone](https://react-dropzone.js.org)).

### Automatic file upload

Upon submission (when you click the **Create** button), files will automatically be uploaded to your S3 Storage configured in your Amplify backend.

>You can add extra configurations on the *Storage* (detailed [here](#configure-storage))

**This has 2 requierements :**

- [Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/) module must be delpoyed in your Amplify backend
- Amplify must be configured on the page containing the AmplifyForm: typically via the `Amplify.configure({...awsExports})` command on the top of the file or in `_app.tsx`

### Parsing returned values (files)

As File are not simple fields, the `values` returned by AmplifyForm must be parsed and reworked before being sent to GraphlQL API. This is achieve via the `onSubmit: async (values: FormValues) => void` prop of AmplifyForm.

The value returned by Amplify is either a single `FieldWithStorage` (for single file) or a `FieldWithStorage[]` (for multiple files).

`FieldWithStorage` is a special type that contains all the informations you need about the file :

- `name`: the name of the file
- `storageKey`: the S3 key, typically used to download the file via `Storage.get(storageKey)` (details [here](https://docs.amplify.aws/lib/storage/download/q/platform/js/))
- `type`: the MIME type of the file

### Example (file)

Let's say your GraphQL model `schema.grapql` is a simple blog with Post, described in `Post`, and each Post has some attachements (at least one), described in `File` :

`schema.graph.ql`

```graphql
type Post
@model {
  id: ID!
  title: String!
  content: String!
  attachements: [File!]!
}

type File {
  name: String!
  s3_key: String!
  mime_type: String!
}
```

You declare `attachements` as an *file field* (also `content` as a `<textarea>`).  
And you create 2 functions :

- `createPostInput` to put the file infos in the right place
- `addPost` to create the new Post in the backend via the GraphQL API

`pages/create-post.tsx`

```js
// Import Amplify
import Amplify, { API } from 'aws-amplify';
import awsExports from '../aws-exports';
import { createPost } from '../graphql/mutations';
import { CreatePostMutation, FileInput } from '../API';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Import AmplifyForm and types
import AmplifyForm from 'amplify-form';
import { FormValues, FileWithStorage } from 'amplify-form'

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

const CreatePost = () => {

  // Configure Amplify
  Amplify.configure({ ...awsExports });

  const fileFields = ['attachements']

  const createPostInput = (values: FormValues, fileFieldList: string[]) => {
    const postInput: FormValues = {...values};
    fileFieldList.map(fileFieldName => {
      // Retrieve the FileWithStorage array from values
      const fileValues = values[fileFieldName] as FileWithStorage[];
      // Parse every value and transform it into ImageFileType
      const files: FileInput[] = fileValues.map(file => {
        return {
          name: file.name,
          s3_key: file.storageKey,
          mime_type: file.type,
        }
      });
      // Replace the value in postInput
      postInput[fileFieldName] = files;
    });
    // Return the values now in the right format
    return postInput;
  }

  const addPost (values: FormValues) => {
    const postInput = createPostInput(values);
    try {
      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createPost,
        variables: {
          input: postInput,
        },
      })) as { data: CreatePostMutation; errors: any[] };
    } catch (response) {
      if (response instanceof Error) {
        const error = response as Error;
        throw error;
      } else {
        const { errors } = response;
        console.error(...errors);
        throw new Error(errors[0].message);
      }
    }
  };

  return (
    <div>
      <h1>Create a new Post</h1>
      <AmplifyForm
        entity='Post'
        graphQLJSONSchema={schema}
        onSubmit={addPost}
        textAreas={['content']}
        fileFields={fileFields}
      />
    </div>
  );
};

export default withAuthenticator(() => CreatePost)
```

### Configure Storage

If you want to add additionnal configs to *Storage* you can use the `storageConfig?`, with 2 props:

- `storagePrefix?: string`: a prefix that will be add to `storageKey` in the `FileWithStorageKey` value.  
  This can be useful if you want to give your *Storage* some kind of folder-tree like organisation (with `storagePrefix='afoldername/'` for example)
- `storageLevel?: 'public' | 'protected' | 'private'`: specify the file access level in *Storage* (as defined [here](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/))

### Specify relationships

In GraphQL schema you can add relationships between 2 entities with the `@connection` directive (as explained [here](https://docs.amplify.aws/cli-legacy/graphql-transformer/connection/)).

In order for *AmplifyForm* to display these relationships correctly, you need to specify a few infos in a `relationships?: Relationship[]` prop (note that you need to pass an array, as they can be multiple relationships).

A relationship is displayed in *AmplifyForm* as a `<select>`

A `Relationship` object has this props:

- `entity: string`: the name of the entity you established a connection to  
  
  >If your entity is nested in an object, you can specific a `path?: string` with a "dotted" notation (e.g. `name='category` `path='details.category'`)
- `items: any[]`: an array conaining all possible values of the entity.
  
  >Each *item* in *items* must contain an *id* field, as GraphQL establish the relationship with this field.
- `labelField: string`: the field in the *item* object you want to display in your `<select>`
- `label?: string`: an optionnal label for the relationship
- `size?: FieldSize`: an optionnal size (as using `fieldsSize` prop for a relationship wouldn't be very straightforward)

**Example:**

Let's say your GraphQL model `schema.grapql` is a project management tool with `Project` and `Team`. Each `Project` has a `Team` attached (via a `@connection` directive):

`schema.graph.ql`

```graphql
type Project @model {
  id: ID!
  label: String
  team: Team @connection
}

type Team @model {
  id: ID!
  name: String!
  size: Int!
}
```

`pages/create-project.tsx`

```js
// Import Amplify
import Amplify, { API } from 'aws-amplify';
import awsExports from '../aws-exports';
import { createProject } from '../graphql/mutations';
import { listTeams } from '../graphql/queries';
import { 
  CreateProjectMutation,
  ListTeamsQuery,
  Team 
  } from '../API';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Import react hooks
import { useEffect, useState } from 'react'

// Import AmplifyForm and types
import AmplifyForm from 'amplify-form';
import { FormValues, Relationship } from 'amplify-form'

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

const CreatePost = () => {

  // Configure Amplify
  Amplify.configure({ ...awsExports });

  // Fetch teams
  const [teams, setTeams] = useState<Teams[]>();

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
        query: listTeams,
      })) as GraphQLResult<ListTeamsQuery>;
      const *teams = (data?.listTeams?.items || []) as Team[];
      setTeams(_teams);
    }
    fetchTeams();
  }, [teams]);

  if (!teams) {
    return (
      <p>loading...</p>
    );}

  const teamRelationship: Relationship = {
    name: 'team',
    items: teams,
    labelField: 'name',
    label: 'Pick a team',
    size: 'lg',
  }

  const addProject (values: FormValues) => {
    try {
      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createProject,
        variables: {
          input: values,
        },
      })) as { data: CreateProjectMutation; errors: any[] };
    } catch (response) {
      if (response instanceof Error) {
        const error = response as Error;
        throw error;
      } else {
        const { errors } = response;
        console.error(...errors);
        throw new Error(errors[0].message);
      }
    }
  };

  return (
    <div>
      <h1>Create a new Post</h1>
      <AmplifyForm
        entity='Post'
        graphQLJSONSchema={schema}
        onSubmit={addPost}
        relationships={[teamRelationship]}
      />
    </div>
  );
};

export default withAuthenticator(() => CreatePost)
```

## Add field props

You can add any props to any field with the `fieldsProps?` prop of *AmplifyForm_.

This is useful to set a `defaultValue`, or to define a field as `readOnly` for example.

>The prop value must be either `string`, `number` or `boolean`  
>⚠️ **Warning:** some  props might not work has they may be overwritten somewhere else in the code... Use at your own risks !

**Example:**

A simple Todo, with a `ref` field which contains a more human-readable *id* that you manage (via `nextRef` prop on your page).

`schema.graphql`:

```graphql
type Todo
@model {
  id: ID!
  ref: Int!
  name: String!
  description: String
}
```

`pages/create-todo.tsx`:

```js
// Import AmplifyForm
import AmplifyForm from 'amplify-form';

// Path to the JSON representation of the GraphQL Schema
import schema from '../graphql/schema.json';

// Import function to process the Form values
import addTodo from '../utilities/add-todo';

export default CreateTodo = ({ nextRef: number}) => {

  const fieldsProps = {
    'ref': {
      defaultValue: nextRef,
      readOnly: true,
    },
  }

  return (
    <div>
      <h1>Create a new To do</h1>
      <AmplifyForm
        entity='Todo'
        graphQLJSONSchema={schema}
        onSubmit={addTodo}
        textAreas={['description']}
        fieldsProps={fieldsProps}
      />
    </div>
  );
};
```

---

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests.

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
