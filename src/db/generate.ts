const args = Bun.argv.slice(2)

const parsedName = (() => {
  const nameFlagIndex = args.indexOf('--name')

  if (nameFlagIndex !== -1) {
    return args[nameFlagIndex + 1]?.trim() ?? ''
  }

  return args.join(' ').trim()
})()

if (!parsedName) {
  console.error(
    'Migration name required. Use `bun run db:generate -- <name>` or `bun run db:generate -- --name <name>`.'
  )

  process.exit(1)
}

if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/.test(parsedName)) {
  console.error(
    'Migration name must use lowercase letters, numbers, underscores, or hyphens.'
  )

  process.exit(1)
}

const result = Bun.spawnSync({
  cmd: [process.execPath, 'x', 'drizzle-kit', 'generate', '--name', parsedName],
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit',
})

process.exit(result.exitCode)
