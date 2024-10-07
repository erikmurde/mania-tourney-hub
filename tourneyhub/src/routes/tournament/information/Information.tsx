import { Button, Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { TournamentService } from '../../../services/tournamentService';
import { ChevronLeft, Edit } from '@mui/icons-material';
import { AuthContext, ErrorContext } from '../../Root';
import 'react-quill/dist/quill.snow.css';
import { AuthService } from '../../../services/authService';
import NoItems from '../../../components/tournament/NoItems';
import { useTourney } from '../TournamentHeader';
import LoadingButton from '../../../components/LoadingButton';

const COLORS = [
    "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
    "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
    "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
    "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
    "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
];

const Information = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const { setError } = useContext(ErrorContext);

    const [value, setValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const service = new TournamentService();

    useEffect(() => {
        if (tourney.id) {
            setValue(tourney.information);
        }
    }, [tourney.id]);

    const formats = [
        'header',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'align',
        'list',
        'bullet',
        'link',
        'color',
        'clean',
    ];

    const modules = {
        toolbar: {
            container: [
                [{ header: [2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ align: ['', 'right', 'center', 'justify'] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [...COLORS, '#64B5F6', '#2196F3', '#F6A664', '#ED8F5E'] }],
                ['link'],
                ['clean'],
            ]
        },
        clipboard: {
            matchVisual: true,
        }
    };

    const hasNoContent = () => tourney.information.replace(/<(.|\n)*?>/g, '').trim().length === 0;

    const editInfo = async() => {
        if (!user) {
            return;
        }
        setLoading(true);
        const error = await service.edit(tourney.id, {
            ...tourney, 
            information: value, 
            hostRoles: user.roles
                .filter(role => role.tournamentId === tourney.id)
                .map(role => role.role)
        });
        if (error) {
            setError(error);
        } else {
            setEdit(false);
        }
        setLoading(false);
    }

    const goBack = () => {
        setValue(tourney.information);
        setEdit(false);
    }

    const isHost = user && new AuthService().isHost(user, tourney.id);

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container alignItems='center'>
                <SectionTitle title={edit ? 'Edit information' : 'Information'} xsAuto/>
                <Grid item xs textAlign='end' marginRight={5}>
                    {isHost &&
                    <Button 
                        sx={{ width: 100 }}
                        variant='contained' 
                        startIcon={edit ? <ChevronLeft/> : <Edit/>} 
                        onClick={() => edit ? goBack() : setEdit(true)}
                        >
                        {edit ? 'Back' : 'Edit'}
                    </Button>}
                    {edit && 
                    <LoadingButton
                        loading={loading}
                        sx={{ marginLeft: 1, width: 100 }} 
                        color='success' 
                        onClick={() => editInfo()}
                        >
                        Save
                    </LoadingButton>}
                </Grid>
                <Grid item xs={12} marginLeft={5} marginRight={5}>
                    <NoItems name='information' display={!edit && hasNoContent()}/>
                    <ReactQuill
                        className={edit ? 'quill-edit' : 'quill-view'}
                        theme='snow'
                        readOnly={!edit}
                        formats={formats}
                        modules={modules}
                        value={value}
                        onChange={(content) => setValue(content)}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Information;