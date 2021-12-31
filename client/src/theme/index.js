import { createMuiTheme } from "@material-ui/core";

import overrides from "./overrides";
import palette from "./palette";
import typography from "./typography";

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
