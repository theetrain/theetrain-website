export async function allPosts () {
  const posts = import.meta.glob('$blog/*')

  for (const [path, module] of Object.entries(posts)) {
    const mod = module()
    const post = await mod
    console.log({ post })
  }

  return true
}
