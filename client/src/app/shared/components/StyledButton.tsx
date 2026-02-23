import { Button, styled, type ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router";

type styledButtonProps = ButtonProps & Partial<LinkProps>

const StyleButton = styled(Button)<styledButtonProps>(({theme}) => ({
    '&.Mui-disable': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.text.disabled
    }
}))

export default StyleButton;