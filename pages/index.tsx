import Head from 'next/head'

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { useCMS, usePlugin } from 'tinacms'
import {
  InlineField,
  InlineForm,
  InlineFormContext,
  InlineTextField,
} from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg, Wysiwyg } from 'react-tinacms-editor'

import { GetStaticProps } from 'next'
import { useContext } from 'react'

export default function Home({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }, { name: 'markdownBody', component: 'wysiwyg' }],
  }

  const [data, form] = useGithubJsonForm(file, formOptions)

  const { enabled } = useCMS();

  // const context = useContext();

  usePlugin(form)
  // useGithubToolbarPlugins()

  // console.log({ data, form });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main>
      <InlineForm form={form}>
        <h1>
          <InlineTextField name="title" />
        </h1>
        {/* <InlineWysiwyg name="markdownBody" format="markdown">
          <article className="prose lg:prose-xl">
            <ReactMarkdown source={data.markdownBody} />
          </article>
        </InlineWysiwyg> */}
        <InlineField name="markdownBody">
            {({ input }) => {
            if (enabled) {
              return <Wysiwyg input={input} />
            }
              return (
                <article className="prose lg:prose-xl">
                  <ReactMarkdown source={input.value} />
                </article>
              )
          }}
        </InlineField>
      </InlineForm>
        </main>
    </div>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function({
 preview,
 previewData,
}) {
 if (preview) {
   return getGithubPreviewProps({
     ...previewData,
     fileRelativePath: 'content/home.json',
     parse: parseJson,
   })
 }
 return {
   props: {
     sourceProvider: null,
     error: null,
     preview: false,
     file: {
       fileRelativePath: 'content/home.json',
       data: (await import('../content/home.json')).default,
     },
   },
 }
}