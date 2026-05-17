# CompuMarts Next.js Application

A modern, modular e-commerce storefront built with Next.js 15 and React 19.

## Project Structure

The project has been restructured for better maintainability and scalability:

- **`app/`**: Contains the main page and global styles.
  - `page.tsx`: The main entry point, aggregating all modular components.
  - `CompuMarts.css`: Global and shared layout styles.
- **`components/`**: Modular, self-contained UI components.
  - Each component has its own folder containing a `.tsx` file and a `.css` file.
  - **`Masthead`**: The shop header and category navigation.
  - **`ProductCard`**: Individual product display cards.
  - **`ProductModal`**: Detailed view modal for products.
  - **`CompareBar`**: Floating bar for selecting products to compare.
  - **`CompareModal`**: Side-by-side comparison table.
  - **`Footer`**: Application footer with store information.
- **`data/`**: Externalized application data.
  - **`products.ts`**: Contains all category and product information, including specifications and image links.

## How to Update Data

To add new products or update existing ones, simply edit `data/products.ts`.
- Each product supports an optional `image` field for real product photos.
- If no image is provided, the component will automatically fall back to the category icon.

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```
