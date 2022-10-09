import compose from "compose-function";
import { withRouter } from "./with-router";
import {withUi} from "./with-ui";

export const withProviders = compose(withRouter, withUi);
