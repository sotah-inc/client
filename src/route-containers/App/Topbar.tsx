import { withRouter } from 'react-router-dom';

import { OwnProps } from 'components/App/Topbar';
import Topbar from 'containers/App/Topbar';

export default withRouter<OwnProps>(Topbar);
