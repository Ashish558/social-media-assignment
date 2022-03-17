
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'

export const NavbarData= [
    {
        name: 'Home',
        icon: HomeRoundedIcon,
        linkTo: '/',
    },
    {
        name: 'Dashboard',
        icon: GridViewRoundedIcon,
        linkTo: '/dashboard',
    },
    {
        name: 'Create',
        icon: CreateNewFolderRoundedIcon,
        linkTo: '/create',
    },
]