import { connect } from 'react-redux';
import MyConsole from '../components/console';
import Localization from '../localization/localization';

const mapStateToProps = (state) => ({
    message: state.main.get('consoleMessage'),
    welcomeMessage: Localization.getLocalizedString().consoleWelcomeMessage,
});

export default connect(mapStateToProps, null)(MyConsole)
