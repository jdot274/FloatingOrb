/**
 * Electron Builder Configuration for "Glass" version
 */
module.exports = {
  appId: "com.floatingorb.glass",
  productName: "Floating Orb (Glass)",
  extraMetadata: {
    main: "main-with-background.js"
  },
  mac: {
    category: "public.app-category.utilities",
    icon: "icons/glass.icns",
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"]
      }
    ]
  },
  dmg: {
    title: "Floating Orb Glass ${version}",
    background: null,
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: "link", path: "/Applications" }
    ],
    window: { width: 540, height: 380 }
  },
  files: [
    "main-with-background.js",
    "preload.js",
    "dist/**/*",
    "package.json"
  ]
};
