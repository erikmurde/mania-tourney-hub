import { Grid, GridProps } from '@mui/material';

interface IProps {
    name: string,
    link: string,
    props?: GridProps
}

const Logo = ({name, link, props}: IProps) => {
    return (  
        <Grid item width={30} height={20} xs='auto' {...props}>
            <img
                className='flag' 
                src={link} 
                alt={`Logo of ${name}`}/>
        </Grid>
    );
}
 
export default Logo;