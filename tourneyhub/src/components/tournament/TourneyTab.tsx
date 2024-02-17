import { Tab, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface IProps {
    label: string,
    to: string,
    selected?: boolean
  }

const TourneyTab = (props: IProps) => {
    const theme = useTheme();

    return (  
        <Tab 
            sx={{ fontSize: 18, color: theme.palette.text.primary }} 
            component={Link}
            {...props}
        />
    );
}
 
export default TourneyTab;