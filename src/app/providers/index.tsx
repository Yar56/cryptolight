import compose from 'compose-function';

import { withAuth } from './withAuth';
import { withModal } from './withModal';
import { withRouter } from './withRouter';
import { withUi } from './withUi';

export const withProviders = compose(withRouter, withUi, withAuth, withModal);
