import React from 'react';
import Head from 'next/head';

import Link from 'next/link';

import { GetStaticProps } from 'next';
import { getAllPosts, slugify } from '../lib/utils';

export default function Home({ recipes, ...props }) {
  return (
    <div>
      <Head>
        <title>Cook Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-2">
        {recipes.map((recipe) => (
          <h2
            key={recipe.title}
            className="text-2xl leading-8 font-bold tracking-tight"
          >
            <Link as={`/recipes/${recipe.slug}`} href="/recipes/[slug]">
              <a className="hover:underline text-gray-900">{recipe.title}</a>
            </Link>
          </h2>
        ))}
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
  const recipes = getAllPosts(['slug']);

  return {
    props: {
      recipes: recipes.map((recipe) => {
        return {
          ...recipe,
          slug: slugify(recipe.title),
        };
      }),
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
