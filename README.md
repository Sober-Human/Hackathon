# Amazon-like Product Page

This project is a responsive, Amazon-inspired product details page that showcases modern e-commerce UI/UX features. It is designed to mimic the look and feel of the original Amazon product page, with interactive image zoom and fullscreen capabilities, and a generalized structure for different types of products.

## Features

- **Image Zoom on Hover**: Hovering over the main product image displays a zoom lens and a magnified view, similar to Amazon's product gallery.
- **Fullscreen Image View**: Click the main product image to open a fullscreen modal with navigation thumbnails and a close button.
- **Responsive Design**: Mobile-first approach ensures the page looks great on mobile, tablet, and desktop devices.
- **Generalized Product Structure**: Easily adaptable to various product types, not limited to a single category.
- **Breadcrumb Navigation**: Dynamic breadcrumbs reflect product categories.
- **Modern UI Elements**: Includes scroll progress indicator, Font Awesome icons, and visually appealing layouts.

## Project Structure

```
├── index.html          # Main HTML file with product page structure
├── styles.css          # Core CSS styles for layout and components
├── responsive.css      # Additional responsive design rules
├── main.js             # JavaScript for image zoom, fullscreen, and interactivity
├── modal.css           # (If present) Styles for modal/fullscreen overlays
├── card-slider.css     # (If present) Styles for any card sliders or carousels
├── consolidated.css    # (If present) Consolidated or shared CSS styles
├── sections.css        # (If present) Section-specific CSS styles
└── README.md           # Project documentation (this file)
```

## Technologies Used

- **HTML5/CSS3**: Semantic markup and modular CSS for structure and style
- **JavaScript (Vanilla)**: No frameworks required; all interactivity is custom-coded
- **Font Awesome**: For scalable vector icons

## Setup & Usage

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sober-Human/Hackathon.git
   cd Hackathon
   ```
2. **Open `index.html` in your browser** to view the product page.
3. **Edit product details/images** in `index.html` as needed to generalize for other products.

No build tools or dependencies are required—everything runs in the browser.

## Customization
- To update product images, replace the image sources in the HTML.
- To adjust styles, modify `styles.css` and `responsive.css`.
- For additional features, edit or extend `main.js`.

## License
This project is for educational and demonstration purposes. For other uses, please specify your own license.

---

Feel free to contribute or adapt this template for your own product pages!
