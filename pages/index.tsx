import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { usePlugin } from 'tinacms'
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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {data.title}
        </h1>
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