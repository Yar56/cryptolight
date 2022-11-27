import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withUi } from './withUi';
import { withAuth } from './withAuth';
import { withModal } from './withModal';

export const withProviders = compose(withRouter, withUi, withAuth, withModal);
