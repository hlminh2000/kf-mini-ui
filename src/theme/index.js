import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    white: "#ffffff",
    primary: {
      main: "#90278e",
      light: "#a42c90",
      dark: "#404c9a"
    },
    secondary: {
      main: "#2b388f",
      light: "#2b388f",
      dark: "#2b388f"
    },
    gradients: {
      primary: `#90278e, #cc3399 35%, #be1e2d 66%, #f6921e`
    }
  }
});

export default theme;
