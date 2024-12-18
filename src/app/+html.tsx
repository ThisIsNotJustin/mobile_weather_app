import type { PropsWithChildren } from 'react'

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>Crossplatform Weather App</title>

        <link rel="canonical" href="https://yourdomain.com" />
        <link rel="image_src" href="https://yourdomain.com/og-image.jpg" />
        <meta name="title" content="Crossplatform Weather App" />
        <meta name="description" content="An expo app built using Expo Router Typescript" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="the dev environment, yourdomain, developer, web, web developer, react, react-native, react native, consulting, consultants, programming challenges, coding interview"
        />
        <meta name="author" content="Justin Coleman" />
        <meta name="publisher" content="Justin Coleman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:title" content="Crossplatform Weather App" />
        <meta property="og:description" content="An expo app built using Expo Router Typescript" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourdomain.com" />
        <meta property="twitter:title" content="Crossplatform Weather App" />
        <meta property="twitter:description" content="An expo app built using Expo Router Typescript" />
        <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
