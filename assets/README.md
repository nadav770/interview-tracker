# Assets Folder

Place your background image here.

## How to use:

1. Place your image file in this folder (e.g., `background.jpg`, `background.png`)
2. Open `src/config/backgroundImage.ts`
3. Uncomment the import line and change the filename to match your image
4. Comment out the `PLACEHOLDER_IMAGE_URL` line

Example:
```typescript
import backgroundImage from '../assets/background.jpg';
export const BACKGROUND_IMAGE_URL = backgroundImage;
```

Supported formats: .jpg, .jpeg, .png, .webp

