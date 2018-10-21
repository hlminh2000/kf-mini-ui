import styled from "react-emotion";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

export const ContentContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing.unit}px;
`;

export const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing.unit * 2}px;
`;

export const SectionContainer = styled("div")`
  padding-top: ${({ theme }) => theme.spacing.unit * 1.5}px;
  padding-bottom: ${({ theme }) => theme.spacing.unit * 1.5}px;
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`;

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const JumbotronContainer = styled("div")`
  background: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: row;
`;

export const JumbotronInfoContent = styled("div")`
  display: flex;
  align-items: center;
`;

export const JumbotronTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.white};
`;
