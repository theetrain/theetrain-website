/** @type {import('./$types').LayoutLoad} */
export async function load({ parent }) {
  const { titles } = await parent()
  titles[1] = { title: 'Blog', href: '/blog' }

  return { titles }
}
