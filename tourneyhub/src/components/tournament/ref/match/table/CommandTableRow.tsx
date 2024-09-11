import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { RefCommand } from '../../../../../domain/RefCommand';
import { StyledTableRow } from '../../../../styled/StyledTableRow';
import CopyClipboard from '../../CopyClipboard';

const CommandTableRow = ({command}: {command: RefCommand}) => {

    return (  
        <StyledTableRow>
            <SchedTableCell sx={{ fontWeight: 700 }}>
                {command.name}
            </SchedTableCell>
            <SchedTableCell width={30}>
                <CopyClipboard text={command.command}/>
            </SchedTableCell>
            <SchedTableCell>
                {command.command}
            </SchedTableCell>
        </StyledTableRow>
    );
}

export default CommandTableRow;