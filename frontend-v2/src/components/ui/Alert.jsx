import React from 'react'
import { Alert as MUIalert } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";

import { useAlert } from '../../context/AlertContext';


const Alert = () => {
    const { alert } = useAlert();

    const [state, setState] = React.useState({
		open: true,
		vertical: "top",
		horizontal: "center",
	});
	const { open, vertical, horizontal } = state;

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	if (!alert.text) return null;

    return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			anchorOrigin={{ vertical, horizontal }}
			onClose={handleClose}
		>
			<MUIalert
				onClose={handleClose}
				severity={alert.type}
				variant="filled"
				sx={{ width: "100%" }}
			>
				{alert.text}
			</MUIalert>
		</Snackbar>
	);
}

export default Alert