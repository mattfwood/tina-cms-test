import Head from 'next/head'

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { usePlugin } from 'tinacms'
import {
  InlineForm,
  InlineTextField,
} from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from 'react-tinacms-editor'

import { GetStaticProps } from 'next'

export default function Home({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }

  const [data, form] = useGithubJsonForm(file, formOptions)

  usePlugin(form)
  useGithubToolbarPlugins()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InlineForm form={form}>
        <main>
          <h1>
            <InlineTextField name="title" />
          </h1>
          <InlineWysiwyg name="markdownBody" format="markdown">
            <article className="prose">
              <ReactMarkdown source={data.markdownBody} />
            </article>
          </InlineWysiwyg>
        </main>
      </InlineForm>
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