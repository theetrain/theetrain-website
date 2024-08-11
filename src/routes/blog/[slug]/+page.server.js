/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const posts = import.meta.glob('$blog/*')

  console.log({posts})
  return {
    title: 'Test'
  }
}