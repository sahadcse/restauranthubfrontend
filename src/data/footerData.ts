const footerData = {
  // Brand
  logo: {
    text: "RestntHub",
    image: "/siteMainLogo.jpg", // Shopping bag icon in green
    alt: "RestaurantHub Logo",
    width: 46,
    height: 46,
  },
  description:
    "RestaurantHub is the biggest market of grocery products. Get your daily needs from our store.",

  // App Store buttons
  appStores: [
    {
      name: "Google Play",
      href: "#",
      icon: "google-play",
      topText: "GET IT ON",
      bottomText: "Google Play",
      bgColor: "#495057",
    },
    {
      name: "App Store",
      href: "#",
      icon: "app-store",
      topText: "DOWNLOAD ON",
      bottomText: "App Store",
      bgColor: "#495057",
    },
  ],

  // Column Headings
  columnTitles: {
    categories: "Category",
    company: "Company",
    account: "Account",
    contact: "Contact",
  },

  // Categories
  categories: [
    { name: "Dairy & Milk", href: "/category/dairy-milk" },
    { name: "Snack & Spice", href: "/category/snack-spice" },
    { name: "Fast Food", href: "/category/fast-food" },
    { name: "Juice & Drinks", href: "/category/juice-drinks" },
    { name: "Bakery", href: "/category/bakery" },
    { name: "Seafood", href: "/category/seafood" },
  ],

  // Company Links
  companyLinks: [
    { name: "About us", href: "/about" },
    { name: "Delivery", href: "/track-order" },
    { name: "Legal Notice", href: "/privacy-policy" },
    { name: "Terms & conditions", href: "/terms" },
    { name: "Secure payment", href: "/checkout" },
    { name: "Contact us", href: "/contact" },
  ],

  // Account Links
  accountLinks: [
    { name: "Sign In", href: "/login" },
    { name: "View Cart", href: "/cart" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "Become a Vendor", href: "/vendor-signup" },
    { name: "Affiliate Program", href: "/affiliate" },
    { name: "Payments", href: "/payments" },
  ],

  // Contact Information
  contact: {
    address: "Mollahpara, Magura Sadar, Magura, Bangladesh",
    phone: "+880 174 666 9174",
    email: "sahaduzzaman.cse@gmail.com",
    addressIcon: "address",
    phoneIcon: "phone",
    emailIcon: "email",
    // Add map configuration
    map: {
      latitude: 23.4861,
      longitude: 89.4197,
      zoom: 15,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3077.2074924862577!2d89.427527731388!3d23.480762648952187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sbd!4v1754483306776!5m2!1sen!2sbd",
      title: "Restaurant Hub Location - Magura, Bangladesh",
    },
  },

  // Social Media Links
  socialLinks: [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Twitter", href: "#", icon: "twitter" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "Instagram", href: "#", icon: "instagram" },
  ],

  // Copyright
  copyright: {
    prefix: "Copyright © ",
    brand: "Bismillah",
    text: " all rights reserved. Powered by ",
  },

  // Admin Links (for backend access)
  adminLinks: [
    { name: "admin", href: "/admin/restaurants" },
    { name: "Restaurant", href: "/dashboard/orders" },
  ],

  // Payment Methods - updated to use icon names for react-icons
  paymentMethods: [
    { name: "Visa", icon: "visa" },
    { name: "MasterCard", icon: "mastercard" },
    { name: "PayPal", icon: "paypal" },
    { name: "Stripe", icon: "stripe" },
    { name: "American Express", icon: "amex" },
    { name: "Visa Electron", icon: "electron" },
  ],

  // Mobile Accordion Titles
  mobileAccordions: {
    categories: "Categories",
    company: "Company",
    account: "Account",
  },

  // Theme Colors
  theme: {
    primary: "#4db6ac",
    primaryHover: "#388e7b",
    dark: "#495057",
    lightBg: "#f8fafc",
    textPrimary: "gray-700",
    textSecondary: "gray-600",
    textLight: "gray-500",
    border: "gray-200",
    lightBorder: "gray-100",
  },
};

export default footerData;
