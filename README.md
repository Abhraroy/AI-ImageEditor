## Next.js + ImageKit (Upload + Transform Editor)

This project is a **Next.js (App Router)** app that:

- Uploads images to **ImageKit** from the client using `@imagekit/next`
- Generates secure upload auth params on the server via `GET /api/upload-auth`
- Builds ImageKit transformation URLs (`?tr=...`) to preview edits (crop/resize/overlays/AI/effects)
- Stores editor UI state with **Zustand**

---

## Tech stack

- **Next.js**: 15.5.x (App Router)
- **React**: 19.x
- **TypeScript**
- **Tailwind CSS**: v4
- **ImageKit**: `@imagekit/next`
- **State**: Zustand
- **UI**: Radix UI (`@radix-ui/react-accordion`, `@radix-ui/react-tooltip`) + shadcn-style utilities

---

## Requirements

- **Node.js**: recommended latest LTS
- **An ImageKit account** with API keys

---

## Credentials / environment variables (required)

Create a file named **`.env.local`** inside `nextjsimagekit/`:

```bash
# Required (server-side only)
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

# Used server-side to create signatures and sent to the client for uploading
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

# Used for ImageKit URL delivery + transformations (public value)
# Example: https://ik.imagekit.io/your_imagekit_id
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Where to get these keys

In your ImageKit dashboard:
- **Developer options → API Keys**

### Security notes

- **Never expose `IMAGEKIT_PRIVATE_KEY` to the client.** This repo correctly uses it only in the server route `src/app/api/upload-auth/route.ts`.
- `.env.local` should not be committed.

---

## Install & run locally

From the `nextjsimagekit/` folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

---

## Scripts

- **`npm run dev`**: start Next.js dev server
- **`npm run build`**: production build
- **`npm run start`**: run production server (after build)
- **`npm run lint`**: run ESLint

---

## How uploading works (high level)

- The client calls **`/api/upload-auth`** to get `{ token, expire, signature, publicKey }`
- The server generates these values using ImageKit’s SDK and your private key
- The client uploads the selected file with `upload()` from `@imagekit/next`

Key file:
- `src/app/api/upload-auth/route.ts`: server route that returns ImageKit upload auth params

---

## How transformations work (high level)

After uploading, the app receives an ImageKit-delivered URL (e.g. `https://ik.imagekit.io/...`).

Edits are applied by building a new URL like:

```text
<originalUrl>?tr=<transformation_string>
```

Key file:
- `src/utilityFunctions/imageTransformation.ts`: constructs the `?tr=` URL using the current editor state

---

## Project structure (important folders)

```text
nextjsimagekit/
  src/
    app/
      api/
        upload-auth/
          route.ts         # GET /api/upload-auth (server-only ImageKit signature generation)
      layout.tsx           # Root layout
      globals.css          # Global styles (Tailwind + custom)
      page.tsx             # Main editor page (upload + preview + edit panels)
      home/page.tsx        # Additional page route
      my-edits/page.tsx    # Shows saved edits (stored in localStorage)

    myComponents/
      ResizeCropEditBar.tsx
      OverlayEditBar.tsx
      AiTransformationEditBar.tsx
      EffectsEnhancementsEditBar.tsx
      HelpButton.tsx
      customtooltip.tsx    # Editor UI pieces

    zustandStore/
      zustandStore.ts      # Global editor state (transform params, UI selection, flags)

    utilityFunctions/
      imageTransformation.ts # Builds ImageKit transformation URL from store state

    components/ui/
      accordion.tsx        # Radix UI wrappers
      tooltip.tsx

    lib/
      utils.ts             # Shared helpers (cn/tailwind-merge style utilities)
```

---

## Troubleshooting

- **`/api/upload-auth` returns 500 or signature is missing**
  - Ensure `.env.local` is in `nextjsimagekit/` and contains `IMAGEKIT_PRIVATE_KEY` + `IMAGEKIT_PUBLIC_KEY`.
  - Restart `npm run dev` after adding env vars.

- **Upload works but transforms don’t preview**
  - The transform preview is URL-based (`?tr=`). Confirm the uploaded URL is an ImageKit-delivered URL and loads in the browser.

- **Type / lint issues**
  - Run `npm run lint` and fix any reported errors.

---

## Deployment notes

When deploying (Vercel or elsewhere), set the same environment variables in the hosting provider:

- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_URL_ENDPOINT`

The API route runs server-side, so your private key stays secure as long as it’s only configured in server environment variables.

---

## Docs

- **ImageKit docs**: `https://docs.imagekit.io/`
- **Next.js docs**: `https://nextjs.org/docs`
