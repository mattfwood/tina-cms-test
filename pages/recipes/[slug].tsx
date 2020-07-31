import React from 'react';
import Head from 'next/head';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github';
import { useCMS, usePlugin } from 'tinacms';
import { InlineField, InlineForm, InlineTextField } from 'react-tinacms-inline';
import ReactMarkdown from 'react-markdown';
import { Wysiwyg } from 'react-tinacms-editor';

import { GetStaticProps } from 'next';
import { getAllPosts, slugify } from '../../lib/utils';

export default function Recipe({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'markdownBody', component: 'wysiwyg' },
    ],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);

  const { enabled } = useCMS();

  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <div>
      <Head>
        <title>Cook Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-2">
        <InlineForm form={form}>
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 my-6">
            <InlineTextField name="title" />
          </h1>
          <InlineField name="markdownBody">
            {({ input }) => {
              if (enabled) {
                return (
                  <article className="prose lg:prose-xl">
                    <Wysiwyg input={input} />
                  </article>
                );
              }
              return (
                <article className="prose lg:prose-xl">
                  <ReactMarkdown source={input.value} />
                </article>
              );
            }}
          </InlineField>
        </InlineForm>
      </main>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/lemon-bars.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/lemon-bars.json',
        data: (await import('../../content/lemon-bars.json')).default,
      },
    },
  };
};

export async function getStaticPaths() {
  const recipes = getAllPosts(['slug']);

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: slugify(recipe.title),
        },
      };
    }),
    fallback: false,
  };
}
