import { SchedTableCell } from '../../styled/SchedTableCell';
import { RefCommand } from '../../../domain/RefCommand';
import CopyClipboard from './CopyClipboard';

const CommandTableCell = ({command}: {command: RefCommand}) => {

    return (  
        <>
        <SchedTableCell width={100} sx={{ fontWeight: 700 }}>
            {command.name}
        </SchedTableCell>
        <SchedTableCell width={30}>
            <CopyClipboard text={command.command}/>
        </SchedTableCell>
        <SchedTableCell>
            {command.command}
        </SchedTableCell>
        </>
    );
}

export default CommandTableCell;