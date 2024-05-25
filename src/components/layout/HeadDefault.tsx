import logoUrl from "@/assets/logo.png"

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Demo showcasing Vike" />
      <link rel="icon" href={logoUrl} />
    </>
  )
}
