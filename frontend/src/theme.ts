import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    black: "#000",
    white: "#FFF5F5",
    // gray: {
    //   50: "#f9f9f9",
    //   100: "#f2e4e4",
    //   200: "#d3d3d3",
    //   300: "#b3b3b3",
    //   400: "#a0a0a0",
    //   500: "#898989",
    //   600: "#6c6c6c",
    //   700: "#202020",
    //   800: "#121212",
    //   900: "#111",
    //   1000: "#1A202C",
    // },
    gray: {
      50: "#F5F5F5",
      100: "#EEEEEE",
      200: "#CCCCCC",
      300: "#AAAAAA",
      400: "#999999",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
      1000: "#1A202C",
    },
  },
});

export default theme;
